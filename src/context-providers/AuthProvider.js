import { createContext, useContext, useState } from 'react';
import UserManager from '../utils/UserManager';
import { logUserIn, registerUser } from '../services/authService';

const AuthContext = createContext();
export const useAuthContext = () => useContext(AuthContext);

function AuthProvider({ children }) {
  const userManager = new UserManager();
  const tokenPresent = !!userManager.token;
  const [loggedIn, setLoggedIn] = useState(tokenPresent);

  const login = async (email, password) => {
    return logUserIn(email, password)
      .then((response) => {
        const { data } = response;
        if (data && data.error) {
          return data.error;
        }
        userManager.user = response.data.uid;
        userManager.token = response.data.token;
        setLoggedIn(true);
        return null;
      })
      .catch((error) => {
        return error.message;
      });
  };

  const logout = () => {
    userManager.reset();
    setLoggedIn(false);
  };

  const register = async (username, email, password, confirmPassword) => {
    return registerUser(username, email, password, confirmPassword)
      .then((response) => {
        const { data } = response;
        if (data && data.error) {
          return data.error;
        }
        userManager.user = response.data.uid;
        userManager.token = response.data.token;
        setLoggedIn(true);
        return null;
      })
      .catch((error) => {
        return error.message;
      });
    
  };

  return (
    <AuthContext.Provider
      value={{ userManager, loggedIn, login, logout, register }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;
