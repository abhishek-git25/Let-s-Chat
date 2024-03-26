import { Button, Dialog, DialogTitle, Stack, Typography } from '@mui/material'
import React, { useState } from 'react'
import { sampleUsers } from '../constants/sampleData'
import UserItem from '../shared/UserItem'

const AddMemberDialog = ({ addMember, isLoadingAddMember, chatId }) => {

    const [members, setMembers] = useState(sampleUsers)
    const [selectedMembers, setselectedMembers] = useState([])

    const selectedMemberHandler = (id) => {
        setMembers((prev) => prev.map(user => user._id === id ? { ...user, isAdded: !user.isAdded } : user))
        setselectedMembers((prev) => prev.includes(id) ? prev.filter((currEl) => currEl !== id) : [...prev, id])
    }

    const addFriendHandler = (id) => {
        console.log(id, chatId);
    }

    const closeHandler = () => {
        setMembers([])
        setselectedMembers([])
    }

    const addMemberSubmitHandler = () => {
        console.log("submit");
    }

    return (
        <Dialog open onClose={closeHandler}>
            <Stack p={"2rem"} width={"20rem"} spacing={"2rem"} >
                <DialogTitle textAlign={"center"}>
                    Add Members
                </DialogTitle>
                <Stack spacing={"1rem"} >
                    {members.length > 0 ? members.map((item) => {
                        return <UserItem key={item._id} user={item} handler={selectedMemberHandler} isAdded={selectedMembers.includes(item._id)} />

                    }) : <Typography textAlign={"center"} >No Friends</Typography>}
                </Stack>
                <Stack direction={"row"} alignItems={"center"}>
                    <Button color='error' onClick={() => closeHandler()} >
                        Cancel
                    </Button>
                    <Button variant='contained' onClick={() => addMemberSubmitHandler()} disabled={isLoadingAddMember} >
                        Submit Changes
                    </Button>
                </Stack>

            </Stack>
        </Dialog>
    )
}

export default AddMemberDialog
