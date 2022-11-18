import projectableAPI from '../config/axiosConfig';

export const logUserIn = async (email, password) => {
  return projectableAPI.post('/users/login', { email, password });
};

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
