import React from 'react'
import { Container, Paper, Typography } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid'
import { mateBlack } from '../constants/color'


const Table = ({ rows, columns, heading, rowHeight = 52 }) => {
    return (
        <Container sx={{ height: "100vh" }}>
            <Paper elevation={3} sx={{ padding: "1rem 3rem", borderRadius: "1rem", margin: "auto", width: "100%", overflow: "hidden", height: "100%", boxShadow: "none" }} >
                <Typography textAlign={"center"} variant='h4' sx={{ margin: "2rem", textTransform: "uppercase" }} >
                    {heading}
                </Typography>
                <DataGrid rows={rows} columns={columns} rowHeight={rowHeight} style={{ height: "80%" }} sx={{
                    border: "none",  width : "100%", ".table-header": {
                        bgcolor: mateBlack, color: "white"
                    }
                }}  >
                </DataGrid>
            </Paper>
        </Container>
    )
}

export default Table
