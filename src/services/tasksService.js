import projectableAPI from '../config/axiosConfig';

export const getAllTasks = (projectId) => {
  return projectableAPI.get(`api/projects/${projectId}/tasks`);
};

export const getTask = (projectId, taskId) => {
  return projectableAPI.get(`api/projects/${projectId}/tasks/${taskId}`);
};

export const createTask = (projectId, taskFormData) => {
  return projectableAPI.post(`api/projects/${projectId}/tasks`, taskFormData);
};

export const updateTask = (projectId, taskId, taskFormData) => {
  return projectableAPI.put(
    `/api/projects/${projectId}/tasks/${taskId}`,
    taskFormData
  );
};

export const deleteTask = (projectId, taskId) => {
  return projectableAPI.delete(`/api/projects/${projectId}/tasks/${taskId}`);
};
