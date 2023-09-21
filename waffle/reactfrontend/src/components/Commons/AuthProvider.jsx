import React, { createContext, useContext } from 'react';

const AuthContext = createContext();

const useAuth = () => {
    return useContext(AuthContext);
}

const AuthProvider = ({ children }) => {
    const isLoggedIn = !!localStorage.getItem('token');
    return <AuthContext.Provider value={isLoggedIn}>{children}</AuthContext.Provider>;
}

export default AuthProvider;
export { useAuth }