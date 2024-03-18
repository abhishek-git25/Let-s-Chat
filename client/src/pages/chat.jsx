import { IconButton, Stack } from '@mui/material'
import React, { useRef } from 'react'
import AppLayout from '../components/layout/AppLayout'
import { AttachFile, Send } from '@mui/icons-material'
import { InputBox } from '../components/styles/StyledComponents'
import { orange } from '../components/constants/color'
import FileMenu from '../components/dialogs/FileMenu'
import { sampleMessage } from '../components/constants/sampleData'
import MessageComponent from '../components/shared/MessageComponent'

const Chat = () => {

  const user = {
    id: "abc",
    name: "Abhishek Yadav",
  }

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
        {sampleMessage.map((item) => {
          return <MessageComponent message={item} user={user} />
        })}
      </Stack>
      <form style={{
        height: "10%"
      }} >
        <Stack direction={"row"} height={"100%"} padding={"1rem"} alignItems={"center"} position={"relative"} >
          <IconButton sx={{ position: "absolute", left: "1rem", rotate: "30deg" }}>
            <AttachFile />
          </IconButton>
          <InputBox placeholder='Type Message Here...' />
          <IconButton type='submit' sx={{
            background: orange, color: "white", marginLeft: "1rem", padding: "0.5rem", "&:hover": {
              bgcolor: "error.dark"
            }
          }}>
            <Send />
          </IconButton>
        </Stack>
      </form>
      <FileMenu />
    </>
  )
}

export default AppLayout(Chat)  
