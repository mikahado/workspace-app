import React, { useContext, useState } from 'react';
import { UserContext } from "./context/user"
import Button from '@mui/material/Button';
import SearchIcon from '@mui/icons-material/Search';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import AddIcon from '@mui/icons-material/Add';
import ReviewsIcon from '@mui/icons-material/Reviews';
import { NavLink } from "react-router-dom";

const Profile = () => {
  const { loggedIn, logoutUser, user } = useContext(UserContext)

  return (
    <div>
      <h2>Hi {user?.username}</h2>
      <p>What would you like to do today?</p>

      <br />

      <NavLink to="/workspaces" end>
        <Button className="profile-buttons" variant="contained" startIcon={<SearchIcon />}>
          Find Workspace
        </Button>
      </NavLink>
      <br /><br />
      <NavLink to="/favorites" end>
        <Button className="profile-buttons" variant="contained" startIcon={<BookmarkIcon />}>
          View Favorites
        </Button>
      </NavLink>
      <br /><br />
      <NavLink to="/workspaces/add" end>
        <Button className="profile-buttons" variant="contained" startIcon={<AddIcon />}>
          Add Workspace
        </Button>
      </NavLink>
      <br /><br />
      <NavLink to="/myreviews" end>
        <Button className="profile-buttons" variant="contained" startIcon={<ReviewsIcon />}>
          View My Reviews
        </Button>
      </NavLink>
      <br /><br />

      <Button variant="text" onClick={logoutUser}>Logout</Button>
    </div>
  )
}

export default Profile;
