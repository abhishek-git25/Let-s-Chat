import { Box, Typography } from '@mui/material';
import { motion } from 'framer-motion';
import moment from 'moment';
import React from 'react';
import { fileFormat } from '../../lib/features';
import RenderAttachment from './RenderAttachment';

const MessageComponent = ({ message, user }) => {

  const { sender, content, attachments = [], createAt } = message

  const sameSender = sender?._id === user?._id

  const timeAgo = moment(createAt).fromNow()

  return (
    <motion.div
      initial={{ opacity: 0, y: "-100%" }}
      whileInView={{ opacity: 1, y: 0 }}

      style={{
        alignSelf: sameSender ? "flex-end" : "flex-start",
        background: "white",
        color: "black",
        borderRadius: "5px",
        padding: "0.5rem",
        width: "fit-content"
      }} >
      {!sameSender && <Typography color={"#2694ab"} fontWeight={"600"} variant='caption' >{sender.name}</Typography>}
      {content && <Typography>{content}</Typography>}
      {attachments.length > 0 && attachments.map((i, index) => {
        const url = i.url
        const file = fileFormat(url)
        return <Box key={index} >
          <a href={url} target='_blank' download style={{ color: "black" }}>
            {RenderAttachment(file, url)}
          </a>
        </Box>
      })}
      <Typography variant='caption' color={"text.secondary"}>{timeAgo}</Typography>
    </motion.div>
  )
}

export default MessageComponent
