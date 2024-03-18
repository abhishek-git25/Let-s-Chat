import { Box, Typography } from '@mui/material';
import React from 'react'
import moment from 'moment'

const MessageComponent = ({ message, user }) => {

  const { sender, content, attachments = [], createAt } = message

  console.log(sender, user, "7");

  const sameSender = sender?._id === user?.id
  const timeAgo = moment(createAt).fromNow()

  return (
    <div style={{
      alignSelf: sameSender ? "flex-end" : "flex-start",
      background: "white",
      color: "black",
      borderRadius: "5px",
      padding: "0.5rem",
      width: "fit-content"
    }} >
      {!sameSender && <Typography color={"#2694ab"} fontWeight={"600"} variant='caption' >{sender.name}</Typography>}
      {content && <Typography>{content}</Typography>}
      {attachments.length > 0 && attachments.map((i , index) => {
        const url = i.url
        const file = "asb"
        return <Box key={index} >
        <a href='' target='_blank' download  style={{ color : "black" }}>

        </a>
        </Box>
      })}
      <Typography variant='caption' color={"text.secondary"}>{timeAgo}</Typography>
    </div>
  )
}

export default MessageComponent
