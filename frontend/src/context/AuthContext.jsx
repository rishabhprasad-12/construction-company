import { createContext, useContext, useEffect, useState } from "react";

import { loginUser, registerUser, getProfile } from "../services/authService";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const register = async (userData) => {
    return await registerUser(userData);
  };

  const login = async (credentials) => {
    const response = await loginUser(credentials);

    const token = response.token || response.data?.token;

    const loggedInUser = response.user || response.data?.user;

    if (token) {
      localStorage.setItem("token", token);
    }

    setUser(loggedInUser);

    return response;
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  const loadUser = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      setLoading(false);
      return;
    }

    try {
      const response = await getProfile();

      const loggedInUser = response.user || response.data?.user;

      setUser(loggedInUser);
    } catch (error) {
      localStorage.removeItem("token");
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadUser();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        register,
        login,
        logout,
        isAuthenticated: !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider");
  }

  return context;
};
