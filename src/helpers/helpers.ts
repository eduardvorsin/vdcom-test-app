import { IContact } from '../models/IContact';

export type ColumnHeader = {
  id: number,
  text: string,
}

export const generateRandomStringFromCharacters = (characters: string[], size: number): string => {
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

// eslint-disable-next-line no-promise-executor-return
export const fakeDelay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export type SortOrder = 'asc' | 'desc';
export const sortContactsBy = (array: IContact[], orderBy: keyof IContact, order: SortOrder = 'asc'): IContact[] => {
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
