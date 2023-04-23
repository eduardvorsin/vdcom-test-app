export interface IUser {
  username: string,
  password: string,
  token: string,
}

export type UserWithoutToken = Omit<IUser, 'token'>;
