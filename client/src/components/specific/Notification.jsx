import { Avatar, Button, Dialog, DialogTitle, ListItem, Skeleton, Stack, Typography } from '@mui/material'
import React, { memo } from 'react'

import { useAsyncMutationHooks, useErrors } from '../../hooks/hook'
import { useAcceptFrientRequestMutation, useGetNotificationsQuery } from '../../redux/api/api'
import { useDispatch, useSelector } from 'react-redux'
import { setIsNotification } from '../../redux/reducers/misc'
import toast from 'react-hot-toast'

const Notification = () => {

  const { isNotification } = useSelector((state) => state.misc)
  const dispatch = useDispatch()

  const { isLoading, data, isError, error } = useGetNotificationsQuery()

  const [acceptRequest] =  useAsyncMutationHooks(useAcceptFrientRequestMutation)  

  useErrors([{ error, isError }])

  const friendRequestHandler = async ({ _id, accept }) => {

  await  acceptRequest("Accepting...",  { requestId: _id, accept })

    dispatch(setIsNotification(false))
    // try {
    //   const res = await acceptRequest({ requestId: _id, accept })
    //   if (res.data.success) {
    //     console.log("Use socket here");
    //     toast.success(res.data.message)
    //   } else {
    //     toast.error(res.data.error || "Something went wrong !!")
    //   }
    // } catch (error) {
    //   toast.error(error.response.data.message || "Something went wrong !!")
    //   console.log(error);

    // }
  }

  const closeHandler = () => {
    dispatch(setIsNotification(false))
  }



  return (
    <>
      <Dialog open={isNotification} onClose={closeHandler} >
        <Stack p={{ xs: "1rem", sm: "2rem" }} maxWidth={"50rem"} >
          <DialogTitle sx={{ fontWeight: "bold" }}>
            Notification
          </DialogTitle>
          {isLoading ? <Skeleton /> :
            <>
              {data?.request?.length > 0 ? data.request.map((item) => <NotificationItem sender={item.sender} _id={item._id} handler={friendRequestHandler} />) : <Typography textAlign={"center"}>0 Notification</Typography>}
            </>
          }

        </Stack>
      </Dialog>
    </>
  )
}

const NotificationItem = memo(({ sender, _id, handler }) => {

  const { name, icon } = sender
  console.log(icon, "31");

  return (
    <ListItem>
      <Stack direction={"row"} alignItems={"center"} spacing={"1rem"} width={"100%"} >
        <Avatar />
        <Typography variant='body1' sx={{
          flexGrow: 1,
          display: "-webkit-box",
          WebkitLineClamp: 1,
          WebkitBoxOrient: "vertical",
          overflow: "hidden",
          textOverflow: "ellipsis",
          width: "100%",
        }} >{`${name} sent you frient request`}</Typography>
        {/* <IconButton size='small' sx={{
          bgcolor: "primary.main", color: "white", "&:hover": {
            bgcolor: "primary.dark"
          }
        }} > */}
        <Stack direction={{
          xs: "column",
          sm: "row"
        }}>
          <Button onClick={() => handler({ _id, accept: true })} >Accept</Button>
          <Button color='error' onClick={() => handler({ _id, accept: false })}>Reject</Button>
        </Stack>
        {/* <AddIcon /> */}
        {/* </IconButton> */}
      </Stack>
    </ListItem>
  )
})

export default Notification
