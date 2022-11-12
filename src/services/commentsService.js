import projectableAPI from '../config/axiosConfig';

export const getTaskComments = (taskId) => {
  return projectableAPI.get('/api/comments', { params: { taskId } });
};

export const deleteTaskComment = (commentId) => {
  return projectableAPI.delete(`/api/comments/${commentId}`);
};

export const createTaskComment = (taskId, content) => {
  return projectableAPI.post('/api/comments', { taskId, content });
};
