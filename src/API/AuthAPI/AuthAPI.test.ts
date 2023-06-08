import * as helpers from '../../utils/helpers/helpers';
import AuthAPI, { AuthTokenData } from './AuthAPI';

describe('AuthAPI tests', () => {
  it('should return the following error: "The user with the same name and password was not found, try again" if the user passed the wrong username and password', async () => {
    const result = await AuthAPI.login({
      password: '',
      username: '',
    }) as Error;

    expect(result instanceof Error).toBeTruthy();
    expect(result.message).toBe('The user with the same name and password was not found, try again');
  });

  it('should return a mock token', async () => {
    const expectedToken = 'aaaa1.bbbb2.cccc3';
    jest.spyOn(helpers, 'createToken').mockReturnValueOnce('aaaa1.bbbb2.cccc3');

    const result = await AuthAPI.login({
      password: 'root1',
      username: 'root1',
    }) as AuthTokenData;

    expect(result.token).toBe(expectedToken);
  });
});
