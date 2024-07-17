import Button from '../../components/Button';
import TextInput from '../../components/TextInput';
import { Link, useNavigate } from 'react-router-dom';
import useAuthActions from '../../hooks/useAuthActions';

const LoginPage = () => {
  const navigate = useNavigate();
  const { login } = useAuthActions();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    try {
      await login({
        username: formData.get('username') as string,
        password: formData.get('password') as string,
      });
      navigate('/cover-letters', { replace: true });
    } catch (error) {
      console.error((error as Error).message);
      // TODO: show error toast
    }
  };

  return (
    <main className="flex flex-col h-full w-full items-center justify-center">
      <h1 className="font-bold mb-8">Log In</h1>
      <form
        className="space-y-3 w-[400px]"
        method="post"
        onSubmit={handleSubmit}
      >
        <TextInput
          label="username"
          defaultValue="your@email.com"
          minLength={6}
        />
        <TextInput label="password" defaultValue="password123" minLength={6} />
        <Button className="" text="Log In" full type="submit" />
      </form>
      <div className="text-center text-gray-500 py-3">
        <div>
          Don't have an account yet?{' '}
          <Link className="underline text-black" to="/register">
            Register Now
          </Link>
        </div>
      </div>
    </main>
  );
};

export default LoginPage;
