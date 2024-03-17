import { Avatar, Stack, Typography } from '@mui/material'
import React from 'react'
import { Face as FaceIcon, AlternateEmail as UsernameIcon, CalendarMonth as CalendarIcon } from '@mui/icons-material'

const Profile = () => {
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
        />
        <ProfileCard text={"abc"} heading={"Bio"}  />
        <ProfileCard text={"Username"} heading={"@abc"} icon={<UsernameIcon/>} />
        <ProfileCard text={"Name"} heading={"ABHISHEK YADAV"} icon={<FaceIcon/>} />
        <ProfileCard text={"Joined"} heading={"15/03/24"} icon={<CalendarIcon/>} />


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
