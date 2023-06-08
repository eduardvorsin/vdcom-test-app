import {
  getToken,
  isAuth,
  removeToken,
  setToken,
} from './authorization';

describe('isAuth tests', () => {
  afterEach(() => {
    global.localStorage.clear();
  });

  it('should return true if there is a token field in the local store', () => {
    global.localStorage.setItem('token', 'someToken');
    expect(isAuth()).toBeTruthy();
  });

  it('should return false if there is no token field in the local store', () => {
    expect(isAuth()).toBeFalsy();
  });
});

describe('getToken tests', () => {
  afterEach(() => {
    global.localStorage.clear();
  });

  it('should return someToken if there is a token field in the local store', () => {
    global.localStorage.setItem('token', 'someToken');
    expect(getToken()).toBe('someToken');
  });

  it('should return null if there is no token field in the local store', () => {
    expect(getToken()).toBeNull();
  });
});

describe('removeToken tests', () => {
  afterEach(() => {
    global.localStorage.clear();
  });

  it('should remove the token from the local store', () => {
    global.localStorage.setItem('token', 'someToken');
    removeToken();
    expect(global.localStorage.getItem('token')).toBeNull();
  });
});

describe('setToken tests', () => {
  afterEach(() => {
    global.localStorage.clear();
  });

  it('should set the token in the local store', () => {
    setToken('someToken');
    expect(global.localStorage.getItem('token')).toBe('someToken');
  });
});
