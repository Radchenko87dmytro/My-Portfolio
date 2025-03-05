import { User } from "firebase/auth";
import React, { createContext, useState, ReactNode, useContext } from "react";

interface AuthContextType {
  authUser: User | null;
  userId: string | null;
  setAuthUser: (user: User | null) => void;
  setUserId: (id: string | null) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [authUser, setAuthUser] = useState<User | null>(null);
  const [userId, setUserId] = useState<string | null>(null);

  return (
    <AuthContext.Provider value={{ authUser, userId, setAuthUser, setUserId }}>
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
