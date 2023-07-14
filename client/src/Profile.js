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
               <Button className="profile-buttons" variant="contained">Find Workspace</Button>
            </NavLink>
            <br/><br/>
            <NavLink to="/workspaces" end>
               <Button className="profile-buttons" variant="contained">My Favorites</Button>
            </NavLink>
            <br/><br/>
            <NavLink to="/workspaces/add" end>
               <Button className="profile-buttons" variant="contained">Add Workspace</Button>
            </NavLink>
            <br/><br/>
            <NavLink to="/workspaces" end>
               <Button className="profile-buttons" variant="contained">My Reviews </Button>
            </NavLink>
            <br/><br/>
            
            
            <br/><br/>

         <Button variant="text" onClick={logoutUser}>Logout</Button>
    </div>
  )
}

export default Profile