import { Box, Drawer, Grid, IconButton, Stack, Typography, styled } from '@mui/material'
import React, { useState } from 'react'
import { grayColor } from '../constants/color'
import { Close, ExitToApp, Menu } from '@mui/icons-material'
import { useLocation, Link as LinkComponent, Navigate } from 'react-router-dom'
import { adminTabs } from '../constants/routes'
import { useDispatch, useSelector } from 'react-redux'
import { logoutAdmin } from '../../redux/thunks/admin'



const SideBar = ({ w = "100%" }) => {
    const Link = styled(LinkComponent)
        `text-decoration : none;
          border-radius : 2rem;
          padding : 1rem 2rem;
          color : black;
          overflow :auto;
          &:hover{
        color : rgba(0,0,0,0.54)
}
`

const dispatch =  useDispatch()

    const location = useLocation()

    const logoutHandler = () => {
        console.log("logout");
        dispatch(logoutAdmin())
    }


    return (
        <Stack width={w} direction={"column"} p={"3rem"} spacing={"3rem"} >
            <Typography variant='h3' textTransform={"uppercase"}>
                Let's Chat
            </Typography>
            <Stack spacing={"1rem"}>
                {adminTabs.map((tab) => {
                    return (
                        <Link key={tab.path} to={tab.path} sx={location.pathname === tab.path && {
                            bgcolor: "black",
                            color: "white",
                            ":hover": { color: "white" }
                        }} >
                            <Stack direction={"row"} alignItems={"center"} spacing={"1rem"}>
                                {tab.icon}
                                <Typography>{tab.name}</Typography>
                            </Stack>
                        </Link>
                    )
                })}
                <Link onClick={() => logoutHandler()} >
                    <Stack direction={"row"} alignItems={"center"} spacing={"1rem"}>
                        <ExitToApp />
                        <Typography>
                            Logout
                        </Typography>
                    </Stack>
                </Link>
            </Stack>
        </Stack>
    )
}


const AdminLayout = ({ children }) => {

const  {isAdmin} = useSelector((state) => state.auth)


    const [isMobile, setIsMobile] = useState(false)

    const handleMobile = () => {
        setIsMobile(!isMobile)
    }

    const handleClose = () => {
        setIsMobile(false)
    }

    if (!isAdmin) {
        return <Navigate to="/admin" />
    }


    return (
        <Grid container minHeight={"100vh"} >
            <Box sx={{
                display: { xs: "block", md: "none" },
                position: "fixed",
                right: "1rem",
                top: "1rem"
            }} >
                <IconButton onClick={() => handleMobile()}>
                    {isMobile ? <Close /> : <Menu />}
                </IconButton>
            </Box>
            <Grid item md={4} lg={3} sx={{ display: { xs: "none", md: "block" } }}  >
                <SideBar />
            </Grid>
            <Grid item xs={12} md={8} lg={9} sx={{ bgcolor: grayColor }} >
                {children}
            </Grid>
            <Drawer open={isMobile} onClose={handleClose} >
                <SideBar w={"50vw"} />
            </Drawer>
        </Grid>
    )
}

export default AdminLayout
