import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Page from './Page';
import HomeContent from './HomeContent';
import LoginContent from './LoginContent';
import RegisterContent from './RegisterContent';

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
      </Routes>
    </BrowserRouter>
  );
}

export default Main;
