export type ColumnHeader = {
  id: number,
  text: string,
}

export const createColumnHeaderData = (headings: string[]): ColumnHeader[] => {
  const headerList = headings.map((text, index) => ({
    id: index,
    text,
  }));

  return headerList;
};

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
