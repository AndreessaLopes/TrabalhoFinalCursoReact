/* eslint-disable react-refresh/only-export-components */
import { createContext, useState, useContext } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  // ← inicializa já lendo do localStorage
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem("user");
    return saved ? JSON.parse(saved) : null;
  });

  const login = (email) => {
    const userData = { email };
    localStorage.setItem("user", JSON.stringify(userData)); // ← salva
    setUser(userData);
  };

  const logout = () => {
    localStorage.removeItem("user"); // ← limpa
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);