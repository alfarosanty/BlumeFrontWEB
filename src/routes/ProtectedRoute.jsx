import { Navigate, Outlet } from 'react-router-dom';
import PantallaCarga from '../components/PantallaCarga';

const ProtectedRoute = ({ isAuthenticated, user, isAuthLoading }) => {
  if (isAuthLoading) return <PantallaCarga />;

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (user && !user.confirmado) {
    return <Navigate to="/espera-confirmacion" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute