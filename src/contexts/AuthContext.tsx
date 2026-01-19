import React, { createContext, useContext, useState, ReactNode } from 'react';

export type UserRole = 'super_admin' | 'admin' | 'employee';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
  territory?: string;
}

interface AuthContextType {
  user: User | null;
  login: (role: UserRole) => void;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const mockUsers: Record<UserRole, User> = {
  super_admin: {
    id: '1',
    name: 'James Anderson',
    email: 'james@fmcgsales.com',
    role: 'super_admin',
    avatar: 'JA',
  },
  admin: {
    id: '2',
    name: 'Sarah Mitchell',
    email: 'sarah@fmcgsales.com',
    role: 'admin',
    avatar: 'SM',
    territory: 'North Region',
  },
  employee: {
    id: '3',
    name: 'Michael Chen',
    email: 'michael@fmcgsales.com',
    role: 'employee',
    avatar: 'MC',
    territory: 'Downtown District',
  },
};

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  const login = (role: UserRole) => {
    setUser(mockUsers[role]);
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
