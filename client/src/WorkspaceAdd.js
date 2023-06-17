import React, { useState } from 'react'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import PlacesAutocomplete from './PlacesAutocomplete';
import Button from '@mui/material/Button';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import MapMain2 from './MapMain2'
import { NavLink, useNavigate  } from "react-router-dom";

const WorkspaceAdd = ({onAddWorkspace}) => {

  const [data, setData] = useState({});
  const [ selected, setSelected ] = useState({});

    const navigate = useNavigate();
    // const [workspaceData, setWorkspaceData] = useState({
    //     title: "",
    //     lat: "",
    //     lng: "",
    // })

    // const handleChangeTitle = (e) => {
    //     setWorkspaceData({...workspaceData, [e.target.name]: e.target.value})
    // }

    // const handleChangeAddress = (e) => {
    //     setWorkspaceData({...workspaceData, [e.target.name]: e.target.value})
    // }

    const handleAddSubmit = (newWorkspace) => {

        fetch('/api/workspaces', {
            method: "POST",
            headers: {
            "Content-Type": "application/json",
            },
            body: JSON.stringify(newWorkspace),
        })
            .then((r) => r.json())
            .then((data) => {
              if (data.errors) {
                alert(data.errors + ". . . Try again!")
              }
              else {
              alert("Workspace Added!")
              navigate(`/workspaces/${data.id}`)
            }
        })
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
            <h2>Add a Workspace</h2>
 
    <MapMain2 addWorkspace={handleAddSubmit} data={data} selected={selected} />
    

      
<br /><br /><br /><br /><br />
    </div>
    </>
  )

}

export default WorkspaceAdd