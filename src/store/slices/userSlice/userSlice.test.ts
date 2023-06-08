import userReducer, { loginUser, logoutUser } from './userSlice';

describe('userSlice reducer tests', () => {
  it('should return an object with the username, password, token fields filled with data during the LoginUser action', () => {
    const expectedData = {
      username: 'Jay Bates',
      password: 'wordpass',
      token: 'aaaa1.bbbb2.cccc3',
    };

    const result = userReducer(undefined, loginUser(expectedData));

    expect(result).toEqual(expectedData);
  });

  it('should return an object with the username and password fields equal to null and token equal to an empty string in the logoutUser action', () => {
    const initialState = {
      username: 'Jay Bates',
      password: 'wordpass',
      token: 'aaaa1.bbbb2.cccc3',
    };

    const expectedData = {
      username: null,
      password: null,
      token: '',
    };

    const result = userReducer(initialState, logoutUser());

    expect(result).toEqual(expectedData);
  });

  it('should return the same state with an unknown action', () => {
    const initialState = {
      username: 'Jay Bates',
      password: 'wordpass',
      token: 'aaaa1.bbbb2.cccc3',
    };

    const result = userReducer(initialState, { type: 'unknown' });

    expect(result).toEqual(initialState);
  });
});
