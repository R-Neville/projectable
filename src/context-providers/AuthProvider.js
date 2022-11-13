import { createContext, useContext, useState } from 'react';
import UserManager from '../utils/UserManager';
import projectableAPI from '../config/axiosConfig';

const AuthContext = createContext();
export const useAuthContext = () => useContext(AuthContext);

function AuthProvider({ children }) {
  const userManager = new UserManager();
  const tokenPresent = !!userManager.token;
  const [loggedIn, setLoggedIn] = useState(tokenPresent);

  const login = async (email, password) => {
    try {
      const response = await projectableAPI.post('/users/login', {
        email,
        password,
      });
      const { error } = response.data;
      if (error) return error;
      userManager.user = response.data.uid;
      userManager.token = response.data.token;
      setLoggedIn(true);
      return null;
    } catch (error) {
      return error.message;
    }
  };

  const logout = () => {
    userManager.reset();
    setLoggedIn(false);
  };

  const register = async (username, email, password, confirmPassword) => {
    try {
      const response = await projectableAPI.post('/users/register', {
        username,
        email,
        password,
        confirmPassword,
      });
      const { error } = response.data;
      if (error) return error;
      userManager.user = response.data.uid;
      userManager.token = response.data.token;
      setLoggedIn(true);
      return null;
    } catch (error) {
      return error.message;
    }
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
