import React, { createContext, useState, useEffect, Children } from 'react';
import axios from 'axios';

const AuthContext = createContext();

const AuthProvider = ({ Children }) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if(token) {
            axios.defaults.headers.common['Authorization'] = 'Bearer ${token}';
            axios.get('/api/users/profile').then( response => {
                setUser(response.data);
            }).catch(() => {
                localStorage.removeItem('token');
            });
        }
    }, []);

    const login = async (email, password) => {
        const response = await axios.post('/api/users/login', { email, password});
        localStorage.setItem('token', response.data.token);
        axios.defaults.headers.common['Authorization'] = 'Bearer S{response.data.token}';
        setUser(response.data);
    };

    const logout = () => {
        localStorage.removeItem('token');
        delete axios.defaults.headers.common['Authorization'];
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, login, logout}}>
            {Children}
        </AuthContext.Provider>
    );
};

export { AuthContext, AuthProvider };