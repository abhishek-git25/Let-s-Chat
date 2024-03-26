import { Add, Delete, Done, Edit, KeyboardBackspace, Menu } from '@mui/icons-material'
import { Backdrop, Box, Button, Drawer, Grid, IconButton, Stack, TextField, Tooltip, Typography } from '@mui/material'
import React, { Suspense, lazy, memo, useEffect, useState } from 'react'
import { bgGradient, mateBlack } from '../components/constants/color'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { Link } from '../components/styles/StyledComponents'
import AvatarCard from '../components/shared/AvatarCard'
import { sampleChats, sampleUsers } from '../components/constants/sampleData'
import UserItem from '../components/shared/UserItem'

const ConfirmDeleteDialog = lazy(() => import("../components/dialogs/ConfirmDeleteDialog"))
const AddMemberDialog = lazy(() => import("../components/dialogs/AddMemberDialog"))

const isAddMember = false

const Groups = () => {

    const chatId = useSearchParams()[0].get("group")
    const [isMobileMenuOpen, setisMobileMenuOpen] = useState(false)
    const [isEdit, setIsEdit] = useState(false)
    const [groupName, setGroupName] = useState('Group Name')
    const [confirmDeleteDialog, setConfirmDeleteDialog] = useState(false)

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

    const confirmDeleteHandler = () => {
        console.log("confirm delete");
        setConfirmDeleteDialog(true)
    }

    const deleteHandler = () => {
        setConfirmDeleteDialog(false)
    }

    const removeMemberHandler = (id) => {
        console.log("remove handler", id);
    }

    const closeConfirmDeletHandler = () => {
        setConfirmDeleteDialog(false)
    }


    const openAddMemberHandler = () => {
        console.log("confirm add");
    }

    const handleMobile = () => {
        setisMobileMenuOpen((prev) => !prev)
    }

    const updateGroupNameHandler = () => {
        setIsEdit(false)
    }

    const handleMobileCose = () => {
        setisMobileMenuOpen(false)
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
                <TextField onChange={(e) => setGroupName(e.target.value)} value={groupName} />
                <IconButton onClick={() => updateGroupNameHandler()}>
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


    return (
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
                <GroupList myGroups={sampleChats} chatId={chatId} />
            </Grid>
            <Grid item xs={12} sm={8} sx={{ display: "flex", flexDirection: "column", position: "relative", padding: "1rem 2rem", alignItems: "center" }}  >
                {IconButtons}
                {groupName && <>
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
                        {sampleUsers.map((item) => {
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
                <AddMemberDialog />
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
                <GroupList w={"50vw"} myGroups={sampleChats} chatId={chatId} />


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
