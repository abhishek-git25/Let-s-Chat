import { Avatar, Button, Dialog, DialogTitle, ListItem, Stack, Typography } from '@mui/material'
import React, { memo } from 'react'

import { sampleNotification } from '../constants/sampleData'

const Notification = () => {

  const friendRequestHandler = ({ _id, accept }) => {
    console.log(_id);
  }


  return (
    <>
      <Dialog open >
        <Stack p={{ xs: "1rem", sm: "2rem" }} maxWidth={"50rem"} >
          <DialogTitle sx={{ fontWeight : "bold" }}>
            Notification
          </DialogTitle>
          {sampleNotification.length > 0 ? sampleNotification.map((item) => <NotificationItem sender={item.sender} _id={item._id} handler={friendRequestHandler} />) : <Typography textAlign={"center"}>0 Notification</Typography>}

        </Stack>
      </Dialog>
    </>
  )
}

const NotificationItem = memo(({ sender, _id, handler }) => {

  const { name , icon} = sender
  console.log(icon , "31");

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
          xs : "column",
          sm : "row"
        }}>
          <Button onClick={() => handler({ _id , accept : true })} >Accept</Button>
          <Button color='error' onClick={() => handler({ _id , accept : false })}>Reject</Button>
        </Stack>
          {/* <AddIcon /> */}
        {/* </IconButton> */}
      </Stack>
    </ListItem>
  )
})

export default Notification
