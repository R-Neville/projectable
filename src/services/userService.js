import projectableAPI from '../config/axiosConfig';

export const getUserDetails = () => {
  return projectableAPI.get('/api/user');
};

export const updateUserDetails = (userDetails) => {
  return projectableAPI.put('/api/user/update', userDetails);
};

export const deleteUserAccount = () => {
  return projectableAPI.delete('api/user/delete');
};