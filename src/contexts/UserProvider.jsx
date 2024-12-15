import React, { createContext, useContext, useState, useEffect } from "react";

// Create the UserContext
const UserContext = createContext();

// Create the UserProvider component
const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Example: Check if a user is logged in, you could fetch user data from an API or local storage
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);
  // Function to logout the user
  const logoutUser = () => {
    setUser(null);
  };
  const loginUser = (user) => {};

  return (
    <UserContext.Provider
      value={{ user, logout: logoutUser, login: loginUser }}
    >
      {children}
    </UserContext.Provider>
  );
};

// Custom hook to use user context
const useUser = () => {
  return useContext(UserContext);
};

export { UserProvider, useUser };
