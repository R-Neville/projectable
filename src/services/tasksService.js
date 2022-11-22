import projectableAPI from '../config/axiosConfig';

// Fetches all tasks for a given project:
export const getAllTasks = (projectId) => {
  return projectableAPI.get(`/api/projects/${projectId}/tasks`);
};

// Fetches all assigned tasks for a a given user:
export const getAllAssignedTasks = ()=>{
  return projectableAPI.get('/api/tasks')
}

// Fetches a task in a given project:
export const getTask = (projectId, taskId) => {
  return projectableAPI.get(`/api/projects/${projectId}/tasks/${taskId}`);
};

// Requests to create a task:
export const createTask = (projectId, taskFormData) => {
  return projectableAPI.post(`/api/projects/${projectId}/tasks`, taskFormData);
};

// Requests to update a task:
export const updateTask = (projectId, taskId, taskFormData) => {
  return projectableAPI.put(
    `/api/projects/${projectId}/tasks/${taskId}`,
    taskFormData
  );
};

// Requests to delete a task:
export const deleteTask = (projectId, taskId) => {
  return projectableAPI.delete(`/api/projects/${projectId}/tasks/${taskId}`);
};
