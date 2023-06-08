import contacts from '../../data/fakeData';
import ContactsAPI from './ContactsAPI';

const mockContact = {
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

describe('ContactsAPI fetchData tests', () => {
  it('should return an error if no token is passed', async () => {
    const response = await ContactsAPI.fetchData('');

    expect(response.status).toBe(0);
    expect(response.type).toBe('error');
  });

  it('should return contacts', async () => {
    const response = await ContactsAPI.fetchData('aaaa1.bbbb2.cccc3');
    const currentData = await response.json();

    expect(currentData.data).toEqual(contacts);
  });
});

describe('ContactsAPI removeData tests', () => {
  it('should return an error if no token is passed', async () => {
    const response = await ContactsAPI.removeData('', 1);

    expect(response.status).toBe(0);
    expect(response.type).toBe('error');
  });

  it('should return the id of the deleted contact', async () => {
    const response = await ContactsAPI.removeData('aaaa1.bbbb2.cccc3', 1);
    const currentData = await response.json();
    expect(currentData.data).toBe(1);
  });
});

describe('ContactsAPI addData tests', () => {
  it('should return an error if no token is passed', async () => {
    const response = await ContactsAPI.addData('', mockContact);

    expect(response.status).toBe(0);
    expect(response.type).toBe('error');
  });

  it('should return new contacts', async () => {
    const response = await ContactsAPI.addData('aaaa1.bbbb2.cccc3', mockContact);
    const currentData = await response.json();

    expect(currentData.data).toEqual(mockContact);
  });
});

describe('ContactsAPI updateData tests', () => {
  it('should return an error if no token is passed', async () => {
    const response = await ContactsAPI.updateData('', mockContact);

    expect(response.status).toBe(0);
    expect(response.type).toBe('error');
  });

  it('should return new contacts', async () => {
    const response = await ContactsAPI.updateData('aaaa1.bbbb2.cccc3', mockContact);
    const currentData = await response.json();

    expect(currentData.data).toEqual(mockContact);
  });
});
