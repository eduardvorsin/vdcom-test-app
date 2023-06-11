import contacts from '../../data/fakeData';

const resolvedState = {
  contact: {
    status: 'resolved' as const,
    error: null,
    data: contacts,
  },
  user: {
    username: '',
    password: '',
    token: '',
  },
};

export default resolvedState;
