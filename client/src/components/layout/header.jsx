import { Add as AddIcon, Group as GroupIcon, Logout as LogoutIcon, Menu as Menuicon, Notifications as NotificationIcon, Search as SearchIcon } from "@mui/icons-material"
import { AppBar, Backdrop, Box, IconButton, Toolbar, Tooltip, Typography } from '@mui/material'
import axios from 'axios'
import React, { Suspense, lazy, useState } from 'react'
import toast from 'react-hot-toast'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from "react-router-dom"
import { userNotExist } from '../../redux/reducers/auth'
import { setIsMobileMenuFriendly, setIsSearch } from '../../redux/reducers/misc'
import { orange } from '../constants/color'
import { server } from '../constants/config'

const Search = lazy(() => import('../specific/Search'))
const Notification = lazy(() => import('../specific/Notification'))
const NewGroups = lazy(() => import('../specific/NewGroup'))

const Header = () => {

  // const [isSearch, setIsSearch] = useState(false)
  const [isNewGroup, setIsNewGroup] = useState(false)
  const [isNotification, setIsNotification] = useState(false)


  const dispatch = useDispatch()

  const { isSearch } = useSelector((state) => state.misc)


  const navigate = useNavigate()

  const handleMobileOpen = () => {
    dispatch(setIsMobileMenuFriendly(true))
  }

  const openSearchDialog = () => {
    dispatch(setIsSearch(true))
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

  const logoutHandler = async () => {
    console.log("logout");

    try {
      const { data } = await axios.get(`${server}/user/logout`, { withCredentials: true })
      dispatch(userNotExist())
      toast.success(data.message)

    } catch (error) {
      toast.error(error?.response?.data?.message)
    }


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
              <IconButton color='inherit' onClick={() => handleMobileOpen()}>
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
