import React, { createContext, useContext } from "react";

const AuthContext = createContext();

const useAuth = () => {
  return useContext(AuthContext);
};

const AuthProvider = ({ children }) => {
<<<<<<< HEAD
    const isLoggedIn = !!localStorage.getItem('access_token');
    return <AuthContext.Provider value={isLoggedIn}>{children}</AuthContext.Provider>;
}
=======
  const isLoggedIn = !!localStorage.getItem("access_token");
  return (
    <AuthContext.Provider value={isLoggedIn}>{children}</AuthContext.Provider>
  );
};
>>>>>>> a2b3860e23890131a568a5404efd586e6694db8f

export default AuthProvider;
export { useAuth };
