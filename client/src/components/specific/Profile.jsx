import { Avatar, Stack, Typography } from '@mui/material'
import React from 'react'
import { Face as FaceIcon, AlternateEmail as UsernameIcon, CalendarMonth as CalendarIcon } from '@mui/icons-material'
import moment from 'moment';

const Profile = ({ user }) => {
  console.log(user , "6");
  return (
    <div>
      <Stack spacing={"2rem"} direction={"column"} alignItems={"center"} >
        <Avatar
          sx={{
            width: 200,
            height: 200,
            objectFit: 'contain',
            marginBottom: '1rem',
            border: "5px solid white"
          }}
          src={user?.avatar?.url}
        />
        <ProfileCard text={user?.bio} heading={"Bio"} />
        <ProfileCard text={user?.username} heading={"@abc"} icon={<UsernameIcon />} />
        <ProfileCard text={user?.name} heading={"Name"} icon={<FaceIcon />} />
        <ProfileCard text={"Joined"} heading={moment(user?.createdAt).fromNow()} icon={<CalendarIcon />} />


      </Stack>
    </div>
  )
}

const ProfileCard = ({ text, icon, heading }) => <div>
  <Stack direction={"row"} alignItems={"center"} spacing={"1rem"} color={"white"} textAlign={"center"} >
    {icon && icon}
    <Stack>
      <Typography variant='body1' >{text}</Typography>
      <Typography variant='caption' color="grey"> {heading} </Typography>
    </Stack>
  </Stack>
</div>

export default Profile
