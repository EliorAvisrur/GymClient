import React, { createContext, useContext, useState, useEffect } from "react";
import { GET_USERINFO_URL, LOGOUT_URL } from "../constants/endPoint";
import { useNavigate } from "react-router-dom";
import { fetchData } from "../utils/fetchData";
// Create the UserContext
const UserContext = createContext();

// Create the UserProvider component
const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  // Function to logout the user
  const logoutUser = async () => {
    const { data: result, error } = await fetchData(LOGOUT_URL, "POST");
    if (result) {
      setUser(null);
    } else {
      console.log("Logout failed:", error);
    }
  };
  const loginUser = async () => {
    const { data: result, error } = await fetchData(GET_USERINFO_URL, "GET");
    if (result) {
      setUser(result);
    } else {
      console.log("Login failed:", result);
    }
  };
  useEffect(() => {
    loginUser();
  }, []);
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
