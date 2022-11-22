import { createContext, useContext, useState } from 'react';
import UserManager from '../utils/UserManager';
import { logUserIn, registerUser } from '../services/authService';

const AuthContext = createContext();
export const useAuthContext = () => useContext(AuthContext);

function AuthProvider({ children }) {
  // Instantiate UserManager to check if
  // a token is present. Also used to 
  // make authorisation checks in components:
  const userManager = new UserManager();
  const tokenPresent = !!userManager.token;
  const [loggedIn, setLoggedIn] = useState(tokenPresent);

  const login = async (email, password) => {
    // Returns null if successful or an error
    // message:
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
    // Returns null if successful or an error
    // message:
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
