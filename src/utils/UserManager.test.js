import UserManager from './UserManager';

describe("UserManager can be used to set the user's token and username", () => {
  test('instantiation without errors and correct property defaults', () => {
    const um = new UserManager();
    expect(um.token).toBe('');
    expect(um.user).toBe('');
  });

  test('setters set properties correctly', () => {
    const um = new UserManager();
    um.token = 'test';
    expect(um.token).toBe('test');
    um.user = 'test';
    expect(um.user).toBe('test');
  });

  test('reset method sets properties to empty string', () => {
    const um = new UserManager();
    um.token = 'test';
    um.user = 'test';
    um.reset();
    expect(um.token).toBe('');
    expect(um.user).toBe('');
  });
});