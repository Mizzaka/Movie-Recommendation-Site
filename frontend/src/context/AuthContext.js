import axios from 'axios';
import React, { createContext, useState, useEffect } from 'react';

axios.defaults.baseURL = 'http://localhost:4000';

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      axios
        .get('/api/users/profile', {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((response) => {
          setUser(response.data);
        })
        .catch((error) => {
          console.error('Failed to fetch user profile:', error);
        });
    }
  }, []);

  const login = async (email, password) => {
    try {
      const response = await axios.post('/api/users/login', { email, password });
      localStorage.setItem('token', response.data.token);
      setUser(response.data);
    } catch (error) {
      console.error('Login failed:', error);
      throw error;
    }
  };

  const register = async (username, email, password) => {
    try {
      const response = await axios.post('/api/users/register', { username, email, password });
      localStorage.setItem('token', response.data.token);
      setUser(response.data);
    } catch (error) {
      console.error('Registration failed:', error);
      throw error;
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  
  return (
    <AuthContext.Provider value={{ user, login, register, logout, }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
