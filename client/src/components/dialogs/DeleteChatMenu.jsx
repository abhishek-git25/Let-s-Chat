import { Menu, Stack, Typography } from '@mui/material'
import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { setIsDeleteMenu } from '../../redux/reducers/misc'
import { Delete, ExitToApp } from '@mui/icons-material'
import { useNavigate } from 'react-router-dom'
import { useAsyncMutationHooks } from '../../hooks/hook'
import { useDeleteChatMutation } from '../../redux/api/api'

const DeleteChatMenu = ({ dispatch, deleteOptionAnchor }) => {

    const navigate = useNavigate()

    const [deleteChat,_ , deleteChatData] = useAsyncMutationHooks(useDeleteChatMutation)

    const { isDeleteMenu, selectedDeleteChat } = useSelector((state) => state.misc)

    const isGroup = selectedDeleteChat?.groupChat

    console.log(selectedDeleteChat , "20");

    const closeHandler = () => {
        dispatch(setIsDeleteMenu(false))
        deleteOptionAnchor = null
    }

    const leaveGroup = () => {
        console.log("Leave Group");
    }

    const deleteChatHandler = () => {
        closeHandler()
        deleteChat("Deleting Chat", selectedDeleteChat.chatId)
    }

    useEffect(() => {
        if(deleteChatData){
            navigate("/")
        }
    }, [deleteChatData])


    return (
        <div>
            <Menu open={isDeleteMenu} onClose={closeHandler} anchorEl={deleteOptionAnchor} anchorOrigin={{ vertical: "bottom", horizontal: "right" }} transformOrigin={{ vertical: "center", horizontal: "center" }}  >
                <Stack sx={{
                    width: "10rem",
                    padding: "0.5rem",
                    cursor: "pointer"
                }}
                    direction={"row"}
                    alignItems={"center"}
                    spacing={"0.5rem"}
                    onClick={isGroup ? leaveGroup : deleteChatHandler}
                >
                    {isGroup ? <><ExitToApp /><Typography>Leave Group</Typography></> : <> <Delete /> <Typography>Delete Chat</Typography> </>}
                </Stack>
            </Menu>
        </div>
    )
}

export default DeleteChatMenu
