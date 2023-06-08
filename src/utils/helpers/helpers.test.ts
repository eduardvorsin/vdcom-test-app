import { createToken, fakeDelay, generateRandomStringFromCharacters, sortContactsBy } from './helpers';

describe('generateRandomStringFromCharacters tests', () => {
  it('should return an error if the characters array is empty', () => {
    expect(() => {
      generateRandomStringFromCharacters([], 1);
    }).toThrow('the size of the characters array must be greater than 0');
  });

  it('should return an error if the characters argument is not an array', () => {
    expect(() => {
      // @ts-expect-error testing wrong argument type
      generateRandomStringFromCharacters(null, 1);
    }).toThrow('the characters argument must be an array');
  });

  it('should return an error if the size argument is not a number', () => {
    expect(() => {
      // @ts-expect-error testing wrong argument type
      generateRandomStringFromCharacters(['a', 'b'], '1');
    }).toThrow('the size argument must be a number');
  });

  it('should return an error if the size argument is less than 1', () => {
    expect(() => {
      generateRandomStringFromCharacters(['a', 'b', 'c'], 0);
    }).toThrow('the value of the size argument must be greater than 0');
  });

  it('should return a random string with a length of 5 characters [1,a,!,_,#]', () => {
    const randomString = generateRandomStringFromCharacters(['1', 'a', '!', '_', '#'], 5);
    expect(randomString).toMatch(/^[1a!_#]{5}$/gi);
    expect(randomString).toHaveLength(5);
  });
});

describe('createToken tests', () => {
  it('should return a token consisting of 3 parts with a size of 5 characters separated by a sign . and consisting of letters and numbers in lowercase', () => {
    expect(createToken()).toMatch(/^([a-z0-9]){5}\.([a-z0-9]){5}\.([a-z0-9]){5}$/g);
  });
});

describe('fakeDelay tests', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('should return an error if the ms argument is not a number', () => {
    expect(() => {
      // @ts-expect-error testing wrong argument type
      fakeDelay('a');
    }).toThrow('the value of the ms argument must be a number');
  });

  it('should call the function after 100 milliseconds', async () => {
    const mockFunction = jest.fn<void, [unknown]>();
    fakeDelay(99).then(mockFunction);

    jest.advanceTimersByTime(100);
    await Promise.resolve();

    expect(mockFunction).toHaveBeenCalled();
  });

  it('should not call the function for up to 100 milliseconds', async () => {
    const mockFunction = jest.fn<void, [unknown]>();
    fakeDelay(99).then(mockFunction);

    jest.advanceTimersByTime(50);
    await Promise.resolve();

    expect(mockFunction).not.toHaveBeenCalled();
  });
});

describe('sortContactsBy tests', () => {
  const mockContactsArray = [{
    clientId: 1,
    clientName: '1',
    'TRN/PPSN': 1,
    yearEnd: '1',
    ARD: '1',
    companyNumber: 1,
    email: '1',
    phoneNumber: '1',
    companyAdress: '1',
  },
  {
    clientId: 2,
    clientName: '2',
    'TRN/PPSN': 2,
    yearEnd: '2',
    ARD: '2',
    companyNumber: 2,
    email: '2',
    phoneNumber: '2',
    companyAdress: '2',
  },
  ];

  it('should return an error if the first argument passed is not an array', () => {
    expect(() => {
      // @ts-expect-error testing wrong arguments type
      sortContactsBy(null, '', '');
    }).toThrow('the first argument must be an array');
  });

  it('should return an empty array if an empty array is also passed as the first argument', () => {
    expect(sortContactsBy([], 'clientId', 'asc')).toEqual([]);
  });

  it('should return an error if not a string is passed to OrderBy', () => {
    expect(() => {
      // @ts-expect-error testing wrong arguments type
      sortContactsBy(mockContactsArray, null, 'asc');
    }).toThrow('the orderBy argument must be a string');
  });

  it('should return an error if the value passed to order is not asc or desc', () => {
    expect(() => {
      // @ts-expect-error testing wrong arguments type
      sortContactsBy(mockContactsArray, 'clientId', '1');
    }).toThrow('The order argument can take only one of two values: asc, desc');
  });

  it('should return an array of contacts sorted by the ClientID property in ascending order', () => {
    const result = sortContactsBy(mockContactsArray, 'clientId', 'asc');

    expect(result[0].clientId).toBeLessThan(result[1].clientId);
  });

  it('should return an array of contacts sorted by the ClientID property in descending order', () => {
    const result = sortContactsBy(mockContactsArray, 'clientId', 'desc');

    expect(result[0].clientId).toBeGreaterThan(result[1].clientId);
  });
});

