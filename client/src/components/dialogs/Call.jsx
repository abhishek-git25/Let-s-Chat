import { CallEnd, CallMade, Mic, MicOff, VideoCall, Videocam, VideocamOff } from '@mui/icons-material';
import { Box, Button, Dialog, DialogTitle, IconButton, Stack } from '@mui/material';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setIsCall } from '../../redux/reducers/misc';

const Call = ({ localVideoRef, remoteVideoRef, answerCall, startCall, chatDetail, cancelCall , toggleMediaStream }) => {

    const [micOn, setMicOn] = useState(false)
    const [cameraOn, setCameraOn] = useState(true)
    const { user } = useSelector((state) => state.auth)

    const { isCall, receivingCall, caller, callAccepted } = useSelector((state) => state.misc)


    const dispatch = useDispatch()



    const handleMicToggle = () => {
        setMicOn(!micOn)
    }

    const handleCameraOff = () => {
        setCameraOn(!cameraOn)
        toggleMediaStream()
    }

    const handleCallClose = () => {
        dispatch(setIsCall(false))
    }


    return (
        <Dialog open={isCall} fullWidth maxWidth="md" onClose={handleCallClose}>
            <Stack p={"2rem"} spacing={"2rem"}>

                {caller === user._id || caller !== user._id}
                <DialogTitle textAlign={"center"}>
                    Video Call between {chatDetail?.name}
                </DialogTitle>

                {/* Video Streams Section */}
                <Box position="relative" height={"400px"} bgcolor="#000" display="flex" justifyContent="center" alignItems="center">

                    {/* Callee Video (Full Screen) */}
                    <Box
                        position="absolute"
                        top={0}
                        left={0}
                        right={0}
                        bottom={0}
                        bgcolor="#333"
                        display="flex"
                        justifyContent="center"
                        alignItems="center"
                    >
                        <video ref={remoteVideoRef} autoPlay playsInline muted={!micOn} />

                    </Box>

                    {/* Caller Video (Small Overlay) */}
                    <Box
                        position="absolute"
                        bottom={"1rem"}
                        right={"1rem"}
                        width={"120px"}
                        height={"90px"}
                        bgcolor="#000"
                        display="flex"
                        justifyContent="center"
                        alignItems="center"
                        borderRadius="4px"
                        overflow="hidden"
                    >
                        <video ref={localVideoRef} autoPlay playsInline muted />
                    </Box>

                </Box>

                {/* Controls Section */}
                <Stack direction={"row"} justifyContent={"center"} alignItems={"center"} spacing={"2rem"}>

                    <IconButton color="primary" onClick={handleCameraOff}>
                        {cameraOn ?
                            <Videocam />
                            :
                            <VideocamOff />
                        }
                    </IconButton>

                    <IconButton color="primary" onClick={handleMicToggle}>
                        {micOn ?
                            <Mic />
                            :
                            <MicOff />
                        }
                    </IconButton>

                    {(receivingCall && user._id !== caller && !callAccepted) ?
                        <Button color="success" variant="contained" startIcon={<CallMade />} onClick={answerCall}>
                            Accept Call
                        </Button> : <></>}
                    {!receivingCall &&
                        <Button color='success' variant='container' startIcon={<VideoCall />} onClick={startCall} >Start Call</Button>
                    }
                    <Button color="error" variant="contained" startIcon={<CallEnd />} onClick={cancelCall}>
                        End Call
                    </Button>

                </Stack>

            </Stack>
        </Dialog>
    )
}

export default Call
