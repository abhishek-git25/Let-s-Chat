import { Box, makeStyles, Stack, Typography } from '@mui/material'
import React, { memo } from 'react'
import { Link } from '../styles/StyledComponents'
import AvatarCard from './AvatarCard'




const ChatItem = ({ avatar = [], name, _id, groupChat = false, sameSender, isOnline, newMessage, index = 0, handleDeleteChat }) => {


    const handleNavigation = (e) =>{
        handleDeleteChat(e, _id, groupChat)
    }
   
    
    return (
        <Link to={`/chat/${_id}`} onContextMenu={handleNavigation} sx={{ padding: 0 }}>
            <div
                style={{ display: "flex", gap: "1rem", alignItems: "center", padding: "1rem", backdropFilter: sameSender ? "blur(10px)" : "", background: sameSender ? "rgba(234, 112, 112, 0.9)" : "unset", color: sameSender ? "white" : "unset", position: "relative",border: sameSender ? "1px solid rgba(255, 255, 255, 0.3)" : "",}}>
                <AvatarCard avatar={avatar} />
                <Stack>
                    <Typography>{name}</Typography>
                    {
                        newMessage && (
                            <Typography>{newMessage.count} New Message </Typography>
                        )
                    }
                </Stack>
                {isOnline && (
                    <Box sx={{ width: "10px", height: "10px", borderRadius: "50%", backgroundColor: "green", position: "absolute", top: "50%", right: "1rem", transform: "translateY(-50%)" }} />
                )}


            </div>
        </Link>
    )
}

export default memo(ChatItem)  
