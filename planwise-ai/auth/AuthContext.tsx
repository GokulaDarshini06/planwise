import React, { createContext, useState, useEffect, ReactNode } from 'react';
import * as authService from './authService';

interface AuthContextType {
  user: authService.User | null;
  login: (credentials: authService.Credentials) => Promise<void>;
  signup: (credentials: authService.Credentials) => Promise<void>;
  logout: () => void;
  updateProfilePicture: (picture: string) => Promise<void>;
  changePassword: (passwords: { currentPassword: string; newPassword: string; }) => Promise<void>;
  loading: boolean;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<authService.User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const currentUser = authService.getCurrentUser();
    if (currentUser) {
      setUser(currentUser);
    }
    setLoading(false);
  }, []);

  const login = async (credentials: authService.Credentials) => {
    const loggedInUser = await authService.login(credentials);
    setUser(loggedInUser);
  };

  const signup = async (credentials: authService.Credentials) => {
    const newUser = await authService.signup(credentials);
    setUser(newUser);
  };

  const logout = () => {
    authService.logout();
    setUser(null);
  };

  const updateProfilePicture = async (picture: string) => {
    if (!user) throw new Error("No user is logged in to update.");
    const updatedUser = await authService.updateUserProfilePicture(user.email, picture);
    setUser(updatedUser);
  }

  const changePassword = async (passwords: { currentPassword: string; newPassword: string; }) => {
    if (!user) throw new Error("No user is logged in.");
    await authService.changePassword(user.email, passwords.currentPassword, passwords.newPassword);
  }

  const value = { user, login, signup, logout, updateProfilePicture, changePassword, loading };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};