import { Avatar, Box, Skeleton, Stack } from '@mui/material';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import AdminLayout from '../../components/layout/AdminLayout';
import RenderAttachment from "../../components/shared/RenderAttachment";
import Table from '../../components/shared/Table';
import { fileFormat, transformImage } from '../../lib/features';
import { useAllMessagesQuery } from '../../redux/api/adminApi';

const columns = [
  {
    field: "id",
    headerName: "ID",
    headerClassName: "table-header",
    width: 200
  },
  {
    field: "attachments",
    headerName: "Attachments",
    headerClassName: "table-header",
    width: 150,
    renderCell: (params) => {
      const { attachments } = params.row
      return attachments.length ?
        attachments.map((attachment) => {
          const url = attachment.url;
          const file = fileFormat(url)
          return <Box sx={{ padding: "2rem 0" }}>
            <a href={url} download target='_blank' style={{ color: "black" }} >
              {RenderAttachment(file, url)}
            </a>
          </Box>
        }) : "No Attachment"
    },
  },
  {
    field: "content",
    headerName: "Content",
    headerClassName: "table-header",
    width: 400
  },
  {
    field: "sender",
    headerName: "Sent By",
    headerClassName: "table-header",
    width: 200,
    renderCell: (params) => (
      <Stack direction={"row"} spacing={"1rem"} alignItems={"center"} >
        <Avatar alt={params.row.sender.name} src={params.row.sender.avatar} />
        <span>{params.row.sender.name}</span>
      </Stack>

    )
  },
  {
    field: "chat",
    headerName: "Chat",
    headerClassName: "table-header",
    width: 220
  },
  {
    field: "groupChat",
    headerName: "Group Chat",
    headerClassName: "table-header",
    width: 100
  },
  {
    field: "createdAt",
    headerName: "Time",
    headerClassName: "table-header",
    width: 250
  },

];

const MessageManagement = () => {


  const { isLoading, isError, data, errors } = useAllMessagesQuery()

  const [rows, setRows] = useState([])

  useEffect(() => {

    if (data) {
      setRows(data.messages.map((msg) => ({
        ...msg,
        id: msg._id,
        sender: {
          name: msg.sender.name,
          avatar: transformImage(msg.sender.avatar, 50),
          createdAt: moment(msg.createdAt).format("MMMM Do YYYY, h:mm:ss a")
        }
      })))
    }

  }, [data])



  return (
    <AdminLayout>
      {isLoading ? <Skeleton  height={"100vh"} /> :
        <Table columns={columns} rows={rows} heading={"All Messages"} rowHeight={200} />
      }
    </AdminLayout>
  )
}

export default MessageManagement
