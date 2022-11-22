import projectableAPI from '../config/axiosConfig';

// Fetches the logged in user's details:
export const getUserDetails = () => {
  return projectableAPI.get('/api/user');
};

// Requests to update the logged in user's details:
export const updateUserDetails = (userDetails) => {
  return projectableAPI.put('/api/user/update', userDetails);
};

// Requests to delete the logged in user's account:
export const deleteUserAccount = () => {
  return projectableAPI.delete('api/user/delete');
};
