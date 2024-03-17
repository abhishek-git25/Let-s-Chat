import { Dialog, DialogTitle, InputAdornment, List, ListItem, ListItemText, Stack, TextField } from '@mui/material'
import React, { useState } from 'react'
import { useInputValidation } from '6pp'
import { Search as SearchIcon } from '@mui/icons-material'
import UserItem from '../shared/UserItem'
import { sampleUsers } from '../constants/sampleData'

const Search = () => {

  const users = [1, 2, 3]

  const search = useInputValidation("")

  let isLoadingSendFriendRequest = false

  const [usersData, setUsersData] = useState(sampleUsers)

  const addFriendHandler = (id) =>{
    console.log(id);
  }


  return (
    <Dialog open>
      <Stack p={"2rem"} direction={"column"} width={"25rem"} >
        <DialogTitle textAlign={"center"}>
          Find People
        </DialogTitle>
        <TextField label="" value={search.value} onChange={search.changeHandler} variant='outlined' size='small' InputProps={{
          startAdornment: (
            <InputAdornment position='start' >
              <SearchIcon />
            </InputAdornment>
          )
        }} />
        <List>
          {usersData.map((user, index) => {
            return (
              <UserItem user={user} key={user._id} handler={addFriendHandler} handlerIsLoading={isLoadingSendFriendRequest} />
            )
          })}
        </List>
      </Stack>
    </Dialog>
  )
}

export default Search
