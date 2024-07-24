import { Button, Dialog, DialogTitle, Skeleton, Stack, Typography } from '@mui/material'
import React, { useState } from 'react'
import { sampleUsers } from '../constants/sampleData'
import UserItem from '../shared/UserItem'
import { useAddGroupMembersMutation, useAvailableFriendsQuery } from '../../redux/api/api'
import { useAsyncMutationHooks, useErrors } from '../../hooks/hook'
import { useDispatch, useSelector } from 'react-redux'
import { setIsAddMember } from '../../redux/reducers/misc'

const AddMemberDialog = ({ isLoadingAddMember, chatId }) => {


    const dispatch = useDispatch()

    const [selectedMembers, setselectedMembers] = useState([])
    const { isAddMember } = useSelector((state) => state.misc)

    const { isLoading, isError, error, data } = useAvailableFriendsQuery(chatId)

    const [addMember, isLoadingAdd] = useAsyncMutationHooks(useAddGroupMembersMutation)


    const selectedMemberHandler = (id) => {
        setselectedMembers((prev) => prev.includes(id) ? prev.filter((currEl) => currEl !== id) : [...prev, id])
    }

    const addFriendHandler = (id) => {
        console.log(id, chatId);
    }

    console.log(selectedMembers, "31");

    const closeHandler = () => {
        dispatch(setIsAddMember(false))
    }

    const addMemberSubmitHandler = () => {
        addMember("Updating Group Name...", {chatId,  members: selectedMembers  })

        console.log("submit");
    }

    useErrors([{ error, isError }])

    return (
        <Dialog open={isAddMember} onClose={closeHandler}>
            <Stack p={"2rem"} width={"20rem"} spacing={"2rem"} >
                <DialogTitle textAlign={"center"}>
                    Add Members
                </DialogTitle>
                <Stack spacing={"1rem"} >
                    {isLoading ? <Skeleton /> : data?.friends?.length > 0 ? data?.friends?.map((item) => {
                        return <UserItem key={item._id} user={item} handler={selectedMemberHandler} isAdded={selectedMembers.includes(item._id)} />

                    }) : <Typography textAlign={"center"} >No Friends</Typography>}
                </Stack>
                <Stack direction={"row"} alignItems={"center"}>
                    <Button color='error' onClick={() => closeHandler()} >
                        Cancel
                    </Button>
                    <Button variant='contained' disabled={isLoadingAddMember} onClick={() => addMemberSubmitHandler()} disabled={isLoadingAddMember} >
                        Submit Changes
                    </Button>
                </Stack>

            </Stack>
        </Dialog>
    )
}

export default AddMemberDialog
