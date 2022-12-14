import { Routes, Route } from 'react-router-dom';
import { useAuthContext } from '../context-providers/AuthProvider';
import ProtectedRoute from './ProjectedRoute';
import Page from './shared/Page';
import HomeContent from './HomeContent';
import LoginContent from './LoginContent';
import DateDisplay from './DateDisplay';
import RegisterContent from './RegisterContent';
import DashboardContent from './DashboardContent';
import ProjectContent from './ProjectContent';
import NoMatch from './NoMatch';
import { useEffect, useState } from 'react';

function Main() {
  const { loggedIn } = useAuthContext();

  const [projectName, setProjectName] = useState('');

  useEffect(() => {
    const onSetProjectName = (event) => {
      // Updates the project name:
      event.stopPropagation();
      const { name } = event.detail;
      setProjectName(name);
    };

    document.addEventListener('set-project-name', onSetProjectName);

    return () => {
      document.removeEventListener('set-project-name', onSetProjectName);
    };
  }, []);

  return (
    <Routes>
      <Route
        path="/"
        element={<Page title="Welcome!" content={<HomeContent />} />}
      />
      <Route
        path="/login"
        element={<Page title="Login" content={<LoginContent />} />}
      />
      <Route
        path="/register"
        element={<Page title="Register" content={<RegisterContent />} />}
      />
      <Route
        path="/dashboard/*"
        element={
          <ProtectedRoute loggedIn={loggedIn}>
            <Page title="Dashboard" date={<DateDisplay/>} content={<DashboardContent />} />
          </ProtectedRoute>
        }
      />
      <Route
        path="/project/:id/*"
        element={
          <ProtectedRoute loggedIn={loggedIn}>
            <Page
              title={projectName || 'Project'}
              content={<ProjectContent />}
            />
          </ProtectedRoute>
        }
      />
      <Route
        path="*"
        element={<Page title="404 Not Found" content={<NoMatch />} />}
      />
    </Routes>
  );
}

export default Main;
