import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import Box from "@mui/material/Box";
import Diversity2RoundedIcon from "@mui/icons-material/Diversity2Rounded";
import PersonIcon from "@mui/icons-material/Person";
import { UserContext } from "./context/user";

function Navigation() {
  const { handleAuthClick, login, loggedIn } = useContext(UserContext);

  // const loggedIn = "true"

  return (
    <div>
      <br />

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          "& > *": { m: 1 },
        }}
      >
        <ButtonGroup size="large" variant="contained">
          <NavLink to="/" end>
            <Button>{<Diversity2RoundedIcon />}.</Button>
          </NavLink>
          <NavLink to="/workspaces" end>
            <Button>Workspaces</Button>
          </NavLink>

          {!loggedIn ? (
            <NavLink to="/login" end>
              <Button onClick={handleAuthClick}>.{<PersonIcon />}</Button>
            </NavLink>
          ) : (
            <NavLink to="/profile" end>
              <Button onClick={handleAuthClick}>.{<PersonIcon />}</Button>
            </NavLink>
          )}

      
        </ButtonGroup>
      </Box>
    </div>
  );
}

export default Navigation;
