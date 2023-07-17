import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const UserContext = React.createContext();

const UserProvider = ({ children }) => {
  const [user, setUser] = useState({});

  const [allUsers, setAllUsers] = useState([]);
  const [loggedIn, setLoggedIn] = useState(false);
  const [errors, setErrors] = useState([]);
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  console.log(allUsers)

  useEffect(() => {
    fetch("/api/me")
      .then((resp) => resp.json())
      .then((data) => {
        if (data.errors) {
          setLoggedIn(false);
        } else {
          setLoggedIn(true);
          setUser(data);
          setErrors([]);
        }
      });
    getAllUsers();
  }, [loggedIn]);

  const getAllUsers = () => {
    fetch("/api/ws_users")
      .then((resp) => resp.json())
      .then((data) => {
        console.log(data)
        if (data.errors) {
          const errorLis = data.errors.map((e) => <li>{e}</li>);
          setErrors(errorLis);
        } else {
          setAllUsers(data);
        }
      });
  };

  

  const handleRemoveUser = (id) => {
    const updatedUsers = allUsers.filter((p) => p.id !== id);
    setAllUsers((u) => updatedUsers);
  };

  const logoutUser = () => {
    fetch("/api/logout", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    }).then(() => {
      logout();
      navigate("/");
    });
  };

  const login = (user) => {
    setUser(user);
    setLoggedIn(true);
  };

  const logout = () => {
    setUser({});
    setErrors([]);
    setLoggedIn(false);
  };

  const signup = (user) => {
    setUser(user);
    setLoggedIn(true);
  };


  const handleAuthClick = () => {
    if (!loggedIn){
      setOpen(true);
    } else {
      navigate("/workspaces")
      setOpen(false);
    }
  };

  return (
    <UserContext.Provider
      value={{
        user,
        allUsers,
        logout,
        signup,
        login,
        loggedIn,
        handleRemoveUser,
        logoutUser,
        errors,
        handleAuthClick,
        open,
        setOpen
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export { UserContext, UserProvider };
