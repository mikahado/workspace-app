import React, { useState } from 'react'

import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import { NavLink } from "react-router-dom";

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
    <>
    <div>
        <br/>
            <NavLink
              to="/workspaces"
              end
            >
               <Button>
              {<KeyboardBackspaceIcon />}
              </Button>
            </NavLink>
    <h3><em>Add a Workspace</em></h3>
    <p>Look it up or drop a pin (because no, not everything exists on Google Maps!)</p>

        <Box onSubmit={handleAddSubmit} component="form" sx={{ '& > :not(style)': { m: 1, width: '25ch' },}} noValidate autoComplete="off" >
            <br />


            {/* <TextField name="title" onChange={handleChangeTitle} value={workspaceData.title} id="standard-basic" label="Name" variant="standard" />
            
            <TextField name="address" onChange={handleChangeAddress} value={workspaceData.address} id="standard-basic" label="Address" variant="standard" />
            <br /> */}

            {/* <TextField
            id="outlined-multiline-static"
            label="Description"
            multiline
            rows={4}
            defaultValue="Default Value"
            />
            <br/> */}

            <Button type="submit" variant="outlined">Submit</Button>

        </Box>
<br /><br /><br /><br /><br />
    </div>
    </>
  )

}

export default WorkspaceAdd