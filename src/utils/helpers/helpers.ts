import { IContact } from '../../models/IContact';

export type ColumnHeader = {
  id: number,
  text: string,
}

export const generateRandomStringFromCharacters = (characters: string[], size: number): string => {
  if (!Array.isArray(characters)) {
    throw new Error('the characters argument must be an array');
  }

  if (characters.length < 1) {
    throw new Error('the size of the characters array must be greater than 0');
  }

  if (typeof size !== 'number') {
    throw new Error('the size argument must be a number');
  }

  if (size < 1) {
    throw new Error('the value of the size argument must be greater than 0');
  }

  let result = '';
  let currentIndex = 0;

  while (currentIndex < size) {
    result += characters[Math.floor(Math.random() * characters.length)];
    currentIndex += 1;
  }

  return result;
};

export const createId = (): number => {
  const characters = '0123456789'.split('');

  return +generateRandomStringFromCharacters(characters, 6);
};

export const createToken = (): string => {
  const characters = 'abcdefghijklmnopqrstuvwxyz0123456789'.split('');
  const result = [
    generateRandomStringFromCharacters(characters, 5),
    generateRandomStringFromCharacters(characters, 5),
    generateRandomStringFromCharacters(characters, 5),
  ];

  return result.join('.');
};

export const fakeDelay = (ms: number): Promise<unknown> => {
  if (typeof ms !== 'number') {
    throw new Error('the value of the ms argument must be a number');
  }

  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
};

export type SortOrder = 'asc' | 'desc';
export const sortContactsBy = (array: IContact[], orderBy: keyof IContact, order: SortOrder = 'asc'): IContact[] => {
  if (!Array.isArray(array)) {
    throw new Error('the first argument must be an array');
  }

  if (array.length === 0) return [];

  if (typeof orderBy !== 'string') {
    throw new Error('the orderBy argument must be a string');
  }

  if (order !== 'asc' && order !== 'desc') {
    throw new Error('The order argument can take only one of two values: asc, desc');
  }

  const copiedArray = [...array];

  const comparator = (a: IContact, b: IContact): number => {
    const firstValue = a[orderBy].toString();
    const secondValue = b[orderBy].toString();

    if (order === 'desc') {
      return secondValue.localeCompare(firstValue);
    }
    return firstValue.localeCompare(secondValue);
  };

  return copiedArray.sort(comparator);
};
