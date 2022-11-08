import { createContext, useContext, useState } from 'react';
import UserManager from '../utils/UserManager';

const AuthContext = createContext();
export const useAuthContext = () => useContext(AuthContext);

function AuthProvider({ children }) {
  const userManager = new UserManager();
  const tokenPresent = !!userManager.token;
  const [loggedIn, setLoggedIn] = useState(tokenPresent); // TODO: Validate token first.

  const login = async (email, password) => {
    const error = await userManager.login(email, password);
    if (error) {
      return error;
    }
    return setLoggedIn(true);
  };

  const logout = () => {
    userManager.logout();
    setLoggedIn(false);
  };

  const register = async (username, email, password, confirmPassword) => {
    const error = await userManager.register(username, email, password, confirmPassword);
    if (error) {
      return error;
    }
    return setLoggedIn(true);
  };

  return (
    <AuthContext.Provider value={{ userManager, loggedIn, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;
