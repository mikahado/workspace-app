import React, { useContext, useState } from 'react';

import { UserContext } from "./context/user"
import Button from '@mui/material/Button';
import { NavLink } from "react-router-dom";

const Profile = () => {

    const { loggedIn, logoutUser, user } = useContext(UserContext)

  return (
    <div>
            <h2>Hi {user?.username}</h2>
            <p>What would you like to do today?</p>

            <br/>
            <NavLink to="/workspaces" end>
               <Button variant="contained">Favorites</Button>
            </NavLink>
            <br/><br/>
            <NavLink to="/workspaces/add" end>
               <Button variant="contained">Add Workspace</Button>
            </NavLink>
            <br/><br/>
            <NavLink to="/workspaces" end>
               <Button variant="contained">My Reviews </Button>
            </NavLink>
            <br/><br/>
            <NavLink to="/workspaces" end>
               <Button variant="contained">Browse</Button>
            </NavLink>
            
            <br/><br/>

         <Button variant="text" onClick={logoutUser}>Logout</Button>
    </div>
  )
}

export default Profile