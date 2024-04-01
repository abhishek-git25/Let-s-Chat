import React from 'react'
import { Stack } from '@mui/material'
import ChatItem from '../shared/ChatItem'

const ChatList = ({ w = "100%", chats = [], chatId, onLineUsers = [], newMessageAlerts = [{
    chatId,
    count: 0,
}], handleDeletChat }) => {
    return (
        <Stack width={w} direction={"column"} overflow={"auto"} height={"100%"} >
            {chats.map((data, index) => {
                const { avatar, _id, name, groupChat, members } = data
                const newMessage = newMessageAlerts.find((alert) => parseInt(alert.chatId) === _id)
                const isOnline = members.some((member) => onLineUsers.includes(_id))

                return <ChatItem
                    index={index}
                    isOnline={isOnline}
                    newMessage={newMessage}
                    avatar={avatar}
                    _id={_id}
                    groupChat={groupChat}
                    name={name}
                    members={members}
                    sameSender={parseInt(chatId) === _id}
                    handleDeleteChat={handleDeletChat} />
            })}
        </Stack>
    )
}

export default ChatList
