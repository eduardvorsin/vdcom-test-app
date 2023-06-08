import contacts from '../../../data/fakeData';
import fetchContacts from './fetchContacts';

describe('fetchContacts async thunk tests', () => {
  it(('should fetch contacts with a resolved response'), async () => {
    const dispatch = jest.fn();
    const getStateStub = () => null;

    const thunk = fetchContacts('aaaa1.bbbb2.cccc3');
    const result = await thunk(dispatch, getStateStub, undefined);
    const [start, end] = dispatch.mock.calls;

    expect(start[0].type).toBe(fetchContacts.pending.type);
    expect(end[0].type).toBe(fetchContacts.fulfilled.type);
    expect(result.payload).toEqual(contacts);
    expect(dispatch).toHaveBeenCalledTimes(2);
  });

  it(('should not fetch contacts with a rejected response'), async () => {
    const dispatch = jest.fn();
    const getStateStub = () => null;
    const expectedError = {
      message: 'Failed to upload contacts',
    };

    const thunk = fetchContacts('');
    const result = await thunk(dispatch, getStateStub, undefined);
    const [start, end] = dispatch.mock.calls;

    expect(start[0].type).toBe(fetchContacts.pending.type);
    expect(end[0].type).toBe(fetchContacts.rejected.type);
    expect(result.payload).toEqual(expectedError);
    expect(dispatch).toHaveBeenCalledTimes(2);
  });
});
