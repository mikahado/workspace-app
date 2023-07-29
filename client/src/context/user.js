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

  const onDeleteReview = (id, updatedReview) => {
    fetch(`/api/reviews/${id}`, {
      method: "DELETE",
    })
      .then((resp) => {
        if (resp.ok) {
          alert("Review deleted");

          setUser((prevUser) => ({
            ...prevUser,
            reviews: prevUser.reviews.filter((review) => review.id !== id),
          }));
        }
      })
      .catch((error) => {
        console.log("Error deleting review:", error);
      });
  };
  
  const updateMyReview = (updatedReview) => {
    const id = updatedReview.id;
    
    fetch(`/api/reviews/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedReview),
    })
      .then((resp) => resp.json())
      .then((data) => {
        if (data.errors) {
          // Handle errors if necessary
          console.log("Error updating review:", data.errors);
        } else {
          setUser((prevUser) => {
            const updatedReviews = prevUser.reviews.map((review) => {
              if (review.id === id) {
                return {
                  ...review,
                  ...data, // Merge the updated review data from the server response
                };
              }
              return review;
            });
            return {
              ...prevUser,
              reviews: updatedReviews,
            };
          });
        }
      })
      .catch((error) => {
        console.log("Error updating review:", error);
      });
  };
  
  const addWorkspaceToFavorites = (workspace_id) => {
    const updatedUser = {
      favorites: [...user.favorites, workspace_id] // Add the new workspace_id to the existing favorites array
    };
  
    // Use Rails' update method to send the PATCH request
    fetch(`/api/ws_users/${user.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedUser),
    })
      .then((resp) => {
        if (resp.ok) {
          // Update the state to reflect the new favorites array directly
          setUser((prevUser) => ({
            ...prevUser,
            favorites: [...prevUser.favorites, workspace_id],
          }));
          console.log(user)
          alert("Workspace added to favorites successfully!");
        } else {
          // Handle errors if necessary
          alert("Failed to add workspace to favorites.");
        }
      })
      .catch((error) => {
        console.log("Error updating user:", error);
        alert("An error occurred while updating user.");
      });
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
        onDeleteReview,
        logoutUser,
        errors,
        handleAuthClick,
        open,
        setOpen,
        updateMyReview,
        addWorkspaceToFavorites
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export { UserContext, UserProvider };
