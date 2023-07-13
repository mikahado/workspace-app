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
        if (data.errors) {
          const errorLis = data.errors.map((e) => <li>{e}</li>);
          setErrors(errorLis);
        } else {
          setAllUsers(data);
        }
      });
  };

  const createMyProfile = (profile) => {
    // fetch(`/profiles`, {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify(profile),
    // })
    //   .then((resp) => resp.json())
    //   .then((data) => {
    //     if (data.errors) {
    //       const errorsLis = data.errors.map((e) => <li>{e}</li>);
    //       setErrors(errorsLis);
    //     } else {
    //       setUser(data);
    //       navigate("/onboard/preference");
    //       setErrors([]);
    //     }
    //   });
  };

  const updateMyProfile = (updatedData) => {
    // fetch(`/profiles/${user.id}`, {
    //   method: "PATCH",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify(updatedData),
    // })
    //   .then((resp) => resp.json())
    //   .then((data) => {
    //     if (data.errors) {
    //       const errorsLis = data.errors.map((e) => <li>{e}</li>);
    //       setErrors(errorsLis);
    //     } else {
    //       setUser(data);
    //       setErrors([]);
    //       navigate("/my-profile");
    //     }
    //   });
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
      console.log("not logged in")
    } else {
      navigate("/workspaces")
      setOpen(false);
    }
  };

  return (
    <UserContext.Provider
      value={{
        user,
        updateMyProfile,
        allUsers,
        createMyProfile,
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
