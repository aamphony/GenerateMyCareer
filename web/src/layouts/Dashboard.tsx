import { Outlet, useNavigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import Button from '../components/Button';

const DashboardLayout = () => {
  const navigate = useNavigate();
  const { userId, username, isLoading } = useAuth();

  if (isLoading) {
    return null;
  }

  return (
    <div className="flex flex-col w-full h-full">
      <header className="p-4">
        <div className="container mx-auto flex justify-between items-center">
          <span className="font-bold text-xl">Generate My Career</span>
          <div>
            {username && (
              <div className="space-x-2">
                <span>
                  Logged in as <span className="font-bold">{username}</span>
                </span>
                <Button text="Log Out" />
              </div>
            )}
          </div>
        </div>
      </header>
      <main className="container mx-auto flex-grow p-4">
        <Outlet />
      </main>
    </div>
  );
};

export default DashboardLayout;
