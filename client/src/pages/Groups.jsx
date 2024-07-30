import { Add, Delete, Done, Edit, KeyboardBackspace, Menu } from '@mui/icons-material'
import { Backdrop, Box, Button, CircularProgress, Drawer, Grid, IconButton, Stack, TextField, Tooltip, Typography } from '@mui/material'
import React, { Suspense, lazy, memo, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { bgGradient, mateBlack } from '../components/constants/color'
import { LayoutLoaders } from '../components/layout/Loaders'
import AvatarCard from '../components/shared/AvatarCard'
import UserItem from '../components/shared/UserItem'
import { Link } from '../components/styles/StyledComponents'
import { useAsyncMutationHooks, useErrors } from '../hooks/hook'
import { useChatDetailsQuery, useDeleteChatMutation, useMyGroupsQuery, useRemoveGroupMembersMutation, useRenameGroupMutation } from '../redux/api/api'
import { setIsAddMember } from '../redux/reducers/misc'

const ConfirmDeleteDialog = lazy(() => import("../components/dialogs/ConfirmDeleteDialog"))
const AddMemberDialog = lazy(() => import("../components/dialogs/AddMemberDialog"))

const isAddMember = false

const Groups = () => {

    const chatId = useSearchParams()[0].get("group")
    const [isMobileMenuOpen, setisMobileMenuOpen] = useState(false)
    const [isEdit, setIsEdit] = useState(false)
    const [groupName, setGroupName] = useState('Group Name')
    const [groupNameUpdatedValue, setgroupNameUpdatedValue] = useState('')
    const [confirmDeleteDialog, setConfirmDeleteDialog] = useState(false)
    const [members, setMembers] = useState([])
    const [isDeleted, setIsDeleted] = useState(false)
    const myGroups = useMyGroupsQuery()
    const dispatch =  useDispatch()

    const {isAddMember} = useSelector((state) => state.misc)


    const [updateGroupName, isLoadingGroupName] = useAsyncMutationHooks(useRenameGroupMutation)
    const [removeMember, isLoadingRemove] = useAsyncMutationHooks(useRemoveGroupMembersMutation)
    const [deleteGroup, isLoadingDeleteGroup] = useAsyncMutationHooks(useDeleteChatMutation)



    const groupDetails = useChatDetailsQuery({ chatId, populate: true })

    const navigate = useNavigate()

    useEffect(() => {
        if (chatId) {
            setGroupName(`Group Name${chatId}`)
        }

        return () => {
            setGroupName("")
            setIsEdit(false)
        }
    }, [chatId])

    const navigateBack = () => {
        navigate('/')
    }

    const errors = [
        {
            isError: myGroups.isError,
            error: myGroups.error
        },
        {
            isError: groupDetails.isError,
            error: groupDetails.error
        }
    ]

    useErrors(errors)



    useEffect(() => {
        const groupData = groupDetails?.data
        if (groupData) {
            setGroupName(groupData?.chat?.name)
            setgroupNameUpdatedValue(groupData?.chat?.name)
            setMembers(groupDetails?.data?.chat?.members)
        }
        return () => {
            setGroupName("")
            setgroupNameUpdatedValue("")
            setMembers([])
            setIsEdit(false)
            setIsDeleted(false)
        }
    }, [groupDetails?.data , isDeleted])

    const confirmDeleteHandler = () => {
        setConfirmDeleteDialog(true)
    }

    const deleteHandler = () => {
        deleteGroup("Deleting..." , chatId)
        closeConfirmDeletHandler()
        setIsDeleted(true)
        navigate("/groups")
    }


    const removeMemberHandler = (id) => {
        removeMember("Removing Member...", { chatId, userId: id })
    }

    const closeConfirmDeletHandler = () => {
        setConfirmDeleteDialog(false)
    }


    const openAddMemberHandler = () => {
        dispatch(setIsAddMember(true))
        console.log("confirm add");
    }

    const handleMobile = () => {
        setisMobileMenuOpen((prev) => !prev)
    }

    const updateGroupNameHandler = () => {
        updateGroupName("Updating Group Name...", { chatId, name: groupName })
        setIsEdit(false)
    }

    const handleMobileCose = () => {
        setisMobileMenuOpen(false)
    }

    const handleGroupName = (e) => {
        e.preventDefault()
        setGroupName(e.target.value)
    }



    const IconButtons = <>
        <Box>
            <IconButton sx={{
                xs: "block", sm: "none", position: "fixed", right: "1rem", top: "1rem"
            }} onClick={() => handleMobile()}  >
                <Tooltip title="menu" >
                    <Menu />
                </Tooltip>
            </IconButton>
        </Box>
        <Tooltip title="back" >
            <IconButton sx={{
                position: "absolute",
                top: "2rem",
                left: "2rem",
                bgcolor: mateBlack,
                color: "white",
                ":hover": {
                    bgcolor: "rgba(0,0,0,0.7)"
                }

            }}
                onClick={() => navigateBack()}
            >
                <KeyboardBackspace />
            </IconButton>
        </Tooltip>
    </>

    const GroupName = <Stack direction={"row"} alignItems={"center"} justifyContent={"center"} spacing={"1rem"} padding={"3rem"} >
        {
            isEdit ? <>
                <TextField onChange={(e) => handleGroupName(e)} value={groupName} />
                <IconButton onClick={(e) => updateGroupNameHandler(e)}>
                    <Done />
                </IconButton>
            </> :
                <>
                    <Typography variant='h4'>{groupName}</Typography>
                    <IconButton onClick={() => setIsEdit(true)}>
                        <Edit />
                    </IconButton>
                </>
        }
    </Stack>

    const ButtonGroup = (
        <Stack direction={{
            sm: "row",
            xs: "column-reverse"
        }}
            spacing={"1rem"}
            p={{
                sm: "1rem",
                xs: "0",
                md: "1rem 4rem"
            }}
        >
            <Button size='large' variant='contained' startIcon={<Add />} onClick={() => openAddMemberHandler()} >Add Members</Button>
            <Button size='large' color='error' variant='outlined' startIcon={<Delete />} onClick={() => confirmDeleteHandler()} >Delete Group</Button>

        </Stack>
    )


    return myGroups.isLoading ? <LayoutLoaders /> : (
        <Grid container height={"100vh"} >
            <Grid item sm={4} sx={{
                display: {
                    xs: "none",
                    sm: "block"
                },
                backgroundImage: bgGradient
            }}
            // bgcolor={"bisque"}
            >
                <GroupList myGroups={myGroups?.data?.groups} chatId={chatId} />
            </Grid>
            <Grid item xs={12} sm={8} sx={{ display: "flex", flexDirection: "column", position: "relative", padding: "1rem 2rem", alignItems: "center" }}  >
                {IconButtons}
                {groupNameUpdatedValue && <>
                    {GroupName}
                    <Typography margin={"2rem"} alignSelf={"flex-start"} variant='body1' >Members</Typography>
                    <Stack
                        maxWidth={"45rem"}
                        width={"100%"}
                        boxSizing={"border-box"}
                        padding={{
                            sm: "1rem",
                            xs: "0",
                            md: "1rem 4rem"
                        }}
                        spacing={"2rem"}
                        height={"50vh"}
                        overflow={"auto"}
                    >
                        {isLoadingRemove ? <CircularProgress/>  : members?.map((item) => {
                            return <UserItem
                                user={item}
                                key={item._id}
                                isAdded={true} styling={{
                                    boxShadow: "0 0 0.5rem rgba(0,0,0,0.2)",
                                    padding: "1rem 2rem",
                                    borderRadius: "1rem"
                                }}
                                handler={removeMemberHandler}
                            />
                        })}

                    </Stack>
                </>}
                {ButtonGroup}
                .
            </Grid>

            {isAddMember && <Suspense fallback={<Backdrop open />}>
                <AddMemberDialog chatId={chatId}  />
            </Suspense>}
            {confirmDeleteDialog && (
                <Suspense fallback={<Backdrop open />} >
                    <ConfirmDeleteDialog open={confirmDeleteDialog} handleClose={closeConfirmDeletHandler} deleteHandler={deleteHandler} />
                </Suspense>
            )
            }
            <Drawer sx={{
                display: {
                    xs: "block",
                    sm: "none"
                }
            }} open={isMobileMenuOpen} onClose={handleMobileCose} >
                <GroupList w={"50vw"} myGroups={myGroups?.data?.groups} chatId={chatId} />


            </Drawer>
        </Grid>
    )
}

const GroupList = ({ w = "100%", myGroups = [], chatId }) => (
    <Stack width={w} sx={{ backgroundImage: bgGradient, height: "100vh" }} >
        {
            myGroups.length > 0 ? myGroups.map((group) => {
                return <GroupListItem groups={group} chatId={chatId} key={group._id} />
            }) :
                <Typography textAlign={"center"} padding="1rem" >
                    No GROUP
                </Typography>
        }
    </Stack>
)

const GroupListItem = memo(({ groups, chatId }) => {
    const { name, avatar, _id } = groups

    const preventDefault = (e) => {
        if (chatId === _id) {
            e.preventDefault()
        }
    }

    return <Link to={`?group=${_id}`} onClick={(e) => preventDefault(e)}  >
        <Stack direction={"row"} spacing={"1rem"} alignItems={"center"} >
            <AvatarCard avatar={avatar} />
            <Typography>{name}</Typography>
        </Stack>
    </Link>
})



export default Groups
