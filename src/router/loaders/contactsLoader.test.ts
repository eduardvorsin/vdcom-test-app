
import contactsLoader from './contactsLoader';

describe('contactsLoader tests', () => {
  it('should return a Response object with a redirect to the login page if the user is not logged in', async () => {
    const result = await contactsLoader();

    expect(result?.status).toBe(302);
    expect(result?.headers.get('location')).toBe('/login');
  });

  it('should return null if the user is logged in', async () => {
    jest.spyOn(Storage.prototype, 'getItem').mockReturnValueOnce('aaaa1.bbbb2.cccc3');

    const result = await contactsLoader();
    expect(result).toBeNull();
  });
});
