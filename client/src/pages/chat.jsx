import { AttachFile, Send } from '@mui/icons-material'
import { IconButton, Skeleton, Stack } from '@mui/material'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import { orange } from '../components/constants/color'
import { ALERT, CHAT_JOINED, CHAT_LEFT, NEW_MESSAGE, START_TYPING, STOP_TYPING } from '../components/constants/events'
import FileMenu from '../components/dialogs/FileMenu'
import AppLayout from '../components/layout/AppLayout'
import MessageComponent from '../components/shared/MessageComponent'
import { InputBox } from '../components/styles/StyledComponents'
import { useErrors, useInfiniteScroll, useSocketHandlers } from '../hooks/hook'
import { useChatDetailsQuery, useGetAllMessagesQuery } from '../redux/api/api'
import { useSocket } from '../socket'
import { useInfiniteScrollTop } from '6pp'
import { useDispatch } from 'react-redux'
import { setIsFileMenu } from '../redux/reducers/misc'
import { removeMessageAlert } from '../redux/reducers/chat'
import { TypingLoader } from '../components/layout/Loaders'
import { useNavigate } from 'react-router-dom'

const Chat = ({ chatId, user }) => {




  const containerRef = useRef(null)
  const typingTimeOut = useRef(null)
  const bottomRef = useRef(null)
  const navigate = useNavigate()


  const [messages, setMessages] = useState("")
  const [messageList, setMessageList] = useState([])
  const [page, setPage] = useState(1)
  const [fileMenuAnchor, setFileMenuAnchor] = useState(null)
  const [iamTyping, setIamTyping] = useState(false)
  const [userTyping, setUserTyping] = useState(false)




  const dispatch = useDispatch()


  const socket = useSocket()

  const getOldMessageChunk = useGetAllMessagesQuery({ chatId, page })

  const chatDetails = useChatDetailsQuery({ chatId, skip: !chatId })

  const members = chatDetails?.data?.chat?.members

  const errors = [
    { isError: chatDetails.isError, error: chatDetails.error },
    { isError: getOldMessageChunk.isError, error: getOldMessageChunk.error }
  ]

  useEffect(() => {
    socket.emit(CHAT_JOINED, { userId: user._id, members })
    dispatch(removeMessageAlert(chatId))
    return () => {
      setMessages("")
      setMessageList([])
      setPage(1)
      socket.emit(CHAT_LEFT, { userId: user._id, members })

    }
  }, [chatId])
 

  useEffect(() => {
    if (!chatDetails?.data?.chat) return navigate("/")
  }, [chatDetails.data])

  useEffect(() => {
    if (bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: "smooth" })
    }
  }, [messageList, messages])


  const newMessages = useCallback((data) => {
    if (data.chatId !== chatId) return
    setMessageList((prevMsg) => [...prevMsg, data.message])
  }, [chatId])


  const startTypingListener = useCallback((data) => {
    if (data.chatId !== chatId) return
    setUserTyping(true)
  }, [chatId])

  const stopTypingListener = useCallback((data) => {
    if (data.chatId !== chatId) return
    setUserTyping(false)
  }, [chatId])

  const alertListener = useCallback((data) => {

    if (data.chatId !== chatId) return
    const messageForAlert = {
      content: data.message,
      sender: {
        _id: Math.random(),
        name: "Admin"
      },
      chat: chatId,
      createdAt: new Date.toISOString()
    }
    setMessageList((prev) => [...prev, messageForAlert])
  }, [])

  const eventHandler = {
    [ALERT]: alertListener,
    [NEW_MESSAGE]: newMessages,
    [START_TYPING]: startTypingListener,
    [STOP_TYPING]: stopTypingListener
  }

  useSocketHandlers(socket, eventHandler)

  useErrors(errors);


  const handleFileOpen = (e) => {
    dispatch(setIsFileMenu(true))
    setFileMenuAnchor(e.currentTarget)
  }


  const { data: oldMessages, setData: setOldMessages } = useInfiniteScrollTop(containerRef, getOldMessageChunk?.data?.totalPages, page, setPage, getOldMessageChunk?.data?.messages)


  const messageOnChange = (e) => {
    setMessages(e.target.value)
    if (!iamTyping) {
      socket.emit(START_TYPING, { members, chatId })
      setIamTyping(true)
    }


    if (typingTimeOut.current) clearTimeout(typingTimeOut.current)

    typingTimeOut.current = setTimeout(() => {
      socket.emit(STOP_TYPING, { members, chatId })
      setIamTyping(false)
    }, 2000);
  }


  const submitHandler = (e) => {
    e.preventDefault()

    if (!messages.trim()) return
    // Emitting the messages to the server
    socket.emit(NEW_MESSAGE, { chatId, members, messages })
    setMessages("")
  }


  return chatDetails.isLoading ? (<Skeleton />) : (
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
        {!getOldMessageChunk.isLoading && getOldMessageChunk?.data?.messages.map((item) => {
          return <MessageComponent message={item} user={user} key={item.id} />
        })}
        {userTyping && <TypingLoader />}
        {messageList.map((item) => {
          return <MessageComponent message={item} user={user} key={item.id} />
        })}

        <div ref={bottomRef} />

      </Stack>
      <form style={{
        height: "10%"
      }}
        onSubmit={submitHandler}
      >
        <Stack direction={"row"} height={"100%"} padding={"1rem"} alignItems={"center"} position={"relative"} >
          <IconButton sx={{ position: "absolute", left: "1rem", rotate: "30deg" }} onClick={handleFileOpen}>
            <AttachFile />
          </IconButton>
          <InputBox placeholder='Type Message Here...' value={messages} onChange={messageOnChange} />
          <IconButton type='submit' sx={{
            background: orange, color: "white", marginLeft: "1rem", padding: "0.5rem", "&:hover": {
              bgcolor: "error.dark"
            }
          }}>
            <Send />
          </IconButton>
        </Stack>
      </form>
      <FileMenu anchorE1={fileMenuAnchor} chatId={chatId} />
    </>
  )
}

export default AppLayout(Chat)  
