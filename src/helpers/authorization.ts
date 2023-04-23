export const isAuth = (): boolean => localStorage.getItem('token') !== null;
export const getToken = (): string | null => localStorage.getItem('token');
export const removeToken = (): void => localStorage.removeItem('token');
export const setToken = (value: string): void => localStorage.setItem('token', value);
