import { createContext, useContext, useState } from 'react';
import UserManager from '../utils/UserManager';

const AuthContext = createContext();
export const useAuthContext = () => useContext(AuthContext);

function AuthProvider({ children }) {
  const userManager = new UserManager();
  const tokenPresent = userManager.token !== null;
  const [loggedIn, setLoggedIn] = useState(tokenPresent);

  const login = async () => {
    await userManager.login();
    setLoggedIn(userManager.user !== null);
  };

  const logout = async () => {
    await userManager.logout();
    setLoggedIn(userManager.user !== null);
  };

  return (
    <AuthContext.Provider value={{ userManager, loggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;
