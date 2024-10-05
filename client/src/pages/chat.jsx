import { AttachFile, Call, Close, Send, VideoCall } from '@mui/icons-material'
import { Box, IconButton, Skeleton, Stack, Typography } from '@mui/material'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import { orange } from '../components/constants/color'
import { ALERT, CHAT_JOINED, CHAT_LEFT, DELETE_MESSAGE, EDIT_MESSAGE, NEW_MESSAGE, REFETCH_CHATS, START_TYPING, STOP_TYPING } from '../components/constants/events'
import FileMenu from '../components/dialogs/FileMenu'
import AppLayout from '../components/layout/AppLayout'
import MessageComponent from '../components/shared/MessageComponent'
import { InputBox } from '../components/styles/StyledComponents'
import { useErrors, useInfiniteScroll, useSocketHandlers } from '../hooks/hook'
import { useChatDetailsQuery, useGetAllMessagesQuery } from '../redux/api/api'
import { useSocket } from '../socket'
import { useInfiniteScrollTop } from '6pp'
import { useDispatch } from 'react-redux'
import { setIsCall, setIsFileMenu, setIsMessageMenu } from '../redux/reducers/misc'
import { removeMessageAlert } from '../redux/reducers/chat'
import { TypingLoader } from '../components/layout/Loaders'
import { useNavigate } from 'react-router-dom'
import MessageMenu from '../components/dialogs/MessageMenu'

const Chat = ({ chatId, user }) => {




  const containerRef = useRef(null)
  const typingTimeOut = useRef(null)
  const menuAnchor = useRef(null)
  const bottomRef = useRef(null)
  const navigate = useNavigate()


  const [messages, setMessages] = useState("")
  const [messageList, setMessageList] = useState([])
  const [page, setPage] = useState(1)
  const [fileMenuAnchor, setFileMenuAnchor] = useState(null)
  const [iamTyping, setIamTyping] = useState(false)
  const [userTyping, setUserTyping] = useState(false)
  const [editMessage, setEditMessage] = useState({})
  const [actionType, setActionType] = useState('')




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

  useEffect(() => {
    if (actionType === "Edit") {
      setMessages(editMessage?.content)
    } else if (actionType === "Delete") {
      deleteMessage()
    }
  }, [actionType])


  const deleteMessage = () => {
    const messageId = editMessage._id
    socket.emit(DELETE_MESSAGE, {
      chatId, members, messages, messageId
    })
    setActionType('')
  }

  const newMessages = useCallback((data) => {
    if (data.chatId !== chatId) return
    setMessageList((prevMsg) => [...prevMsg, data.message])
  }, [chatId])


  const refetchMessages = useCallback((data) => {
    getOldMessageChunk.refetch()
  }, [])


  const openMenu = (e, data) => {
    dispatch(setIsMessageMenu(true))
    setEditMessage(data)
    menuAnchor.current = e.currentTarget
  }


  const cancelEditMessage = () => {
    setEditMessage({})
    setActionType('')
    setMessages('')
  }

  const closeMenu = () => {
    dispatch(setIsMessageMenu(false))
  }


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
    [STOP_TYPING]: stopTypingListener,
    [REFETCH_CHATS]: refetchMessages
  }

  useSocketHandlers(socket, eventHandler)

  useErrors(errors);

  const { data: oldMessages, setData: setOldMessages } = useInfiniteScrollTop(containerRef, getOldMessageChunk?.data?.totalPages, page, setPage, getOldMessageChunk?.data?.messages)

  const handleFileOpen = (e) => {
    dispatch(setIsFileMenu(true))
    setFileMenuAnchor(e.currentTarget)
  }

  const handleCall = () => {
    dispatch(setIsCall(true))
  }


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
    if (!actionType) {
      socket.emit(NEW_MESSAGE, { chatId, members, messages })
    } else if (actionType === "Edit") {
      const messageId = editMessage._id
      socket.emit(EDIT_MESSAGE, { chatId, members, messages, messageId })
      setEditMessage({})
      setActionType('')
    }

    setMessages("")
  }


  return chatDetails.isLoading ? (<Skeleton />) : (
    <>
      <MessageMenu menuAnchor={menuAnchor.current} closeMenu={closeMenu} setActionType={setActionType} cancelEditMessage={cancelEditMessage} user ={user} editMessage={editMessage}  />
      <Stack direction={"row"} justifyContent={"end"} padding={"1rem"} position={"relative"} width={"100%"} background={"white"} height={"10%"}>
        <IconButton sx={{ position: "absolute", marginRight: "4rem" }} onClick={handleCall} >
          <Call />
        </IconButton>
        <IconButton sx={{ position: "absolute" }} onClick={handleCall}>
          <VideoCall />
        </IconButton>
      </Stack>
      <Stack
        ref={containerRef}
        boxSizing={"border-box"}
        padding={"1rem"}
        spacing={"1rem"}
        bgcolor={"rgba(0,0,0,0.1)"}
        height={"80%"}
        sx={{
          overflowX: "hidden",
          overflowY: "auto"
        }}
      >
        {!getOldMessageChunk.isLoading && getOldMessageChunk?.data?.messages.map((item) => {

          return <MessageComponent message={item} user={user} key={item.id} handleEditMessage={openMenu} />
        })}
        {userTyping && <TypingLoader />}
        {messageList.map((item) => {
          return <MessageComponent message={item} user={user} key={item.id} handleEditMessage={openMenu} />
        })}

        <div ref={bottomRef} />

      </Stack>
      <form style={{
        height: "10%"
      }}
        onSubmit={submitHandler}
      >
        <Stack direction={"row"} height={"100%"} padding={"1rem"} alignItems={"center"} position={"relative"} >
          {(actionType === "Edit" && editMessage) &&
            <Stack color={"white"} direction={"row"} justifyContent={"space-between"} backgroundColor={"rgba(234, 112, 112, 0.8)"} border={"1px solid white"} width={"-webkit-fill-available"} height={"100%"} position={"absolute"} sx={{ top: -50, bottom: 0, padding: "10px", borderTopRightRadius: "10px", borderTopLeftRadius: "10px", left: 0, right: 0, }}>

              <Box >
                <Typography fontSize={"14px"} fontWeight={"600"} >You</Typography>
                <Typography fontSize={"14px"} >{editMessage?.content}</Typography>
              </Box>
              <Box onClick={() => cancelEditMessage()}>
                <Close />
              </Box>

            </Stack>}
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
