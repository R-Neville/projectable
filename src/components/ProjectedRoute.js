import { Outlet, Navigate } from 'react-router-dom';

function ProtectedRoute({ loggedIn, children }) {
  if (!loggedIn) {
    return <Navigate replace to="/" />;
  }

  return children ? children : <Outlet />;
}

export default ProtectedRoute;
