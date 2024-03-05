import React, { useState } from 'react'
import { Container, Paper, Typography, TextField, Button, Stack, Avatar, IconButton } from '@mui/material'
import { CameraAlt as CameraAltIcon } from '@mui/icons-material'
import { VisuallyHiddenInput } from '../components/styles/StyledComponents'
import { useFileHandler, useInputValidation } from '6pp'
import { usernameValidator } from '../utils/validators'

const Login = () => {

    const [login, setLogin] = useState(true)
    const name = useInputValidation()
    const username = useInputValidation("", usernameValidator)
    const password = useInputValidation()
    const bio = useInputValidation()

    const avatar = useFileHandler("single")


    return (
        <Container component={"main"} maxWidth="sx" sx={{ height: "100%", display: "flex", justifyContent: "center", maxWidth: "450px" }} >
            <Paper elevation={3} sx={{
                padding: 4,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",

            }} >
                {login ? (
                    <>
                        <Typography variant="h5">Login</Typography>
                        <form style={{ width: "100%", marginTop: "1rem" }} >
                            <TextField required fullWidth label="Username" margin='normal' variant='outlined' />
                            <TextField required fullWidth label="Password" type='password' margin='normal' variant='outlined' />
                            <Button color='primary' type='submit' fullWidth variant='contained' sx={{ marginTop: "1rem" }} >
                                Login
                            </Button>
                            <Typography textAlign={"center"} m={"1rem"} >Or</Typography>
                            <Button sx={{ marginTop: "1rem" }} fullWidth variant='text' onClick={() => setLogin(false)} >
                                Sign In Instead
                            </Button>
                        </form>
                    </>
                ) :
                    <>
                        <Typography variant="h5">Register</Typography>
                        <form style={{ width: "100%", marginTop: "1rem" }} >
                            <Stack position={"relative"} width={"10rem"} margin={"auto"} >
                                <Avatar sx={{ width: "10rem", height: "10rem" }} src={avatar.preview} />
                                <IconButton sx={{
                                    position: "absolute", bottom: 0, right: 0, bgcolor: "rgba(255 , 255 ,255,0.5)", ":hover": {
                                        bgcolor: "rgba(255 , 255,255,0.7)"
                                    }
                                }}
                                    component="label"
                                >
                                    <>
                                        <CameraAltIcon />
                                        <VisuallyHiddenInput type='file' onChange={avatar.changeHandler} />
                                    </>
                                </IconButton>
                            </Stack>
                            {avatar.error && (
                                <Typography m={"1rem auto"} width={"fit-content"} display={"block"} color="error" variant='caption'>
                                    {avatar.error}
                                </Typography>
                            )}
                            <TextField required fullWidth label="Name" margin='normal' variant='outlined' value={name.value} onChange={name.changeHandler} />
                            <TextField required fullWidth label="Bio" margin='normal' variant='outlined' value={bio.value} onChange={bio.changeHandler} />
                            <TextField required fullWidth label="Username" margin='normal' variant='outlined' value={username.value} onChange={username.changeHandler} />
                            {username.error && (
                                <Typography color="error" variant='caption' >
                                    {username.error}
                                </Typography>
                            )}
                            <TextField required fullWidth label="Password" type='password' margin='normal' variant='outlined' value={password.value} onChange={password.changeHandler} />

                            <Button color='primary' type='submit' fullWidth variant='contained' sx={{ marginTop: "1rem" }} >
                                SIGN UP
                            </Button>
                            <Typography textAlign={"center"} m={"1rem"} >Or</Typography>
                            <Button sx={{ marginTop: "1rem" }} fullWidth variant='text' onClick={() => setLogin(true)} >
                                Login Instead
                            </Button>
                        </form>

                    </>
                }
            </Paper>
        </Container>
    )
}

export default Login
