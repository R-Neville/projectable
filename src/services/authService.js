import projectableAPI from '../config/axiosConfig';

// Used to logs the user in:
export const logUserIn = async (email, password) => {
  return projectableAPI.post('/users/login', { email, password });
};

// Registers the user:
export const registerUser = async (
  username,
  email,
  password,
  confirmPassword
) => {
  return projectableAPI.post('/users/register', {
    username,
    email,
    password,
    confirmPassword,
  });
};
