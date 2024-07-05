"use client";
import { useEffect, useState, createContext, useContext } from "react";
import { useRouter } from "next/navigation";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setAuthenticated] = useState(false);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setToken(storedToken);
      setAuthenticated(true);
    }
    setLoading(false);
  }, []);

  const login = (token) => {
    setToken(token);
    localStorage.setItem("token", token);
    setAuthenticated(true);
  };

  const logout = () => {
    setToken(null);
    localStorage.removeItem("token");
    setAuthenticated(false);
    router.push("/Login");
  };

  return (
    <AuthContext.Provider value={{ token, login, logout, isAuthenticated, loading }}>
      {children}
    </AuthContext.Provider>
  );
};