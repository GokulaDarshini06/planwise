import React from 'react';
import { useAuth } from './auth/useAuth';
import AuthPage from './pages/AuthPage';
import TaskScheduler from './pages/TaskScheduler';
import Loader from './components/Loader';

const App: React.FC = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center">
        <Loader />
      </div>
    );
  }

  return user ? <TaskScheduler /> : <AuthPage />;
};

export default App;
