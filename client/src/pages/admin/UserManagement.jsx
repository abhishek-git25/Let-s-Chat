import { Avatar, Skeleton } from '@mui/material';
import React, { useEffect, useState } from 'react';
import AdminLayout from '../../components/layout/AdminLayout';
import Table from '../../components/shared/Table';
import { transformImage } from '../../lib/features';
import { useAllUserQuery } from '../../redux/api/adminApi';

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
    renderCell: (params) => <Avatar alt={params.row.name} src={params.row.Avatar} />
  },
  {
    field: "name",
    headerName: "Name",
    headerClassName: "table-header",
    width: 200
  },
  {
    field: "username",
    headerName: "Username",
    headerClassName: "table-header",
    width: 200
  },
  {
    field: "friends",
    headerName: "Friends",
    headerClassName: "table-header",
    width: 150
  },
  {
    field: "groups",
    headerName: "Groups",
    headerClassName: "table-header",
    width: 150
  },
  {
    field: "joined",
    headerName: "Date Joined",
    headerClassName: "table-header",
    width: 150
  },

];

const UserManagement = () => {


  const { isLoading, isError, data, errors } = useAllUserQuery()

console.log(data , "62");
  const [rows, setRows] = useState([])

  useEffect(() => {
    if (data) {
      setRows(
        data?.data?.map((user) => ({ ...user, id: user._id, avatar: transformImage(user.avatar, 50) }))
      )
    }
  }, [data])

  return (
    <AdminLayout>

      {isLoading ? <Skeleton  height={"100vh"} /> :
        <Table heading={"All Users"} columns={columns} rows={rows} />
      }
    </AdminLayout>
  )
}

export default UserManagement
