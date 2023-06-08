import { updateContact } from '../../slices/contactSlice/contactSlice';
import changeContact from './changeContact';

describe('changeContact async thunk tests', () => {
  it(('should add contact with a resolved response'), async () => {
    const dispatch = jest.fn();
    const getStateStub = () => null;

    const thunk = changeContact({
      token: 'aaaa1.bbbb2.cccc3',
      data: {
        clientId: 999999,
        clientName: 'Name # 119',
        'TRN/PPSN': 1011234,
        yearEnd: '2022-09-07',
        ARD: '2022-09-07',
        companyNumber: 554632627,
        email: 'email8931@gmail.com',
        phoneNumber: '74893570',
        companyAdress: '55 Name Street',
      },
    });
    const result = await thunk(dispatch, getStateStub, undefined);
    const [start, end] = dispatch.mock.calls;

    expect(start[0].type).toBe(changeContact.pending.type);
    expect(end[0].type).toBe(updateContact.type);
    expect(result.payload).toBeUndefined();
    expect(dispatch).toHaveBeenCalledTimes(3);
  });

  it(('should not add contact with a rejected response'), async () => {
    const dispatch = jest.fn();
    const getStateStub = () => null;
    const expectedError = {
      message: 'Could not change this contact',
    };

    const thunk = changeContact({
      token: '',
      data: {
        clientId: 999999,
        clientName: 'Name # 119',
        'TRN/PPSN': 1011234,
        yearEnd: '2022-09-07',
        ARD: '2022-09-07',
        companyNumber: 554632627,
        email: 'email8931@gmail.com',
        phoneNumber: '74893570',
        companyAdress: '55 Name Street',
      },
    });
    const result = await thunk(dispatch, getStateStub, undefined);
    const [start, end] = dispatch.mock.calls;

    expect(start[0].type).toBe(changeContact.pending.type);
    expect(end[0].type).toBe(changeContact.rejected.type);
    expect(result.payload).toEqual(expectedError);
    expect(dispatch).toHaveBeenCalledTimes(2);
  });
});
