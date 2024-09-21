import { Drawer, Grid, Skeleton } from '@mui/material'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { useErrors, useSocketHandlers } from '../../hooks/hook'
import { getOrSaveFromStorage } from '../../lib/features'
import { useChatDetailsQuery, useMyChatsQuery } from '../../redux/api/api'
import { incrementNotification, setNewMessageAlert } from '../../redux/reducers/chat'
import { setCallAccepted, setCallee, setCallEnded, setCaller, setCallerName, setIsCall, setIsDeleteMenu, setIsMobileMenuFriendly, setRecievingCall, setSelectedDeleteChat, setStream } from '../../redux/reducers/misc'
import { useSocket } from '../../socket'
import { ANSWER_CALL, CALL_ACCEPTED, CALL_USER, JOIN_ROOM, ME, NEW_MESSAGE_ALERT, NEW_REQUEST, ONLINE_USER, REFETCH_CHATS } from '../constants/events'
import DeleteChatMenu from '../dialogs/DeleteChatMenu'
import Title from '../shared/title'
import ChatList from '../specific/ChatList'
import Profile from '../specific/Profile'
import Header from './header'
import Call from '../dialogs/Call'




const AppLayout = (WrappedComponent) => {



    return (props) => {



        const AppLayoutWrapper = () => {
            const { isLoading, isError, data, error, refetch } = useMyChatsQuery()
            const [onlineUsers, setOnlineUsers] = useState([])
            const localVideoRef = useRef();
            const remoteVideoRef = useRef();
            const connectionRef = useRef()
            const { isMobileMenuFriendly, stream, callAccepted, callEnded, callee } = useSelector((state) => state.misc)
            const { user } = useSelector((state) => state.auth)
            const { newMessagesAlert } = useSelector((state) => state.chat)
            const [callerSignal, setCallerSignal] = useState()


            const socket = useSocket()
            const params = useParams()
            const navigate = useNavigate()

            const chatId = params.chatId

            // useEffect(() => {
            //     if (isCall) {
            //         startCall()
            //     } else if (!isCall) {
            //         cancelCall()
            //     }
            // }, [isCall]);

            console.log(chatId, "56");



            useEffect(() => {
                socket.on(CALL_USER, (data) => {
                    setCallerSignal(data.signalData)
                    dispatch(setCallerName(data.name))
                    dispatch(setRecievingCall(true))
                    dispatch(setCaller(data.from))
                    dispatch(setCallee(data.userToCall))
                    if (data.from !== user._id) {
                        dispatch(setIsCall(true))
                    }
                });
            }, [socket])



            const getMediaStream = async () => {
                try {
                    const localStream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
                    setStream(localStream);
                    if (localVideoRef.current) {
                        localVideoRef.current.srcObject = localStream;
                    }
                    return localStream;
                } catch (err) {
                    console.error('Error accessing media devices.', err);
                    throw err;
                }
            };


            const toggleMediaStream = async () => {
                console.log(localVideoRef.current.srcObject.getTracks() , "91");
                const tracks = localVideoRef.current.srcObject.getTracks()
                const videoTrack = tracks.find((track) => track.kind  === "video")
                if(videoTrack){
                    videoTrack.enabled = !videoTrack.enabled

                }                
            }
            

            const cancelCall = () => {

                if (localVideoRef.current && localVideoRef.current.srcObject) {
                    const tracks = localVideoRef.current.srcObject.getTracks();
                    tracks.forEach((track) => track.stop());
                    localVideoRef.current.srcObject = null;
                }

                dispatch(setCallEnded(true))
                dispatch(setCallAccepted(false))
                dispatch(setRecievingCall(false))

                // Optionally: Reset remote video
                if (remoteVideoRef.current) {
                    remoteVideoRef.current.srcObject = null;
                }
                dispatch(setIsCall(false))
            };

            useErrors([{ isError, error }])

            useEffect(() => {
                getOrSaveFromStorage({ key: NEW_MESSAGE_ALERT, value: newMessagesAlert })
            }, [newMessagesAlert])

            const dispatch = useDispatch()

            const deleteMenuAnchor = useRef(null)





            const chatDetails = useChatDetailsQuery({ chatId, skip: !chatId })
            const chatDetail = chatDetails?.data?.chat

            const handleDeletChat = (e, chatId, groupChat) => {
                dispatch(setIsDeleteMenu(true))
                dispatch(setSelectedDeleteChat({ chatId, groupChat }))
                deleteMenuAnchor.current = e.currentTarget
            }

            const handleMobileClose = () => {
                dispatch(setIsMobileMenuFriendly(false))
            }

            const newMessageAlertHandler = useCallback((data) => {
                if (data.chatId === chatId) return
                dispatch(setNewMessageAlert(data))
            }, [chatId])



            const newRequestAlertHandler = useCallback(() => {
                dispatch(incrementNotification())
            }, [dispatch])

            const refetchListener = useCallback(() => {
                refetch()
            }, [refetch])

            const onlineUsersListener = useCallback((data) => {
                setOnlineUsers(data);
            }, [])

   

            const startCall = async () => {

                const userToCall = chatDetail?.members?.find((member) => member !== user._id)

                const localStream = await getMediaStream();

                const peerConnection = new RTCPeerConnection();
                console.log(localStream.getTracks() , "164");
                
                localStream.getTracks().forEach(track => peerConnection.addTrack(track, localStream));

                peerConnection.onicecandidate = (event) => {

                    if (event.candidate) {
                        socket.emit(CALL_USER, {
                            userToCall,
                            signalData: peerConnection.localDescription,
                            from: user._id,
                            name: user.name,
                            members: chatDetail?.members,
                            chatId
                        });
                    }
                };

                peerConnection.ontrack = (event) => {
                    console.log(event , "183");
                    
                    if (localVideoRef.current) {
                        localVideoRef.current.srcObject = event.streams[0];
                        
                    }
                };

                peerConnection.ontrack = (event) => {
                    if (remoteVideoRef.current) {
                        remoteVideoRef.current.srcObject = event.streams[0];
                    }
                };
        

                const offer = await peerConnection.createOffer();
                await peerConnection.setLocalDescription(offer);
                // setRecievingCall(true)

                socket.on(CALL_ACCEPTED, async (signal) => {
                    setCallAccepted(true);
                    await peerConnection.setRemoteDescription(new RTCSessionDescription(signal));
                });

                connectionRef.current = peerConnection;
            }


            const answerCall = async () => {
                try {
                    // Get the local media stream (this is optional if you want to send your video/audio)
                    const localStream = await getMediaStream({ video : true , audio :true}); // Assuming you have a function to get media stream

                    // Create a new RTCPeerConnection
                    const peerConnection = new RTCPeerConnection();

                    // Add the local stream tracks to the peer connection
                    localStream.getTracks().forEach(track => peerConnection.addTrack(track, localStream));

                    // Handle ICE candidates
                    peerConnection.onicecandidate = (event) => {
                        if (event.candidate) {
                            socket.emit(ANSWER_CALL, {
                                signal: peerConnection.localDescription,
                                to: callee,
                                members: chatDetail?.members
                            });
                        }
                    dispatch(setCallAccepted(true))

                    };

                    // Handle remote stream
                    peerConnection.ontrack = (event) => {
                        if (remoteVideoRef.current) {
                            remoteVideoRef.current.srcObject = event.streams[0];
                        }
                    };

                    // Set the remote description with the caller's signal data (SDP)
                    await peerConnection.setRemoteDescription(new RTCSessionDescription(callerSignal));

                    // Create an answer to the received offer
                    const answer = await peerConnection.createAnswer();

                    // Set the local description with the answer
                    await peerConnection.setLocalDescription(answer);

                    // Store the connection reference
                    connectionRef.current = peerConnection;
                } catch (error) {
                    console.error("Error answering call:", error);
                }
            };



            // console.log(recievingCall, caller, callerSignal, "207");



            const eventHandlers = {
                [NEW_MESSAGE_ALERT]: newMessageAlertHandler,
                [NEW_REQUEST]: newRequestAlertHandler,
                [REFETCH_CHATS]: refetchListener,
                [ONLINE_USER]: onlineUsersListener,
            }

            useSocketHandlers(socket, eventHandlers)


            return (
                <>
                    <Title />
                    <Header />
                    <Call localVideoRef={localVideoRef} remoteVideoRef={remoteVideoRef} startCall={startCall} answerCall={answerCall} chatDetail={chatDetail} cancelCall={cancelCall} toggleMediaStream = {toggleMediaStream} />
                    <DeleteChatMenu dispatch={dispatch} deleteOptionAnchor={deleteMenuAnchor.current} />
                    {isLoading ?
                        <Skeleton />
                        :
                        <Drawer open={isMobileMenuFriendly} onClose={handleMobileClose}>
                            <ChatList w='70vw' chats={data?.chats} chatId={chatId} handleDeletChat={handleDeletChat} newMessageAlerts={newMessagesAlert} onLineUsers={onlineUsers} />
                        </Drawer>
                    }
                    <Grid container height={"calc(100vh - 4rem)"}>
                        <Grid item sm={4} md={3} sx={{ display: { xs: "none", sm: "block" } }} height={"100%"}>
                            {isLoading ? <Skeleton /> : <ChatList chats={data?.chats} chatId={chatId} handleDeletChat={handleDeletChat} newMessageAlerts={newMessagesAlert} onLineUsers={onlineUsers} />}
                        </Grid>
                        <Grid item xs={12} sm={8} md={5} lg={6} height={"100%"}>
                            <WrappedComponent {...props} chatId={chatId} user={user} />
                        </Grid>
                        <Grid item md={4} lg={3} height={"100%"} sx={{ display: { xs: "none", md: "block" }, padding: "2rem", bgcolor: "rgba(0,0,0,0.85)" }} >
                            <Profile user={user} />
                        </Grid>
                    </Grid>
                    {/* <WrappedComponent {...props} /> */}
                    {/* <div>Footer</div> */}
                </>
            )
        }


        return <AppLayoutWrapper />
    }


}

export default AppLayout
