import { KeyboardBackspace, Menu } from '@mui/icons-material'
import { Box, Drawer, Grid, IconButton, Stack, Tooltip, Typography } from '@mui/material'
import React, { memo, useState } from 'react'
import { mateBlack } from '../components/constants/color'
import { useNavigate } from 'react-router-dom'
import { Link } from '../components/styles/StyledComponents'
import AvatarCard from '../components/shared/AvatarCard'
import { sampleChats } from '../components/constants/sampleData'

const Groups = () => {

    const chatId = "abc"

    const [isMobileMenuOpen, setisMobileMenuOpen] = useState(false)

    const navigate = useNavigate()

    const navigateBack = () => {
        navigate('/')
    }

    const handleMobile = () => {
        setisMobileMenuOpen((prev) => !prev)
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


    return (
        <Grid container height={"100vh"} >
            <Grid item sm={4} sx={{
                display: {
                    xs: "none",
                    sm: "block"
                }
            }}
                bgcolor={"bisque"}
            >
                <GroupList myGroups={sampleChats} chatId={chatId}  />
            </Grid>
            <Grid item xs={12} sm={8} sx={{ display: "flex", flexDirection: "column", position: "relative", padding: "1rem 2rem", alignItems: "center" }}  >
                {IconButtons}
            </Grid>
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
    <Stack>
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

    return <Link to={`?group=${_id}`} >
        <Stack>
            <AvatarCard avatar={avatar} />
            <Typography>{name}</Typography>
        </Stack>
    </Link>
})



export default Groups
