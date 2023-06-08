import loginAction from './loginAction';
import AuthAPI from '../../../API/AuthAPI/AuthAPI';

jest.mock<typeof import('../../../API/AuthAPI/AuthAPI')>('../../../API/AuthAPI/AuthAPI');

describe('loginAction tests', () => {
  it('should return a Response object with a redirect to the login page', async () => {
    jest.spyOn(AuthAPI, 'login').mockResolvedValueOnce({ token: 'token' });

    const args = {
      request: new Request('/'),
      params: { id: '3' },
    };

    const result = await loginAction(args) as Response;

    expect(result?.status).toBe(302);
    expect(result?.headers.get('location')).toBe('/');
  });

  it('should return an Error object if the user with is not found', async () => {
    const mockError = new Error('mock error');
    jest.spyOn(AuthAPI, 'login').mockResolvedValueOnce(mockError);

    const args = {
      request: new Request('/'),
      params: { id: '3' },
    };

    const result = await loginAction(args) as Error;

    expect(result.message).toBe(mockError.message);
  });
});
