import {
  ActionFunctionArgs,
  redirect,
} from 'react-router-dom';
import AuthAPI from '../../../API/AuthAPI/AuthAPI';
import { loginUser } from '../../../store/slices/userSlice/userSlice';
import store from '../../../store/store';
import { setToken } from '../../../utils/authorization/authorization';
import { UserWithoutToken } from '../../../models/IUser';

interface loginActionArgs extends ActionFunctionArgs {
  request: Request,
}

const loginAction = async ({ request }: loginActionArgs): Promise<Response | Error> => {
  const authFormData = await request.formData();

  const authData = {
    username: authFormData.get('username'),
    password: authFormData.get('password'),
  } as UserWithoutToken;

  const tokenData = await AuthAPI.login(authData);

  if (tokenData instanceof Error) {
    return tokenData;
  }

  setToken(tokenData.token);

  store.dispatch(loginUser({
    ...authData,
    token: tokenData?.token,
  }));

  return redirect('/');
};

export default loginAction;
