export const getToken = (): string | null => localStorage.getItem('token');
export const isAuth = (): boolean => getToken() !== null;
export const removeToken = (): void => localStorage.removeItem('token');
export const setToken = (value: string): void => localStorage.setItem('token', value);
