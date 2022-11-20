import projectableAPI from '../config/axiosConfig';

export const getAllProjects = async () => {
  return projectableAPI.get('/api/projects');
};

export const getProject = async (projectId) => {
  return projectableAPI.get(`/api/projects/${projectId}`);
};

export const createProject = async (formData) => {
  return projectableAPI.post('/api/projects', formData);
};

export const updateProject = async (projectId, formData) => {
  return projectableAPI.put(`/api/projects/${projectId}`, formData);
};

export const addMember = async (projectId, member) => {
  return projectableAPI.put(`/api/projects/${projectId}/members/new`, member);
};

export const removeMember = async (projectId, member) => {
  return projectableAPI.put(`/api/projects/${projectId}/members/remove`, member);
}

export const searchUsers = async (query, projectId) => {
  return projectableAPI.get(`/api/projects/${projectId}/settings/?email=${query}`);
};

export const deleteProject = async (projectId) => {
  return projectableAPI.delete(`/api/projects/${projectId}`);
};
