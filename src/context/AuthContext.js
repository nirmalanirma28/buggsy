"use client";
import { useRouter } from "next/navigation";
import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setAuthenticated] = useState(true)
  const [token, setToken] = useState(null);
  const router = useRouter();

  const login = (token) => {
    setToken(token);
    localStorage.setItem("token", token);
    setAuthenticated(true)
  };

  const logout = () => {
    setToken(null);
    localStorage.removeItem("token");
    setAuthenticated(false);
    router.push("/Login");
  };

  return (
    <AuthContext.Provider value={{ token, login, logout, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};