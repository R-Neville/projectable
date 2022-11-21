import MockAdapter from 'axios-mock-adapter';
import projectableAPI from '../config/axiosConfig';
import { ROOT_URL } from '../config/axiosConfig';
import { logUserIn, registerUser } from './authService';

const userSession = {
  uid: '1',
  token: 'token',
};

describe('logUserIn', () => {
  describe('when API call succeeds', () => {
    test('returns user session object', async () => {
      const mock = new MockAdapter(projectableAPI);
      mock
        .onPost(
          `${ROOT_URL}/users/login`,
          expect.objectContaining({
            email: 'test@test.com',
            password: 'PASSWORD',
          })
        )
        .reply(200, userSession);

      const response = await logUserIn('test@test.com', 'PASSWORD');

      expect(response.data).toEqual(userSession);
    });
  });

  describe('when API call fails due to a network error', () => {
    test('throws Network Error', async () => {
      const mock = new MockAdapter(projectableAPI);
      mock
        .onPost(
          `${ROOT_URL}/users/login`,
          expect.objectContaining({
            email: 'test@test.com',
            password: 'PASSWORD',
          })
        )
        .networkError();

      await expect(logUserIn('test@test.com', 'PASSWORD')).rejects.toThrow(
        'Network Error'
      );
    });
  });
});

describe('registerUser', () => {
  describe('when API call succeeds', () => {
    test('returns user session object', async () => {
      const mock = new MockAdapter(projectableAPI);
      mock
        .onPost(
          `${ROOT_URL}/users/register`,
          expect.objectContaining({
            username: 'test',
            email: 'test@test.com',
            password: 'PASSWORD',
            confirmPassword: 'PASSWORD',
          })
        )
        .reply(200, userSession);

      const response = await registerUser(
        'test',
        'test@test.com',
        'PASSWORD',
        'PASSWORD'
      );

      expect(response.data).toEqual(userSession);
    });
  });

  describe('when API call fails due to a network error', () => {
    test('throws Network Error', async () => {
      const mock = new MockAdapter(projectableAPI);
      mock
        .onPost(
          `${ROOT_URL}/users/register`,
          expect.objectContaining({
            username: 'test',
            email: 'test@test.com',
            password: 'PASSWORD',
            confirmPassword: 'PASSWORD',
          })
        )
        .networkError();

      await expect(
        registerUser('test', 'test@test.com', 'PASSWORD', 'PASSWORD')
      ).rejects.toThrow('Network Error');
    });
  });
});
