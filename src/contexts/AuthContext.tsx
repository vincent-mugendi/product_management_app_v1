
import React, { createContext, useContext, useState, useEffect } from 'react';
import { toast } from '@/components/ui/use-toast';

type User = {
  id: string;
  name: string;
  email: string;
  avatar?: string;
};

type AuthContextType = {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  signup: (name: string, email: string, password: string) => Promise<boolean>;
  logout: () => void;
  loginWithTestAccount: () => Promise<boolean>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const TEST_ACCOUNT = {
  email: 'test@example.com',
  password: 'password123',
  name: 'Test User',
};

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  // Check for existing user in localStorage on component mount
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
      setIsAuthenticated(true);
    }
  }, []);

  // Get users from localStorage or initialize
  const getUsers = () => {
    const storedUsers = localStorage.getItem('users');
    return storedUsers ? JSON.parse(storedUsers) : [
      // Add test account to initial users
      {
        id: '0',
        name: TEST_ACCOUNT.name,
        email: TEST_ACCOUNT.email,
        password: TEST_ACCOUNT.password,
      }
    ];
  };

  // Save users to localStorage
  const saveUsers = (users: any[]) => {
    localStorage.setItem('users', JSON.stringify(users));
  };

  // Login with existing account
  const login = async (email: string, password: string): Promise<boolean> => {
    const users = getUsers();
    const foundUser = users.find(u => u.email === email && u.password === password);
    
    if (foundUser) {
      const loggedInUser = {
        id: foundUser.id,
        name: foundUser.name,
        email: foundUser.email,
        avatar: foundUser.avatar || '',
      };
      
      localStorage.setItem('user', JSON.stringify(loggedInUser));
      setUser(loggedInUser);
      setIsAuthenticated(true);
      return true;
    }
    
    return false;
  };

  // Sign up new account
  const signup = async (name: string, email: string, password: string): Promise<boolean> => {
    const users = getUsers();
    
    // Check if email is already taken
    if (users.some(u => u.email === email)) {
      return false;
    }
    
    const newUser = {
      id: Math.random().toString(36).substr(2, 9),
      name,
      email,
      password,
      avatar: '',
    };
    
    // Save new user
    users.push(newUser);
    saveUsers(users);
    
    // Log in new user
    const loggedInUser = {
      id: newUser.id,
      name: newUser.name,
      email: newUser.email,
      avatar: newUser.avatar,
    };
    
    localStorage.setItem('user', JSON.stringify(loggedInUser));
    setUser(loggedInUser);
    setIsAuthenticated(true);
    
    return true;
  };

  const loginWithTestAccount = async (): Promise<boolean> => {
    return login(TEST_ACCOUNT.email, TEST_ACCOUNT.password);
  };

  const logout = () => {
    localStorage.removeItem('user');
    setUser(null);
    setIsAuthenticated(false);
    toast({
      title: "Logged out",
      description: "You have been successfully logged out.",
    });
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      isAuthenticated, 
      login, 
      signup, 
      logout,
      loginWithTestAccount 
    }}>
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
