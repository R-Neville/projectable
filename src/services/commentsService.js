import projectableAPI from '../config/axiosConfig';

export const getTaskComments = (projectId, taskId) => {
  return projectableAPI.get(`/api/projects/${projectId}/tasks/${taskId}/comments`);
};

export const deleteTaskComment = (projectId, taskId, commentId) => {
  return projectableAPI.delete(`/api/projects/${projectId}/tasks/${taskId}/comments/${commentId}`);
};

export const createTaskComment = (projectId, taskId, content) => {
  return projectableAPI.post(`/api/projects/${projectId}/tasks/${taskId}/comments`, { content });
};
