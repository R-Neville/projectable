import MockAdapter from 'axios-mock-adapter';
import projectableAPI from '../config/axiosConfig';
import { ROOT_URL } from '../config/axiosConfig';

import {
  getUserDetails,
  updateUserDetails,
  deleteUserAccount,
} from './userService';

const userDetails = { uid: '1', displayName: 'test', email: 'test@test.com' };
const updatedUserDetails = {
  uid: '1',
  displayName: 'new username',
  email: 'new email',
};

describe('getUserDetails', () => {
  describe('when API call succeeds', () => {
    test('returns the requested user', async () => {
      const mock = new MockAdapter(projectableAPI);
      mock.onGet(`${ROOT_URL}/api/user`).reply(200, userDetails);

      const response = await getUserDetails();

      expect(response.data).toEqual(userDetails);
    });
  });

  describe('when API call fails due to a network error', () => {
    test('throws Network Error', async () => {
      const mock = new MockAdapter(projectableAPI);
      mock.onGet(`${ROOT_URL}/api/user`).networkError();

      await expect(getUserDetails()).rejects.toThrow('Network Error');
    });
  });
});

describe('updateUserDetails', () => {
  describe('when API call succeeds', () => {
    test('returns updated user', async () => {
      const mock = new MockAdapter(projectableAPI);
      mock
        .onPut(
          `${ROOT_URL}/api/user/update`,
          expect.objectContaining({
            username: 'new username',
            email: 'new email',
            password: 'new_password',
            confirmPassword: 'new_password',
          })
        )
        .reply(200, updatedUserDetails);

      const response = await updateUserDetails({
        username: 'new username',
        email: 'new email',
        password: 'new_password',
        confirmPassword: 'new_password',
      });

      expect(response.data).toEqual(updatedUserDetails);
    });
  });

  describe('when API call fails due to a network error', () => {
    test('throws Network Error', async () => {
      const mock = new MockAdapter(projectableAPI);
      mock
        .onPut(
          `${ROOT_URL}/api/user/update`,
          expect.objectContaining({
            username: 'new username',
            email: 'new email',
            password: 'new_password',
            confirmPassword: 'new_password',
          })
        )
        .networkError();

      await expect(
        updateUserDetails({
          username: 'new username',
          email: 'new email',
          password: 'new_password',
          confirmPassword: 'new_password',
        })
      ).rejects.toThrow('Network Error');
    });
  });
});

describe('deleteUserAccount', () => {
  describe('when API call succeeds', () => {
    test('deleted user is returned', async () => {
      const mock = new MockAdapter(projectableAPI);
      mock.onDelete(`${ROOT_URL}/api/user/delete`).reply(200, userDetails);

      const response = await deleteUserAccount();

      expect(response.data).toEqual(userDetails);
    });
  });

  describe('when API call fails due to a network error', () => {
    test('throws Network Error', async () => {
      const mock = new MockAdapter(projectableAPI);
      mock.onDelete(`${ROOT_URL}/api/user/delete`).networkError();

      await expect(deleteUserAccount()).rejects.toThrow('Network Error');
    });
  });
});
