import { useInputValidation } from '6pp'
import { Button, Dialog, DialogTitle, Stack, TextField } from '@mui/material'
import React, { useState } from 'react'
import { sampleUsers } from "../constants/sampleData"
import UserItem from '../shared/UserItem'

const NewGroup = () => {

    const groupName = useInputValidation()

    const [members, setMembers] = useState(sampleUsers)
    const [selectedMembers, setselectedMembers] = useState([])

    const selectedMemberHandler = (id) => {
        setMembers((prev) => prev.map(user => user._id === id ? { ...user, isAdded: !user.isAdded } : user))
        setselectedMembers((prev) => prev.includes(id) ? prev.filter((currEl) => currEl !== id) : [...prev, id])
    }


    const submitHandler = () => {
        console.log("submit");
    }

    const closeHandler = () =>{
        console.log("close");
    }

    return (
        <Dialog open >
            <Stack p={{ xs: "1rem", sm: "2rem" }} width={"100%"} >
                <DialogTitle sx={{ fontWeight: "bold" }}>
                    New Group
                </DialogTitle>
                <TextField label="Group Name" sx={{ marginBottom: "1rem" }} value={groupName.value} onChange={groupName.changeHandler} />
                <Stack>
                    {sampleUsers.map((user, index) => {
                        return (
                            <UserItem
                                user={user}
                                key={user._id}
                                handler={selectedMemberHandler}
                                isAdded={selectedMembers.includes(user._id)}
                            />
                        )
                    })}
                </Stack>
                <Stack direction={"row"} marginTop={"1rem"} justifyContent={"space-between"} >
                    <Button variant='contained'>
                        Create
                    </Button>
                    <Button variant='outlined' color='error' onClick={() => submitHandler()} >
                        Cancel
                    </Button>
                </Stack>

            </Stack>
        </Dialog>
    )
}

export default NewGroup
