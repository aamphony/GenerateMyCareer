import { useSetAtom } from 'jotai';
import { authAtom } from '../lib/state';
import { login as loginUser } from '../api/auth';

const useAuthActions = () => {
  const setAuthState = useSetAtom(authAtom);

  const login = async ({
    username,
    password,
  }: {
    username: string;
    password: string;
  }) => {
    const res = await loginUser({ username, password });
    setAuthState({
      userId: res.data.id,
      username: res.data.username,
      isLoading: false,
      isAuthenticated: true,
    });
  };

  const logout = async () => {
    setAuthState({
      userId: null,
      username: null,
      isLoading: false,
      isAuthenticated: false,
    });
  };

  return { login, logout };
};

export default useAuthActions;
