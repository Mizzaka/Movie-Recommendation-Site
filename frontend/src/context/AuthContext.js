import React, { createContext, useState, useEffect, Children } from 'react';
import axios from 'axios';

const AuthContext = createContext();

const AuthProvider = ({ Children }) => {
    const [user, setUser] = useState(null);

   const login = async (email, passowrd) => {
    const response = await axios.post('/api/users/login', { email, passowrd });
    setUser(response.data); 
    localStorage.setItem('user', JSON.stringify(response.data));
   };

   const register = async (username, email, password) => {
    const response = await axios.post('/api/users/register', { username, email, passowrd });
    setUser(response.data);
    localStorage.setItem('user', JSON.stringify(response.data));
   };

   const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
   };

    return (
        <AuthContext.Provider value={{ user, login, register, logout}}>
            {Children}
        </AuthContext.Provider>
    );
};

export { AuthContext, AuthProvider };