import { useInputValidation } from '6pp'
import { Button, Dialog, DialogTitle, Skeleton, Stack, TextField } from '@mui/material'
import React, { useState } from 'react'
import toast from 'react-hot-toast'
import { useDispatch, useSelector } from 'react-redux'
import { useAsyncMutationHooks, useErrors } from '../../hooks/hook'
import { useAvailableFriendsQuery, useNewGroupMutation } from '../../redux/api/api'
import { setIsNewGroup } from '../../redux/reducers/misc'
import { sampleUsers } from "../constants/sampleData"
import UserItem from '../shared/UserItem'

const NewGroup = () => {

    const groupName = useInputValidation()

    const { isNewGroup } = useSelector((state) => state.misc)

    const [newGroup, isLoadingNewGroup] = useAsyncMutationHooks(useNewGroupMutation)

    const { isError, isLoading, error, data } = useAvailableFriendsQuery()

    const [members, setMembers] = useState(sampleUsers)
    const [selectedMembers, setselectedMembers] = useState([])

    const dispatch = useDispatch()

    const errors = [
        {
            error,
            isError
        }
    ]

    useErrors(errors)

    const selectedMemberHandler = (id) => {
        setMembers((prev) => prev.map(user => user._id === id ? { ...user, isAdded: !user.isAdded } : user))
        setselectedMembers((prev) => prev.includes(id) ? prev.filter((currEl) => currEl !== id) : [...prev, id])
    }


    const submitHandler = () => {
        if (!groupName.value) return toast.error("Group Name is required !")

        if (selectedMembers.length < 2) {
            return toast.error("Please select atleast 2 members")
        }

        console.log(groupName.value , selectedMembers , "49");

        newGroup("Creating New Group..." , { name: groupName.value, members: selectedMembers })
    }

    const closeHandler = () => {
        dispatch(setIsNewGroup(false))
    }

    return (
        <Dialog open={isNewGroup} onClose={closeHandler} >
            <Stack p={{ xs: "1rem", sm: "2rem" }} width={"100%"} >
                <DialogTitle sx={{ fontWeight: "bold" }}>
                    New Group
                </DialogTitle>
                <TextField label="Group Name" sx={{ marginBottom: "1rem" }} value={groupName.value} onChange={groupName.changeHandler} />
                <Stack>
                    {isLoading ? <Skeleton /> : data?.friends?.map((user, index) => {
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
                    <Button variant='contained' disabled = {isLoadingNewGroup} onClick={() => submitHandler()} >
                        Create
                    </Button>
                    <Button variant='outlined' color='error' >
                        Cancel
                    </Button>
                </Stack>

            </Stack>
        </Dialog>
    )
}

export default NewGroup
