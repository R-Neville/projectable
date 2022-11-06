import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Page from './shared/Page';
import HomeContent from './HomeContent';
import LoginContent from './LoginContent';
import RegisterContent from './RegisterContent';
import DashboardContent from './DashboardContent';

function Main() {
  return (
    <BrowserRouter>
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
          element={<Page title="Dashboard" content={<DashboardContent />} />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default Main;
