const loadingState = {
  contact: {
    status: 'loading' as const,
    error: null,
    data: [],
  },
  user: {
    username: '',
    password: '',
    token: '',
  },
};

export default loadingState;
