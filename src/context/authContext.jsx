import React, { createContext, useState, useEffect } from 'react';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        const storedUser = sessionStorage.getItem('user');
        const storedToken = sessionStorage.getItem('token');
        const storedIsAuthenticated = sessionStorage.getItem('isAuthenticated');

        if (storedUser && storedToken && storedIsAuthenticated === true ) {
            setUser(JSON.parse(storedUser));
            setToken(storedToken);
            setIsAuthenticated(true);
        }
    }, []);

    const login = (userData, authToken, isAuthenticated) => {
        setUser(userData);
        setToken(authToken);
        setIsAuthenticated(true);
        sessionStorage.setItem('user', JSON.stringify(userData));
        sessionStorage.setItem('token', authToken);
        sessionStorage.setItem('isAuthenticated', isAuthenticated);
    };

    const signup = (userData, authToken, isAuthenticated) => {
        setUser(userData);
        setToken(authToken);
        setIsAuthenticated(true);
        sessionStorage.setItem('user', JSON.stringify(userData));
        sessionStorage.setItem('token', authToken);
        sessionStorage.setItem('isAuthenticated', isAuthenticated);
    };

    const logout = () => {
        setUser(null);
        setToken(null);
        setIsAuthenticated(false);
        sessionStorage.removeItem('user');
        sessionStorage.removeItem('token');
        sessionStorage.setItem('isAuthenticated', false);
    };

    return (
        <AuthContext.Provider value={{ user, token, isAuthenticated, login, logout, signup }}>
            {children}
        </AuthContext.Provider>
    );
};

export { AuthContext, AuthProvider };
