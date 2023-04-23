import { createToken } from '../../helpers/helpers';
import { UserWithoutToken } from '../../models/IUser';

type AuthTokenData = {
  token: string,
};

export default class AuthAPI {
  static async login(authData: UserWithoutToken): Promise<AuthTokenData | Error> {
    let response;

    if (authData.username !== 'root1' || authData.password !== 'root1') {
      const errorBody = {
        errorMessage: 'The user with the same name and password was not found, try again',
      };

      response = new Response(
        JSON.stringify(errorBody),
        {
          status: 404,
        },
      );
    } else {
      const body = {
        token: createToken(),
      };

      response = new Response(JSON.stringify(body));
    }

    const data = await response.json();

    if (!response.ok) {
      return new Error(data.errorMessage);
    }

    return data;
  }
}
