import MockAdapter from 'axios-mock-adapter';
import projectableAPI from '../config/axiosConfig';
import { ROOT_URL } from '../config/axiosConfig';
import {
  getAllTasks,
  getAllAssignedTasks,
  getTask,
  createTask,
  updateTask,
  deleteTask,
} from './tasksService';

const allTasks = [
  { _id: '1', brief: 'Task 1', description: 'This is task 1' },
  { _id: '2', brief: 'Task 2', description: 'This is task 2' },
  { _id: '3', brief: 'Task 3', description: 'This is task 3' },
  { _id: '4', brief: 'Task 4', description: 'This is task 4' },
  { _id: '5', brief: 'Task 5', description: 'This is task 5' },
];

const oneTask = { _id: '1', brief: 'Task 1', description: 'This is task 1' };

describe('getAllTasks', () => {
  describe('when API call succeeds', () => {
    test('returns all tasks', async () => {
      const mock = new MockAdapter(projectableAPI);
      mock.onGet(`${ROOT_URL}/api/projects/1/tasks`).reply(200, allTasks);

      const response = await getAllTasks(1);

      expect(response.data).toEqual(allTasks);
    });
  });

  describe('when API call fails due to a network error', () => {
    test('throws Network Error', async () => {
      const mock = new MockAdapter(projectableAPI);
      mock.onGet(`${ROOT_URL}/api/projects/1/tasks`).networkError();

      await expect(getAllTasks(1)).rejects.toThrow('Network Error');
    });
  });
});

describe('getAllAssignedTasks', () => {
  describe('when API call succeeds', () => {
    test('returns all assigned tasks', async () => {
      const mock = new MockAdapter(projectableAPI);
      mock.onGet(`${ROOT_URL}/api/tasks`).reply(200, allTasks);

      const response = await getAllAssignedTasks();

      expect(response.data).toEqual(allTasks);
    });
  });

  describe('when API call fails due to a network error', () => {
    test('throws Network Error', async () => {
      const mock = new MockAdapter(projectableAPI);
      mock.onGet(`${ROOT_URL}/api/tasks`).networkError();

      await expect(getAllAssignedTasks()).rejects.toThrow('Network Error');
    });
  });
});

describe('getTask', () => {
  describe('when API call succeeds', () => {
    test('returns a task', async () => {
      const mock = new MockAdapter(projectableAPI);
      mock.onGet(`${ROOT_URL}/api/projects/1/tasks/1`).reply(200, oneTask);

      const response = await getTask(1, 1);

      expect(response.data).toEqual(oneTask);
    });
  });

  describe('when API call fails due to a network error', () => {
    test('throws Network Error', async () => {
      const mock = new MockAdapter(projectableAPI);
      mock.onGet(`${ROOT_URL}/api/projects/1/tasks/1`).networkError();

      await expect(getTask(1, 1)).rejects.toThrow('Network Error');
    });
  });
});

describe('createTask', () => {
  describe('when API call succeeds', () => {
    test('returns a task', async () => {
      const mock = new MockAdapter(projectableAPI);
      mock
        .onPost(
          `/api/projects/1/tasks`,
          expect.objectContaining({
            brief: 'Task 1',
            description: 'This is task 1',
          })
        )
        .reply(201, oneTask);

      const response = await createTask(1, {
        brief: 'Task 1',
        description: 'This is task 1',
      });

      expect(response.data).toEqual(oneTask);
    });
  });

  describe('when API call fails due to a network error', () => {
    test('throws Network Error', async () => {
      const mock = new MockAdapter(projectableAPI);
      mock
        .onPost(
          `/api/projects/1/tasks`,
          expect.objectContaining({
            brief: 'Task 1',
            description: 'This is task 1',
          })
        )
        .networkError();

      await expect(
        createTask(1, {
          brief: 'Task 1',
          description: 'This is task 1',
        })
      ).rejects.toThrow('Network Error');
    });
  });
});

describe('updateTask', () => {
  describe('when API call succeeds', () => {
    test('returns the updated task', async () => {
      const mock = new MockAdapter(projectableAPI);
      mock
        .onPut(
          `/api/projects/1/tasks/1`,
          expect.objectContaining({
            brief: 'New Brief',
            description: 'New Description',
          })
        )
        .reply(200, {
          _id: '1',
          brief: 'New Brief',
          description: 'New Description',
        });

      const response = await updateTask(1, 1, {
        brief: 'New Brief',
        description: 'New Description',
      });

      expect(response.data).toEqual({
        _id: '1',
        brief: 'New Brief',
        description: 'New Description',
      });
    });
  });

  describe('when API call fails due to a network error', () => {
    test('throws Network Error', async () => {
      const mock = new MockAdapter(projectableAPI);
      mock
        .onPut(
          `/api/projects/1/tasks/1`,
          expect.objectContaining({
            brief: 'New Brief',
            description: 'New Description',
          })
        )
        .networkError();

      await expect(
        updateTask(1, 1, {
          brief: 'New Brief',
          description: 'New Description',
        })
      ).rejects.toThrow('Network Error');
    });
  });
});

describe('deleteTask', () => {
  describe('when API call succeeds', () => {
    test('returns deleted task', async () => {
      const mock = new MockAdapter(projectableAPI);
      mock.onDelete(`${ROOT_URL}/api/projects/1/tasks/1`).reply(200, oneTask);

      const response = await deleteTask(1, 1);

      expect(response.data).toEqual(oneTask);
    });
  });

  describe('when API call fails due to a network error', () => {
    test('throws Network Error', async () => {
      const mock = new MockAdapter(projectableAPI);
      mock.onDelete(`${ROOT_URL}/api/projects/1/tasks/1`).networkError();

      await expect(deleteTask(1, 1)).rejects.toThrow('Network Error');
    });
  });
});
