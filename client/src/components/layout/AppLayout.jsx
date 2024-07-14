import { Drawer, Grid, Skeleton } from '@mui/material'
import React, { useCallback, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { useErrors, useSocketHandlers } from '../../hooks/hook'
import { useMyChatsQuery } from '../../redux/api/api'
import { setIsMobileMenuFriendly } from '../../redux/reducers/misc'
import Title from '../shared/title'
import ChatList from '../specific/ChatList'
import Profile from '../specific/Profile'
import Header from './header'
import { useSocket } from '../../socket'
import { NEW_MESSAGE_ALERT, NEW_REQUEST } from '../constants/events'
import { incrementNotification, setNewMessageAlert } from '../../redux/reducers/chat'
import { getOrSaveFromStorage } from '../../lib/features'



const AppLayout = (WrappedComponent) => {



    return (props) => {



        const AppLayoutWrapper = () => {
            const { isLoading, isError, data, error, refetch } = useMyChatsQuery()

            const socket = useSocket()



            useErrors([{ isError, error }])

            const { isMobileMenuFriendly } = useSelector((state) => state.misc)
            const { user } = useSelector((state) => state.auth)
            const { newMessagesAlert } = useSelector((state) => state.chat)


            useEffect(() => {
                getOrSaveFromStorage({ key: NEW_MESSAGE_ALERT, value: newMessagesAlert})
            }, [newMessagesAlert])

            const dispatch = useDispatch()

            const params = useParams()
            const chatId = params.chatId

            const handleDeletChat = (e, _id, groupChat) => {
                e.preventDefault()
                console.log("Delete chat", _id, groupChat);
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

            const eventHandlers = {
                [NEW_MESSAGE_ALERT]: newMessageAlertHandler,
                [NEW_REQUEST]: newRequestAlertHandler
            }

            useSocketHandlers(socket, eventHandlers)


            return (
                <>
                    <Title />
                    <Header />
                    {isLoading ?
                        <Skeleton />
                        :
                        <Drawer open={isMobileMenuFriendly} onClose={handleMobileClose}>
                            <ChatList w='70vw' chats={data?.chats} chatId={chatId} handleDeletChat={handleDeletChat} newMessageAlerts={newMessagesAlert} />
                        </Drawer>
                    }
                    <Grid container height={"calc(100vh - 4rem)"}>
                        <Grid item sm={4} md={3} sx={{ display: { xs: "none", sm: "block" } }} height={"100%"}>
                            {isLoading ? <Skeleton /> : <ChatList chats={data?.chats} chatId={chatId} handleDeletChat={handleDeletChat} newMessageAlerts={newMessagesAlert} />}
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
