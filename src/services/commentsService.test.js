import MockAdapter from 'axios-mock-adapter';
import projectableAPI from '../config/axiosConfig';
import { ROOT_URL } from '../config/axiosConfig';
import {
  getTaskComments,
  createTaskComment,
  updateTaskComment,
  deleteTaskComment,
} from './commentsService';

const allComments = [
  { _id: '1', content: 'Comment 1', username: 'test' },
  { _id: '2', content: 'Comment 2', username: 'test' },
  { _id: '3', content: 'Comment 3', username: 'test' },
  { _id: '4', content: 'Comment 4', username: 'test' },
  { _id: '5', content: 'Comment 5', username: 'test' },
];

const oneComment = { _id: '1', content: 'Comment 1', username: 'test' };

const updatedComment = {
  _id: '1',
  content: 'Updated Content',
  username: 'test',
};

describe('getTaskComments', () => {
  describe('when API call succeeds', () => {
    test('returns all comments', async () => {
      const mock = new MockAdapter(projectableAPI);
      mock
        .onGet(`${ROOT_URL}/api/projects/1/tasks/1/comments`)
        .reply(200, allComments);

      const response = await getTaskComments(1, 1);

      expect(response.data).toEqual(allComments);
    });
  });

  describe('when API call fails', () => {
    test('throws Network Error', async () => {
      const mock = new MockAdapter(projectableAPI);
      mock.onGet(`${ROOT_URL}/api/projects/1/tasks/1/comments`).networkError();

      await expect(getTaskComments(1, 1)).rejects.toThrow('Network Error');
    });
  });
});

describe('createTaskComment', () => {
  describe('when API call succeeds', () => {
    test('returns one task', async () => {
      const mock = new MockAdapter(projectableAPI);
      mock
        .onPost(
          `${ROOT_URL}/api/projects/1/tasks/1/comments`,
          expect.objectContaining({ content: 'Comment 1' })
        )
        .reply(201, oneComment);

      const response = await createTaskComment(1, 1, 'Comment 1');

      expect(response.data).toEqual(oneComment);
    });
  });

  describe('when API call fails', () => {
    test('throws Network Error', async () => {
      const mock = new MockAdapter(projectableAPI);
      mock
        .onPost(
          `${ROOT_URL}/api/projects/1/tasks/1/comments`,
          expect.objectContaining({ content: 'Comment 1' })
        )
        .networkError();

      await expect(createTaskComment(1, 1, 'Comment 1')).rejects.toThrow(
        'Network Error'
      );
    });
  });
});

describe('updateTaskComment', () => {
  describe('when API call succeeds', () => {
    test('returns a comment object', async () => {
      const mock = new MockAdapter(projectableAPI);
      mock
        .onPut(
          `${ROOT_URL}/api/projects/1/tasks/1/comments/1`,
          expect.objectContaining({
            content: 'Updated content',
          })
        )
        .reply(200, updatedComment);

      const response = await updateTaskComment(1, 1, 1, 'Updated content');

      expect(response.data).toEqual(updatedComment);
    });
  });

  describe('when API call fails', () => {
    test('throws Network Error', async () => {
      const mock = new MockAdapter(projectableAPI);
      mock
        .onPut(
          `${ROOT_URL}/api/projects/1/tasks/1/comments/1`,
          expect.objectContaining({
            content: 'Updated content',
          })
        )
        .networkError();

      await expect(
        updateTaskComment(1, 1, 1, 'Updated content')
      ).rejects.toThrow('Network Error');
    });
  });
});

describe('deleteTaskComment', () => {
  describe('when API call succeeds', () => {
    test('returns deleted comment', async () => {
      const mock = new MockAdapter(projectableAPI);
      mock
        .onDelete(`${ROOT_URL}/api/projects/1/tasks/1/comments/1`)
        .reply(200, oneComment);

      const response = await deleteTaskComment(1, 1, 1);

      expect(response.data).toEqual(oneComment);
    });
  });

  describe('when API call fails', () => {
    test('throws Network Error', async () => {
      const mock = new MockAdapter(projectableAPI);
      mock
        .onDelete(`${ROOT_URL}/api/projects/1/tasks/1/comments/1`)
        .networkError();

      await expect(deleteTaskComment(1, 1, 1)).rejects.toThrow('Network Error');
    });
  });
});
