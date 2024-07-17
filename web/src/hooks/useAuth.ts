import { useAtom } from 'jotai';
import { authAtom } from '../lib/state';
import { useEffect } from 'react';
import { getCurrentUser } from '../api/auth';
import { useNavigate } from 'react-router-dom';

const useAuth = () => {
  const navigate = useNavigate();
  const [auth, setAuth] = useAtom(authAtom);

  useEffect(() => {
    let isMounted = true;

    (async () => {
      if (!auth.isAuthenticated) {
        try {
          const user = await getCurrentUser();

          if (isMounted) {
            setAuth({
              userId: user.userId,
              username: user.username,
              isLoading: false,
              isAuthenticated: true,
            });
            navigate('/cover-letters', { replace: true });
          }
        } catch (error) {
          console.error(error);

          if (isMounted) {
            setAuth({
              userId: null,
              username: null,
              isLoading: false,
              isAuthenticated: false,
            });
            navigate('/login', { replace: true });
          }
        }
      }
    })();

    return () => {
      isMounted = false;
    };
  }, [auth, setAuth]);

  return auth;
};

export default useAuth;
