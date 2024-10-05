import { Delete, Edit } from '@mui/icons-material'
import { Menu, Stack, Typography } from '@mui/material'
import React from 'react'
import { useSelector } from 'react-redux'


const MessageMenu = ({ menuAnchor, closeMenu, setActionType, user, editMessage }) => {

    const { isMessageMenu } = useSelector((state) => state.misc)
    const sameSender = user?._id === editMessage?.sender?._id


    const menuData = [
        ...(sameSender ? [{
            id: 1,
            name: "Edit",
            icon: <Edit />,
        }] : []), // Add the Edit option only if sameSender is true
        {
            id: 2,
            name: "Delete",
            icon: <Delete />,
        },
    ];



    const handleClick = (type) => {
        setActionType(type)
        closeMenu()
    }




    return (
        <div>
            <Menu open={isMessageMenu} onClose={closeMenu} anchorEl={menuAnchor} anchorOrigin={{ vertical: "bottom", horizontal: "left" }} transformOrigin={{ vertical: "center", horizontal: "center" }}  >
            {menuData.map((item , index) => {
                return <Stack sx={{
                    width: "10rem",
                    padding: "0.5rem",
                    cursor: "pointer"
                }}
                    direction={"row"}
                    alignItems={"center"}
                    spacing={"0.5rem"}
                    key={index}
                    onClick={() => handleClick(item.name)}
                >
                    {item.icon} <Typography>{item.name} Message</Typography>
                </Stack>
            })}
            </Menu>
        </div>
    )
}

export default MessageMenu
