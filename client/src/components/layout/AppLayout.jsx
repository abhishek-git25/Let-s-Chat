import { Drawer, Grid, Skeleton } from '@mui/material'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { useErrors } from '../../hooks/hook'
import { useMyChatsQuery } from '../../redux/api/api'
import { setIsMobileMenuFriendly } from '../../redux/reducers/misc'
import Title from '../shared/title'
import ChatList from '../specific/ChatList'
import Profile from '../specific/Profile'
import Header from './header'



const AppLayout = (WrappedComponent) => {



    return (props) => {



        const AppLayoutWrapper = () => {
            const { isLoading, isError, data, error ,refetch } = useMyChatsQuery()

            useErrors([{ isError , error }])

            const { isMobileMenuFriendly } = useSelector((state) => state.misc)

            const dispatch = useDispatch()

            console.log(data, "19");
            const params = useParams()
            const chatId = params.chatId

            const handleDeletChat = (e, _id, groupChat) => {
                e.preventDefault()
                console.log("Delete chat", _id, groupChat);
            }

            const handleMobileClose = () => {
                dispatch(setIsMobileMenuFriendly(false))
            }


            return (
                <>
                    <Title />
                    <Header />
                    {isLoading ?
                        <Skeleton />
                        :
                        <Drawer open={isMobileMenuFriendly} onClose={handleMobileClose}>
                            <ChatList w='70vw' chats={data?.chats} chatId={chatId} handleDeletChat={handleDeletChat} />
                        </Drawer>
                    }
                    <Grid container height={"calc(100vh - 4rem)"}>
                        <Grid item sm={4} md={3} sx={{ display: { xs: "none", sm: "block" } }} height={"100%"}>
                            {isLoading ? <Skeleton /> : <ChatList chats={data?.chats} chatId={chatId} handleDeletChat={handleDeletChat} />}
                        </Grid>
                        <Grid item xs={12} sm={8} md={5} lg={6} height={"100%"}>
                            <WrappedComponent {...props} />
                        </Grid>
                        <Grid item md={4} lg={3} height={"100%"} sx={{ display: { xs: "none", md: "block" }, padding: "2rem", bgcolor: "rgba(0,0,0,0.85)" }} >
                            <Profile />
                        </Grid>
                    </Grid>
                    {/* <WrappedComponent {...props} /> */}
                    {/* <div>Footer</div> */}
                </>
            )
        }


        return <AppLayoutWrapper />
    }


}

export default AppLayout
