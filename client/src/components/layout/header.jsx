import { AppBar, Backdrop, Box, IconButton, Toolbar, Tooltip, Typography } from '@mui/material'
import React, { Suspense, lazy, useState } from 'react'
import { orange } from '../constants/color'
import { Menu as Menuicon, Search as SearchIcon, Add as AddIcon, Group as GroupIcon, Logout as LogoutIcon, Notifications as NotificationIcon } from "@mui/icons-material"
import { useNavigate } from "react-router-dom"

const Search = lazy(() => import('../specific/Search'))
const Notification = lazy(() => import('../specific/Notification'))
const NewGroups = lazy(() => import('../specific/NewGroup'))

const Header = () => {

  const [isMobile, setisMobile] = useState(false)
  const [isSearch, setIsSearch] = useState(false)
  const [isNewGroup, setIsNewGroup] = useState(false)
  const [isNotification, setIsNotification] = useState(false)


  const navigate = useNavigate()

  const handleMobile = () => {
    console.log("Mobile");
    setisMobile((prev) => !prev)
  }

  const openSearchDialog = () => {

    setIsSearch((prev) => !prev)
  }

  const newGroup = () => {
    console.log("NEW GROUP");
    setIsNewGroup((prev) => !prev)
  }

  const openNotification = () => {
    setIsNotification((prev) => !prev)
  }

  const navigateToGroup = () => {
    navigate('/groups')
  }

  const logoutHandler = () => {
    console.log("logout");
  }


  return (
    <>
      <Box sx={{ flexGrow: 1 }} height={"4rem"}>
        <AppBar position='static' sx={{ bgcolor: orange }}>
          <Toolbar>
            <Typography variant='h6' sx={{ display: { xs: "none", sm: "block" } }}  >
              Let's Chat
            </Typography>
            <Box sx={{ display: { xs: "block", sm: "none" } }}>
              <IconButton color='inherit' onClick={() => handleMobile()}>
                <Menuicon />
              </IconButton>
            </Box>
            <Box sx={{ flexGrow: 1 }} />
            <Box>
              <IconBtn title={"Search"} icon={<SearchIcon />} onClick={openSearchDialog} />
              <IconBtn title={"New Group"} icon={<AddIcon />} onClick={newGroup} />
              <IconBtn title={"Manage Groups"} icon={<GroupIcon />} onClick={navigateToGroup} />
              <IconBtn title={"Notifications"} icon={<NotificationIcon />} onClick={openNotification} />

              <IconBtn title={"Logout"} icon={<LogoutIcon />} onClick={logoutHandler} />

            </Box>
          </Toolbar>
        </AppBar>
      </Box>

      {isSearch && (
        <Suspense fallback={<Backdrop open />} >
          <Search />
        </Suspense>
      )}

      {isNotification && (
        <Suspense fallback={<Backdrop open />} >
          <Notification />
        </Suspense>
      )}

      {isNewGroup && (
        <Suspense fallback={<Backdrop open />} >
          <NewGroups />
        </Suspense>
      )}
    </>
  )
}

const IconBtn = ({ title, icon, onClick }) => {
  return (
    <Tooltip title={title} >
      <IconButton color='inherit' size='large' onClick={() => onClick()} >
        {icon}
      </IconButton>
    </Tooltip>
  )
}


export default Header
