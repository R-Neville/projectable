import { Routes, Route } from 'react-router-dom';
import { useAuthContext } from '../context-providers/AuthProvider';
import ProtectedRoute from './ProjectedRoute';
import Page from './shared/Page';
import HomeContent from './HomeContent';
import LoginContent from './LoginContent';
import RegisterContent from './RegisterContent';
import DashboardContent from './DashboardContent';
import ProjectContent from './ProjectContent';
import NoMatch from './NoMatch';

function Main() {
  const { loggedIn } = useAuthContext();

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
            <Page title="Dashboard" content={<DashboardContent />} />
          </ProtectedRoute>
        }
      />
      <Route
        path="/project/:id/*"
        element={
          <ProtectedRoute loggedIn={loggedIn}>
            <Page title="Project" content={<ProjectContent />} />
          </ProtectedRoute>
        }
      />
      <Route path="*" element={<Page title="404 Not Found" content={<NoMatch/>} />}/>
    </Routes>
  );
}

export default Main;
