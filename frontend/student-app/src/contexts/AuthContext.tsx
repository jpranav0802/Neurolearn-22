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

  // Prefer same-origin serverless functions in production
  const sameOriginApi = (typeof window !== 'undefined' && window.location.hostname !== 'localhost')
    ? `${window.location.origin}/api/auth`
    : '';
  const API_URL = process.env.REACT_APP_AUTH_API_URL || sameOriginApi || 'http://localhost:4010/api/auth';
  const isApiConfiguredForProd = Boolean(process.env.REACT_APP_AUTH_API_URL) && !/localhost|127\.0\.0\.1/i.test(String(process.env.REACT_APP_AUTH_API_URL));

  const login = async (email: string, password: string) => {
    try {
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
      return;
    } catch (error) {
      // Fallback: if no public API is configured, perform local demo auth
      if (!isApiConfiguredForProd) {
        const demoUser: User = {
          id: 'demo-user',
          email: email.toLowerCase(),
          firstName: 'Demo',
          lastName: 'User',
          role: 'student',
          isEmailVerified: true,
        };
        localStorage.setItem('authToken', 'demo-token');
        localStorage.setItem('userData', JSON.stringify(demoUser));
        setUser(demoUser);
        return;
      }
      throw error;
    }
  };

  const register = async (userData: RegisterData) => {
    try {
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
      await login(userData.email, userData.password);
      return;
    } catch (error) {
      if (!isApiConfiguredForProd) {
        // Client-only demo registration simply proceeds to login
        await login(userData.email, userData.password);
        return;
      }
      throw error;
    }
  };

  const logout = async () => {
    try {
      if (isApiConfiguredForProd) {
        await fetch(`${API_URL}/logout`, { method: 'POST', credentials: 'include' });
      }
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
