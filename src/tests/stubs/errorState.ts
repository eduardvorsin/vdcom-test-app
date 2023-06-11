const errorState = {
  contact: {
    status: 'rejected' as const,
    error: 'mock error',
    data: [],
  },
  user: {
    username: '',
    password: '',
    token: '',
  },
};

export default errorState;
