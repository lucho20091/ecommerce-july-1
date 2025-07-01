import { createContext, useState, useEffect, useCallback } from "react";
import getUser from "../helpers/getUser";

export const AuthContext = createContext({
  user: null,
  isAuthenticated: false,
  loading: true,
  refreshAuth: () => {},
});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  const fetchUser = async () => {
    try {
      const user = await getUser();
      console.log(user);
      setUser(user);
      setIsAuthenticated(!!user);
    } catch (error) {
      setUser(null);
      setIsAuthenticated(false);
    } finally {
      setLoading(false);
    }
  };

  const refreshAuth = useCallback(() => {
    setLoading(true);
    fetchUser();
  }, []);

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <AuthContext.Provider
      value={{ user, isAuthenticated, loading, refreshAuth }}
    >
      {children}
    </AuthContext.Provider>
  );
};
