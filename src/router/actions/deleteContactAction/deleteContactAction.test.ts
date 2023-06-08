import deleteContactAction from './deleteContactAction';

describe('deleteContactAction tests', () => {
  it('should return a Response object with a redirect to the login page', async () => {
    const args = {
      request: new Request('/'),
      params: { clientId: '2' },
    };

    const result = await deleteContactAction(args);

    expect(result?.status).toBe(302);
    expect(result?.headers.get('location')).toBe('/contacts');
  });
});
