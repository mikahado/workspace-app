import React from "react";
import { NavLink } from "react-router-dom";
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import Box from '@mui/material/Box';
import Diversity2RoundedIcon from '@mui/icons-material/Diversity2Rounded';

function Navigation() {
  return (
    <div>
      <br />

      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', '& > *': { m: 1, }, }} >

        <ButtonGroup size="large" variant="contained" aria-label="contained button group">

          <Button>
            <NavLink
              to="/"
              end
            >
              {<Diversity2RoundedIcon />}
            </NavLink>
          </Button>

          <Button>
            <NavLink
              to="/workspaces"
              end
            >
              Workspaces 
            </NavLink>
          </Button>

        </ButtonGroup>  

        </Box>

    </div>
  );
}

export default Navigation