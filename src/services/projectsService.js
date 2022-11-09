import projectableAPI from '../config/axiosConfig';

export const getAllProjects = async () => {
  try {
    const response = await projectableAPI.get('/api/projects');
    return response.data;
  } catch (error) {
    return { error: error.message };
  }
};

export const getProject = async (projectId) => {
  const data = await projectableAPI.get(`/api/projects/${projectId}`);
  return data;
};

export const createProject = async (formData) => {
  const data = await projectableAPI.post('/api/projects', formData);
  return data;
};

export const updateProject = async (projectId, formData) => {
  const data = await projectableAPI.put(`/api/projects/${projectId}`, formData);
  return data;
};

export const addMember = async (projectId, member) => {
  const data = await projectableAPI.put(
    `/api/projects/${projectId}/members/new`,
    member
  );
  return data;
};

export const searchForUsers = async (query) => {
  const data = await projectableAPI.get(
    `/api/projects/members/search/email?=${query}`
  );
  return data;
};

export const deleteProject = async (projectId) => {
  const data = await projectableAPI.delete(`/api/projects/${projectId}`);
  return data;
};
