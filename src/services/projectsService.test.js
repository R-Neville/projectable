import MockAdapter from 'axios-mock-adapter';
import projectableAPI from '../config/axiosConfig';
import { ROOT_URL } from '../config/axiosConfig';
import {
  getAllProjects,
  getProject,
  createProject,
  updateProject,
  addMember,
  removeMember,
  searchUsers,
  deleteProject,
} from './projectsService';

const allProjects = [
  { _id: '1', name: 'Project 1', description: 'This is project 1' },
  { _id: '2', name: 'Project 2', description: 'This is project 2' },
  { _id: '3', name: 'Project 3', description: 'This is project 3' },
  { _id: '4', name: 'Project 4', description: 'This is project 4' },
  { _id: '5', name: 'Project 5', description: 'This is project 5' },
];

const oneProject = {
  _id: '1',
  name: 'Project 1',
  description: 'This is project 1',
};

describe('getAllProjects', () => {
  describe('when API call succeeds', () => {
    test('returns project list', async () => {
      const mock = new MockAdapter(projectableAPI);
      mock.onGet(`${ROOT_URL}/api/projects`).reply(200, allProjects);

      const response = await getAllProjects();

      expect(response.data).toEqual(allProjects);
    });
  });

  describe('when API call fails due to network error', () => {
    test('throws Network Error', async () => {
      const mock = new MockAdapter(projectableAPI);
      mock.onGet(`${ROOT_URL}/api/projects`).networkError();

      await expect(getAllProjects()).rejects.toThrow('Network Error');
    });
  });
});

describe('getProject', () => {
  describe('when API call succeeds', () => {
    test('returns the correct project', async () => {
      const mock = new MockAdapter(projectableAPI);
      mock.onGet(`${ROOT_URL}/api/projects/1`).reply(200, oneProject);

      const response = await getProject(1);

      expect(response.data).toEqual(oneProject);
    });
  });

  describe('when API call fails due to a network error', () => {
    test('throws Network Error', async () => {
      const mock = new MockAdapter(projectableAPI);
      mock.onGet(`${ROOT_URL}/api/projects/1`).networkError();

      await expect(getProject(1)).rejects.toThrow('Network Error');
    });
  });
});

describe('createProject', () => {
  describe('when API call succeeds', () => {
    test('returns the new project', async () => {
      const mock = new MockAdapter(projectableAPI);
      mock
        .onPost(
          `${ROOT_URL}/api/projects`,
          expect.objectContaining({
            name: expect.stringMatching('Project 1'),
            description: expect.stringMatching('This is project 1'),
          })
        )
        .reply(201, oneProject);

      const response = await createProject({
        name: 'Project 1',
        description: 'This is project 1',
      });

      expect(response.data).toEqual(oneProject);
    });
  });

  describe('when API call fails due to a network error', () => {
    test('throws Network Error', async () => {
      const mock = new MockAdapter(projectableAPI);
      mock
        .onPost(
          `${ROOT_URL}/api/projects`,
          expect.objectContaining({
            name: expect.stringMatching('Project 1'),
            description: expect.stringMatching('This is project 1'),
          })
        )
        .networkError();

      await expect(
        createProject({ name: 'Project 1', description: 'This is project 1' })
      ).rejects.toThrow('Network Error');
    });
  });
});

describe('updateProject', () => {
  describe('when API call succeeds', () => {
    test('returns updated project', async () => {
      const mock = new MockAdapter(projectableAPI);
      mock
        .onPut(
          `${ROOT_URL}/api/projects/1`,
          expect.objectContaining({
            name: expect.stringContaining('New Name'),
            description: expect.stringContaining('New Description'),
          })
        )
        .reply(200, {
          _id: '1',
          name: 'New Name',
          description: 'New Description',
        });

      const response = await updateProject('1', {
        name: 'New Name',
        description: 'New Description',
      });

      expect(response.data).toEqual({
        _id: '1',
        name: 'New Name',
        description: 'New Description',
      });
    });
  });

  describe('when API call fails due to network error', () => {
    test('throws Network Error', async () => {
      const mock = new MockAdapter(projectableAPI);
      mock
        .onPut(
          `${ROOT_URL}/api/projects/1`,
          expect.objectContaining({
            name: expect.stringContaining('New Name'),
            description: expect.stringContaining('New Description'),
          })
        )
        .networkError();

      await expect(
        updateProject('1', { name: 'New Name', description: 'New Description' })
      ).rejects.toThrow('Network Error');
    });
  });
});

describe('addMember', () => {
  describe('when API call succeeds', () => {
    test('returns an updated project', async () => {
      const mock = new MockAdapter(projectableAPI);
      mock
        .onPut(
          `${ROOT_URL}/api/projects/1/members/new`,
          expect.objectContaining({
            uid: expect.stringContaining('1'),
            displayName: expect.stringContaining('test'),
            email: expect.stringContaining('test@test.com'),
          })
        )
        .reply(200, {
          _id: '1',
          name: 'Project 1',
          description: 'This is project 1',
        });

      const response = await addMember('1', {
        uid: '1',
        displayName: 'test',
        email: 'test@test.com',
      });

      expect(response.data).toEqual(oneProject);
    });
  });

  describe('when API call fails due to a network error', () => {
    test('throws Network Error', async () => {
      const mock = new MockAdapter(projectableAPI);
      mock
        .onPut(
          `${ROOT_URL}/api/projects/1/members/new`,
          expect.objectContaining({
            uid: expect.stringContaining('1'),
            displayName: expect.stringContaining('test'),
            email: expect.stringContaining('test@test.com'),
          })
        )
        .networkError();

      await expect(
        addMember('1', {
          uid: '1',
          displayName: 'test',
          email: 'test@test.com',
        })
      ).rejects.toThrow('Network Error');
    });
  });
});

describe('removeMember', () => {
  describe('when API call succeeds', () => {
    test('returns an updated project', async () => {
      const mock = new MockAdapter(projectableAPI);
      mock
        .onPut(
          `${ROOT_URL}/api/projects/1/members/remove`,
          expect.objectContaining({
            uid: expect.stringContaining('1'),
            displayName: expect.stringContaining('test'),
            email: expect.stringContaining('test@test.com'),
          })
        )
        .reply(200, {
          _id: '1',
          name: 'Project 1',
          description: 'This is project 1',
        });

      const response = await removeMember('1', {
        uid: '1',
        displayName: 'test',
        email: 'test@test.com',
      });

      expect(response.data).toEqual(oneProject);
    });
  });

  describe('when API call fails due to a network error', () => {
    test('throws Network Error', async () => {
      const mock = new MockAdapter(projectableAPI);
      mock
        .onPut(
          `${ROOT_URL}/api/projects/1/members/remove`,
          expect.objectContaining({
            uid: expect.stringContaining('1'),
            displayName: expect.stringContaining('test'),
            email: expect.stringContaining('test@test.com'),
          })
        )
        .networkError();

      await expect(
        removeMember('1', {
          uid: '1',
          displayName: 'test',
          email: 'test@test.com',
        })
      ).rejects.toThrow('Network Error');
    });
  });
});

describe('searchUsers', () => {
  describe('when API call succeeds', () => {
    test('returns user', async () => {
      const mock = new MockAdapter(projectableAPI);
      mock
        .onGet(`${ROOT_URL}/api/projects/1/settings/?email=test@test.com`)
        .reply(200, { uid: '1', displayName: 'test', email: 'test@test.com' });

      const response = await searchUsers('test@test.com', '1');

      expect(response.data).toEqual({
        uid: '1',
        displayName: 'test',
        email: 'test@test.com',
      });
    });
  });

  describe('when API call fails due to a network error', () => {
    test('throws Network Error', async () => {
      const mock = new MockAdapter(projectableAPI);
      mock
        .onGet(`${ROOT_URL}/api/projects/1/settings/?email=test@test.com`)
        .networkError();
      await expect(searchUsers('test@test.com', '1')).rejects.toThrow(
        'Network Error'
      );
    });
  });
});

describe('deleteProject', () => {
  describe('when API call scceeds', () => {
    test('returns deleted project', async () => {
      const mock = new MockAdapter(projectableAPI);
      mock.onDelete(`${ROOT_URL}/api/projects/1`).reply(200, oneProject);
      const response = await deleteProject('1');
      expect(response.data).toEqual(oneProject);
    });
  });

  describe('when API call fails due to a network error', () => {
    test('throws Network Error', async () => {
      const mock = new MockAdapter(projectableAPI);
      mock.onDelete(`${ROOT_URL}/api/projects/1`).networkError();
      await expect(deleteProject('1')).rejects.toThrow('Network Error');
    });
  });
});
