import { removeContact } from '../../slices/contactSlice/contactSlice';
import deleteContact from './deleteContact';

describe('deleteContact async thunk tests', () => {
  it(('should delete contact with a resolved response'), async () => {
    const dispatch = jest.fn();
    const getStateStub = () => null;

    const thunk = deleteContact({
      token: 'aaaa1.bbbb2.cccc3',
      id: 123456,
    });
    const result = await thunk(dispatch, getStateStub, undefined);
    const [start, end] = dispatch.mock.calls;

    expect(start[0].type).toBe(deleteContact.pending.type);
    expect(end[0].type).toBe(removeContact.type);
    expect(result.payload).toBeUndefined();
    expect(dispatch).toHaveBeenCalledTimes(3);
  });

  it(('should not delete contact with a rejected response'), async () => {
    const dispatch = jest.fn();
    const getStateStub = () => null;
    const expectedError = {
      message: 'Could not delete this contact',
    };

    const thunk = deleteContact({
      token: '',
      id: 123456,
    });
    const result = await thunk(dispatch, getStateStub, undefined);
    const [start, end] = dispatch.mock.calls;

    expect(start[0].type).toBe(deleteContact.pending.type);
    expect(end[0].type).toBe(deleteContact.rejected.type);
    expect(result.payload).toEqual(expectedError);
    expect(dispatch).toHaveBeenCalledTimes(2);
  });
});
