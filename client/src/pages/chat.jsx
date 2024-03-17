import { IconButton, Stack } from '@mui/material'
import React, { useRef } from 'react'
import AppLayout from '../components/layout/AppLayout'
import { AttachFile, Send } from '@mui/icons-material'
import { InputBox } from '../components/styles/StyledComponents'

const Chat = () => {

  const containerRef = useRef(null)


  return (
    <>
      <Stack
        ref={containerRef}
        boxSizing={"border-box"}
        padding={"1rem"}
        spacing={"1rem"}
        bgcolor={"rgba(0,0,0,0.1)"}
        height={"90%"}
        sx={{
          overflowX: "hidden",
          overflowY: "auto"
        }}
      >
        abv
      </Stack>
      <form style={{
        height: "10%"
      }} >
        <Stack direction={"row"} height={"100%"} padding={"1rem"} alignItems={"center"} position={"relative"} >
          <IconButton>
            <AttachFile />
          </IconButton>
          <InputBox placeholder='Type Message Here...' />
          <IconButton>
            <Send />
          </IconButton>
        </Stack>
      </form>
    </>
  )
}

export default AppLayout(Chat)  
