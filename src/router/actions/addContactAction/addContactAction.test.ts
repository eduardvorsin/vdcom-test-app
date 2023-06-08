import addContactAction from './addContactAction';

describe('addContactAction tests', () => {
  it('should return a Response object with a redirect to the login page', async () => {
    const args = {
      request: new Request('/'),
      params: { id: '1' },
    };

    const result = await addContactAction(args);

    expect(result?.status).toBe(302);
    expect(result?.headers.get('location')).toBe('/contacts');
  });
});
