import React, { createContext, useContext, useState, useEffect } from 'react';

interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: 'student' | 'parent' | 'teacher' | 'therapist' | 'admin';
  isEmailVerified: boolean;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (userData: RegisterData) => Promise<void>;
  logout: () => void;
  checkAuth: () => Promise<void>;
}

interface RegisterData {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  role: 'student' | 'parent' | 'teacher' | 'therapist';
}

const AuthContext = createContext<AuthContextType | null>(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === null || context === undefined) {
    console.error('useAuth must be used within an AuthProvider');
    // Return a default context to prevent crashes
    return {
      user: null,
      isLoading: false,
      isAuthenticated: false,
      login: async () => { },
      register: async () => { },
      logout: () => { },
      checkAuth: async () => { }
    };
  }
  return context;
};

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const isAuthenticated = !!user;

  // Check if user is already authenticated on app start
  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const userDataJson = localStorage.getItem('userData');
      if (userDataJson) {
        const userData = JSON.parse(userDataJson);
        setUser(userData);
      }
    } catch (error) {
      console.error('Auth check failed:', error);
      localStorage.removeItem('userData');
      localStorage.removeItem('authToken');
    } finally {
      setIsLoading(false);
    }
  };

  const API_URL = process.env.REACT_APP_AUTH_API_URL || 'http://localhost:4001/api/auth';

  const login = async (email: string, password: string) => {
    const res = await fetch(`${API_URL}/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({ email, password })
    });
    const data = await res.json();
    if (!res.ok) {
      throw new Error(data?.message || 'Login failed');
    }
    localStorage.setItem('authToken', data.accessToken);
    localStorage.setItem('userData', JSON.stringify(data.user));
    setUser(data.user);
  };

  const register = async (userData: RegisterData) => {
    const res = await fetch(`${API_URL}/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({ ...userData })
    });
    const data = await res.json();
    if (!res.ok) {
      throw new Error(data?.message || 'Registration failed');
    }
    // After successful server-side registration, immediately log in
    await login(userData.email, userData.password);
  };

  const logout = async () => {
    try {
      await fetch(`${API_URL}/logout`, { method: 'POST', credentials: 'include' });
    } catch {}
    localStorage.removeItem('authToken');
    localStorage.removeItem('userData');
    setUser(null);
  };

  const value: AuthContextType = {
    user,
    isLoading,
    isAuthenticated,
    login,
    register,
    logout,
    checkAuth,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
