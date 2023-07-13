import React, { useContext, useState } from 'react';

import Login from './Login'
import Signup from './Signup'

import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Navigate, useNavigate } from 'react-router-dom'

import { UserContext } from "./context/user"

export default function AlertDialog() {
//   const [open, setOpen] = React.useState(false);

//   const handleClickOpen = () => {
//     setOpen(true);
//   };

const navigate = useNavigate()

const { handleAuthClick, open, setOpen, logoutUser } = useContext(UserContext)

const [flag, setFlag] = useState(true)
const [authChoice, setAuthChoice] = useState(true)

  const handleClose = () => {
    setOpen(false);
    navigate('/workspaces')
  };

  const handleCreateAccount = () => {
    setFlag(!flag);
    setAuthChoice(!authChoice)
  };

  return (
    <div>
        {/* <Button class="outline" onClick={logoutUser}>Logout</Button> */}
      {/* <Button variant="outlined" onClick={handleClickOpen}>
        Open alert dialog
      </Button> */}
      <Dialog
        open={open}
        fullWidth={true}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"WORKSPACES MEMBERS"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            { flag ? <Login /> : <Signup /> }
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCreateAccount} autoFocus>
            {authChoice ? "Create Free Account": "Already have an account? Login here." }
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}