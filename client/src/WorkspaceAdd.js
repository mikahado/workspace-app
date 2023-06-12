import React, { useState } from 'react'

import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

const WorkspaceAdd = ({onAddWorkspace}) => {

    const [workspaceData, setWorkspaceData] = useState({
        title: "",
        address: ""
    })

    const handleChangeTitle = (e) => {
        setWorkspaceData({...workspaceData, [e.target.name]: e.target.value})
    }

    const handleChangeAddress = (e) => {
        setWorkspaceData({...workspaceData, [e.target.name]: e.target.value})
    }

    const handleAddSubmit = (e) => {
        e.preventDefault()

        const newWorkspace = {
            title: workspaceData.title,
            address: workspaceData.address
        }

        fetch('/api/workspaces', {
            method: "POST",
            headers: {
            "Content-Type": "application/json",
            },
            body: JSON.stringify(newWorkspace),
        })
            .then((r) => r.json())
            .then((newData) => {
            onAddWorkspace(newData);
            });
    }

  return (
    <div>

        <Box onSubmit={handleAddSubmit} component="form" sx={{ '& > :not(style)': { m: 1, width: '25ch' },}} noValidate autoComplete="off" >
            <br />

            <TextField name="title" onChange={handleChangeTitle} value={workspaceData.title} id="standard-basic" label="Name" variant="standard" />
            
            <TextField name="address" onChange={handleChangeAddress} value={workspaceData.address} id="standard-basic" label="Address" variant="standard" />
            <br />

            <Button type="submit" variant="text">Submit</Button>

        </Box>

    </div>
  )

}

export default WorkspaceAdd