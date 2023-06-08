import contacts from '../../../data/fakeData';
import deleteContact from '../../thunks/deleteContact/deleteContact';
import fetchContacts from '../../thunks/fetchContacts/fetchContacts';
import contactReducer, { removeContact, createContact, updateContact } from './contactSlice';

describe('contactsSlice reducer tests', () => {
  it('should remove the contact object from the data array when calling the removeContact action', () => {
    const mockState = {
      status: 'resolved',
      error: null,
      data: contacts,
    } as const;

    const expectedData = contacts.filter((contact) => contact.yearEnd !== '2022-06-23');

    const result = contactReducer(mockState, removeContact({ id: 123456 }));

    expect(result.data).toEqual(expectedData);
  });

  it('should add a contact object in the data array when calling the addContact action', () => {
    const mockState = {
      status: 'resolved',
      error: null,
      data: contacts,
    } as const;

    const newContact = {
      clientId: 999999,
      clientName: 'Name # 9',
      'TRN/PPSN': 12345,
      yearEnd: '2022-09-17',
      ARD: '2022-09-17',
      companyNumber: 1122334455,
      email: 'email9023@gmail.com',
      phoneNumber: '76855432',
      companyAdress: '33 Name Street',
    };

    const expectedData = [...contacts];
    expectedData.push(newContact);

    const result = contactReducer(mockState, createContact(newContact));

    expect(result.data).toEqual(expectedData);
  });

  it('should update the contact object with the passed id when calling the updateContact action', () => {
    const mockState = {
      status: 'resolved',
      error: null,
      data: contacts,
    } as const;

    const updatedContact = {
      clientId: 583930,
      clientName: 'Name # 119',
      'TRN/PPSN': 1011234,
      yearEnd: '2022-09-07',
      ARD: '2022-09-07',
      companyNumber: 554632627,
      email: 'email8931@gmail.com',
      phoneNumber: '74893570',
      companyAdress: '55 Name Street',
    };

    const updateIndex = contacts.findIndex((contact) => contact.clientId === 583930);
    const expectedData = [...contacts];
    expectedData[updateIndex] = updatedContact;

    const result = contactReducer(mockState, updateContact(updatedContact));

    expect(result.data).toEqual(expectedData);
  });

  it('should return the same state with an unknown action', () => {
    const initialState = {
      status: 'loading',
      error: null,
      data: contacts,
    } as const;

    const result = contactReducer(initialState, { type: 'unknown' });

    expect(result).toEqual(initialState);
  });
});

describe('fetchContacts extra reducer tests', () => {
  it('should assign an error value, the rejected status, and an empty array to the fields in the state if a rejected action was called', () => {
    const mockState = {
      status: null,
      error: null,
      data: [],
    };

    const action = {
      type: fetchContacts.rejected,
      payload: {
        message: 'mock error',
      },
    };

    const result = contactReducer(mockState, action);

    expect(result.data).toEqual([]);
    expect(result.status).toBe('rejected');
    expect(result.error).toBe(action.payload.message);
  });

  it('should assign the status "pending" and assign a null value to the error in the state if a pending action was called', () => {
    const mockState = {
      status: 'rejected' as const,
      error: 'some error',
      data: [],
    };

    const action = {
      type: fetchContacts.pending,
    };

    const result = contactReducer(mockState, action);

    expect(result.error).toBeNull();
    expect(result.status).toBe('loading');
  });

  it('should assign the resolved status, assign the null value to the error, and add data from the array to the state if the fullfiled action was called', () => {
    const mockState = {
      status: 'rejected' as const,
      error: 'mock error',
      data: [],
    };

    const expectedData = [{
      clientId: 583930,
      clientName: 'Name # 119',
      'TRN/PPSN': 1011234,
      yearEnd: '2022-09-07',
      ARD: '2022-09-07',
      companyNumber: 554632627,
      email: 'email8931@gmail.com',
      phoneNumber: '74893570',
      companyAdress: '55 Name Street',
    }];

    const action = {
      type: fetchContacts.fulfilled,
      payload: expectedData,
    };

    const result = contactReducer(mockState, action);

    expect(result.status).toBe('resolved');
    expect(result.error).toBeNull();
    expect(result.data).toEqual(expectedData);
  });
});

describe('deleteContact extra reducer tests', () => {
  it('should assign an error value, the rejected status, and an empty array to the fields in the state if a rejected action was called', () => {
    const mockState = {
      status: null,
      error: null,
      data: [],
    };

    const action = {
      type: deleteContact.rejected,
      payload: {
        message: 'mock error',
      },
    };

    const result = contactReducer(mockState, action);

    expect(result.data).toEqual([]);
    expect(result.status).toBe('rejected');
    expect(result.error).toBe(action.payload.message);
  });

  it('should assign the status "pending" and assign a null value to the error in the state if a pending action was called', () => {
    const mockState = {
      status: 'rejected' as const,
      error: 'some error',
      data: [],
    };

    const action = {
      type: deleteContact.pending,
    };

    const result = contactReducer(mockState, action);

    expect(result.error).toBeNull();
    expect(result.status).toBe('loading');
  });

  it('should assign the resolved status, assign the null value to the error, and add data from the array to the state if the fullfiled action was called', () => {
    const mockState = {
      status: 'rejected' as const,
      error: 'mock error',
      data: [],
    };

    const action = {
      type: deleteContact.fulfilled,
    };

    const result = contactReducer(mockState, action);

    expect(result.status).toBe('resolved');
    expect(result.error).toBeNull();
  });
});

describe('addContact extra reducer tests', () => {
  it('should assign an error value, the rejected status, and an empty array to the fields in the state if a rejected action was called', () => {
    const mockState = {
      status: null,
      error: null,
      data: [],
    };

    const action = {
      type: deleteContact.rejected,
      payload: {
        message: 'mock error',
      },
    };

    const result = contactReducer(mockState, action);

    expect(result.data).toEqual([]);
    expect(result.status).toBe('rejected');
    expect(result.error).toBe(action.payload.message);
  });

  it('should assign the status "pending" and assign a null value to the error in the state if a pending action was called', () => {
    const mockState = {
      status: 'rejected' as const,
      error: 'some error',
      data: [],
    };

    const action = {
      type: deleteContact.pending,
    };

    const result = contactReducer(mockState, action);

    expect(result.error).toBeNull();
    expect(result.status).toBe('loading');
  });

  it('should assign the resolved status, assign the null value to the error, and add data from the array to the state if the fullfiled action was called', () => {
    const mockState = {
      status: 'rejected' as const,
      error: 'mock error',
      data: [],
    };

    const action = {
      type: deleteContact.fulfilled,
    };

    const result = contactReducer(mockState, action);

    expect(result.status).toBe('resolved');
    expect(result.error).toBeNull();
  });
});

describe('changeContact extra reducer tests', () => {
  it('should assign an error value, the rejected status, and an empty array to the fields in the state if a rejected action was called', () => {
    const mockState = {
      status: null,
      error: null,
      data: [],
    };

    const action = {
      type: deleteContact.rejected,
      payload: {
        message: 'mock error',
      },
    };

    const result = contactReducer(mockState, action);

    expect(result.data).toEqual([]);
    expect(result.status).toBe('rejected');
    expect(result.error).toBe(action.payload.message);
  });

  it('should assign the status "pending" and assign a null value to the error in the state if a pending action was called', () => {
    const mockState = {
      status: 'rejected' as const,
      error: 'some error',
      data: [],
    };

    const action = {
      type: deleteContact.pending,
    };

    const result = contactReducer(mockState, action);

    expect(result.error).toBeNull();
    expect(result.status).toBe('loading');
  });

  it('should assign the resolved status, assign the null value to the error, and add data from the array to the state if the fullfiled action was called', () => {
    const mockState = {
      status: 'rejected' as const,
      error: 'mock error',
      data: [],
    };

    const action = {
      type: deleteContact.fulfilled,
    };

    const result = contactReducer(mockState, action);

    expect(result.status).toBe('resolved');
    expect(result.error).toBeNull();
  });
});

