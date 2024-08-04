import { Stack } from '@mui/material'
import React from 'react'
import ChatItem from '../shared/ChatItem'

const ChatList = ({ w = "100%", chats = [], chatId, onLineUsers = [], newMessageAlerts = [{
    chatId,
    count: 0,
}], handleDeletChat }) => {


    console.log(onLineUsers , "11");
    

    return (
        <Stack width={w} direction={"column"} overflow={"auto"} height={"100%"} >
            {chats.map((data, index) => {
                const { avatar, _id, name, groupChat, members } = data
                const newMessage = newMessageAlerts.find((alert) => parseInt(alert.chatId) === parseInt(_id))
                const isOnline = members.some((member) => onLineUsers.includes(member))
                {console.log(isOnline , "16")}


                return <ChatItem
                    index={index}
                    isOnline={isOnline}
                    newMessage={newMessage}
                    avatar={avatar}
                    _id={_id}
                    groupChat={groupChat}
                    name={name}
                    members={members}
                    sameSender={chatId === _id}
                    handleDeleteChat={handleDeletChat} />
            })}
        </Stack>
    )
}

export default ChatList
