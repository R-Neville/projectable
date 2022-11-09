import { Routes, Route } from 'react-router-dom';
import { useAuthContext } from '../context-providers/AuthProvider';
import ProtectedRoute from './ProjectedRoute';
import Page from './shared/Page';
import HomeContent from './HomeContent';
import LoginContent from './LoginContent';
import RegisterContent from './RegisterContent';
import DashboardContent from './DashboardContent';

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
    </Routes>
  );
}

export default Main;
