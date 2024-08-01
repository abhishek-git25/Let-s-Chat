import React from 'react'
import { Link } from 'react-router-dom'
import { Container, Stack, Typography } from '@mui/material'
import { Error } from '@mui/icons-material'


const NotFound = () => {
    return (
        <Container maxWidth="lg" sx={{ height: "100vh" }}>
            <Stack alignItems={"center"} spacing={"2rem"} justifyContent={"center"} height={"100%"} >
                <Error  sx={{ fontSize : "10rem" }} />
                <Typography variant='h1' >404</Typography>
                <Typography variant='h3' >Not Found</Typography>
                <Link to={"/"} >Go Back To Home</Link>
            </Stack>
        </Container>
    )
}

export default NotFound
