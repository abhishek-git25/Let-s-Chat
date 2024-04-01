import { Avatar, Stack } from '@mui/material';
import React, { useState } from 'react';
import { dashboardData } from '../../components/constants/sampleData';
import AdminLayout from '../../components/layout/AdminLayout';
import AvatarCard from '../../components/shared/AvatarCard';
import Table from '../../components/shared/Table';
import { transformImage } from '../../lib/features';

const columns = [
  {
    field: "id",
    headerName: "ID",
    headerClassName: "table-header",
    width: 200
  },
  {
    field: "avatar",
    headerName: "Avatar",
    headerClassName: "table-header",
    width: 150,
    renderCell: (params) => <AvatarCard avatar={params.row.avatar} />
  },
  {
    field: "name",
    headerName: "Name",
    headerClassName: "table-header",
    width: 200
  },
  {
    field: "totalMembers",
    headerName: "Total Members",
    headerClassName: "table-header",
    width: 200
  },
  {
    field: "members",
    headerName: "Members",
    headerClassName: "table-header",
    width: 400,
    renderCell: (params) => <AvatarCard max={100} avatar={params.row.members} />
  },
  {
    field: "totalMessage",
    headerName: "Total Messages",
    headerClassName: "table-header",
    width: 120
  },
  {
    field: "creator",
    headerName: "Created By",
    headerClassName: "table-header",
    width: 250,
    renderCell: (params) => (
      <Stack direction={"row"} alignItems="center" spacing={"1rem"}>
        <Avatar alt={params.row.creator.name} src={params.row.creator.avatar} />
        <span>{params.row.creator.name}</span>
      </Stack>
    )
  },

];

const ChatManagement = () => {

  const [rows, setRows] = useState(dashboardData.chats.map((chat) => ({
    ...chat,
    id: chat._id,
    avatar: chat.avatar.map((i) => transformImage(i, 50)),
    members: chat.members.map((i) => transformImage(i.avatar, 50))
  })))

  return (
    <AdminLayout>
      <Table heading={"All Chats"} columns={columns} rows={rows} />
    </AdminLayout>
  )
}

export default ChatManagement
