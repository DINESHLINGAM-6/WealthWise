import React, { createContext, useState, useContext } from 'react';

// 1. Create context
const UserContext = createContext();

// 2. Provider component
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null); // null by default

  const saveUser = (userData) => {
    setUser(userData);
  };

  const clearUser = () => {
    setUser(null);
  };

  return (
    <UserContext.Provider value={{ user, saveUser, clearUser }}>
      {children}
    </UserContext.Provider>
  );
};

// 3. Custom hook for easy access
export const useUser = () => useContext(UserContext);
