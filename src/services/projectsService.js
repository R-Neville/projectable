import projectableAPI from '../config/axiosConfig';

// Fetches all projects for a given user -
// those they have created and those
// the are a member of:
export const getAllProjects = async () => {
  return projectableAPI.get('/api/projects');
};

// Fetches a given project:
export const getProject = async (projectId) => {
  return projectableAPI.get(`/api/projects/${projectId}`);
};

// Requests to create a project:
export const createProject = async (formData) => {
  return projectableAPI.post('/api/projects', formData);
};

// Requests to update a project:
export const updateProject = async (projectId, formData) => {
  return projectableAPI.put(`/api/projects/${projectId}`, formData);
};

// Requests to add a member to a project:
export const addMember = async (projectId, member) => {
  return projectableAPI.put(`/api/projects/${projectId}/members/new`, member);
};

// Requests to remove a member from a project:
export const removeMember = async (projectId, member) => {
  return projectableAPI.put(`/api/projects/${projectId}/members/remove`, member);
}

// Performs a search query for a user by their
// email address:
export const searchUsers = async (query, projectId) => {
  return projectableAPI.get(`/api/projects/${projectId}/settings/?email=${query}`);
};

// Requests to delete a project:
export const deleteProject = async (projectId) => {
  return projectableAPI.delete(`/api/projects/${projectId}`);
};
