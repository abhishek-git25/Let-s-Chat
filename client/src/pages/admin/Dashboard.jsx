import React from 'react'
import AdminLayout from '../../components/layout/AdminLayout'
import { Box, Container, Paper, Stack, Typography } from '@mui/material'
import { AdminPanelSettings, Group, Groups, Message, Notifications, Person } from '@mui/icons-material'
import moment from 'moment'
import { CurveButton, SearchField } from '../../components/styles/StyledComponents'
import { DoughnutChart, LineChart } from '../../components/specific/Chart'

const Dashboard = () => {

  const Widgets = (
    <Stack direction={{
      xs: "column",
      sm: "row"
    }}
      spacing="2rem"
      justifyContent="space-between"
      alignItems="center"
      margin={"2rem 0"}
    >
      <Widget title={"Users"} value={"34"} Icon={<Person />} />
      <Widget title={"Chats"} value={"3"} Icon={<Groups />} />
      <Widget title={"Messages"} value={"453"} Icon={<Message />} />

    </Stack>
  )

  const AppBar = (
    <Paper elevation={3} sx={{ padding: "2rem", borderRadius: "1rem", margin: "2rem 0" }} >
      <Stack direction={"row"} alignItems={"center"} spacing={"1rem"} >
        <AdminPanelSettings sx={{ fontSize: "3rem" }} />
        <SearchField placeholder='Search...' />
        <CurveButton>Search</CurveButton>
        <Box flexGrow={1} />
        <Typography display={{
          xs: "none",
          lg: "block"
        }} color={"rgba(0,0,0,0.7)"} textAlign={"center"}  >{moment().format("MMMM Do YYYY")}</Typography>
        <Notifications />
      </Stack>

    </Paper>
  )



  return (
    <AdminLayout>
      <Container component={"main"} >
        {AppBar}
        <Stack direction={{ xs: "column", sm: "row" }} flexWrap={"wrap"}  justifyContent={"center"} alignItems={{ xs : "center" , lg : "stretch" }} width={"100%"}  sx={{ gap : "2rem" }} >
          <Paper elevation={3} sx={{ padding: "2rem 3.5rem", borderRadius: "1rem", width: "100%", maxWidth: "45rem" }}  >
            <Typography>Last Message</Typography>
            <LineChart value={[1, 2, 3, 4, 0, 20, 50]} />
          </Paper>
          <Paper elevation={3} sx={{ padding: "1rem", borderRadius: "1rem", display: "flex", justifyContent: "center", alignItems: "center", position: "relative", width: "100%", maxWidth: "25rem" }} >
            <DoughnutChart labels={["Single Chats", "Group Chats"]} value={[23, 65]} />
            <Stack position={"absolute"} direction={"row"} justifyContent={"center"} alignItems={"center"} spacing={"0.5rem"} width={"100%"} height={"100%"}>
              <Group /><Typography>Vs</Typography>
              <Person />
            </Stack>
          </Paper>
        </Stack>
        {Widgets}
      </Container>
    </AdminLayout>
  )
}

const Widget = ({ title, value, Icon }) => <Paper sx={{ padding: "2rem", margin: "2rem 0", borderRadius: "1rem", width: "20rem" }} >
  <Stack alignItems={"center"} spacing={"1rem"}>
    <Typography sx={{ color: "rgba(0,0,0,0.7)", borderRadius: "50%", border: "5px solid rgba(0,0,0,0.9)", width: "5rem", height: "5rem", display: "flex", justifyContent: "center", alignItems: "center" }} >{value}</Typography>
    <Stack direction={"row"} spacing={"1rem"} alignItems={"center"}>
      {Icon}
      <Typography>{title}</Typography>
    </Stack>
  </Stack>
</Paper>


export default Dashboard
