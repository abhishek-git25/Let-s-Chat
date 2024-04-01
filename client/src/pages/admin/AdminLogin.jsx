import { useInputValidation } from '6pp'
import { Button, Container, Paper, TextField, Typography } from '@mui/material'
import React from 'react'
import { Navigate } from 'react-router-dom'


const isAdmin = true

const AdminLogin = () => {

    const secretKey = useInputValidation()
    const submitHandler = (e) => {
        e.preventDefault()
    }

    if(isAdmin) return <Navigate to={"/admin/dashboard"} /> 


    return (
        <Container component={"main"} maxWidth="sx" sx={{ height: "100%", display: "flex", justifyContent: "center",alignItems : "center" , maxWidth: "450px" }} >
            <Paper elevation={3} sx={{
                padding: 4,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",

            }} >
                <Typography variant="h5">Admin Login</Typography>
                <form style={{ width: "100%", marginTop: "1rem" }} >
                    {/* <TextField required fullWidth label="Username" margin='normal' variant='outlined' /> */}
                    <TextField required fullWidth label="Password" type='password' margin='normal' variant='outlined' value={secretKey.value} onChange={secretKey.changeHandler} />
                    <Button color='primary' type='submit' fullWidth variant='contained' sx={{ marginTop: "1rem" }} >
                        Login
                    </Button>
                </form>
            </Paper>
        </Container>
    )
}

export default AdminLogin
