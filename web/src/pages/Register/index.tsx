import { register } from '../../api/auth';
import Button from '../../components/Button';
import TextInput from '../../components/TextInput';
import { Form, Link } from 'react-router-dom';
import type { ActionFunctionArgs } from 'react-router-dom';
import { redirect } from 'react-router-dom';

export const registerAction = async ({ request }: ActionFunctionArgs) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  const res = await register(data as { username: string; password: string });

  if (!res.ok) {
    throw new Error(res.statusText);
  }

  redirect('/login');
};

const RegisterPage = () => {
  return (
    <main>
      <h1 className="text-4xl font-bold mb-8">Register</h1>
      <Form className="space-y-3 w-[400px]" method="post">
        <TextInput
          label="username"
          defaultValue="your@email.com"
          minLength={6}
          required
        />
        <TextInput
          label="password"
          defaultValue="password123"
          minLength={6}
          required
        />
        <Button className="" text="Register" full type="submit" />
      </Form>
      <div className="text-center text-gray-500 py-3">
        <div>
          Already have an account?{' '}
          <Link className="underline text-black" to="/login">
            Log In
          </Link>
        </div>
      </div>
    </main>
  );
};

export default RegisterPage;
