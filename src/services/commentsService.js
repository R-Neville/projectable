import projectableAPI from '../config/axiosConfig';

// Fetches all comments for a task:
export const getTaskComments = (projectId, taskId) => {
  return projectableAPI.get(`/api/projects/${projectId}/tasks/${taskId}/comments`);
};

// Performs a delete request for comment:
export const deleteTaskComment = (projectId, taskId, commentId) => {
  return projectableAPI.delete(`/api/projects/${projectId}/tasks/${taskId}/comments/${commentId}`);
};

// Requests the creation of a comment:
export const createTaskComment = (projectId, taskId, content) => {
  return projectableAPI.post(`/api/projects/${projectId}/tasks/${taskId}/comments`, { content });
};

// Requests to update a comment:
export const updateTaskComment = (projectId, taskId, commentId, content) => {
  return projectableAPI.put(`/api/projects/${projectId}/tasks/${taskId}/comments/${commentId}`, { content });
}
