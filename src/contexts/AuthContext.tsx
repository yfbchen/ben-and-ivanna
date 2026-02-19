import { useState, createContext, useContext, ReactNode } from "react";

interface AuthContextType {
  isAuthenticated: boolean;
  login: (password: string) => boolean;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

// Get password from environment variable
// In Vite, environment variables must be prefixed with VITE_ to be exposed to the client
const WEDDING_PASSWORD = import.meta.env.VITE_WEDDING_PASSWORD;

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return sessionStorage.getItem("wedding_auth") === "true";
  });

  const login = (password: string): boolean => {
    if (!WEDDING_PASSWORD) {
      return false;
    }
    if (password === WEDDING_PASSWORD) {
      setIsAuthenticated(true);
      sessionStorage.setItem("wedding_auth", "true");
      return true;
    }
    return false;
  };

  const logout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem("wedding_auth");
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
