import changeContactAction from './changeContactAction';

describe('changeContactAction tests', () => {
  it('should return a Response object with a redirect to the login page', async () => {
    const args = {
      request: new Request('/'),
      params: { clientId: '1' },
    };

    const result = await changeContactAction(args);

    expect(result?.status).toBe(302);
    expect(result?.headers.get('location')).toBe('/contacts');
  });
});
