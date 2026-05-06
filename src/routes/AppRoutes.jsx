import { useAuth } from '../context/AuthContext';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Home, DetalleArticuloPage, Nosotros, Pagos, Politicas, CategoryPage, Presupuesto, Login, Gracias, MisPresupuestos } from '../pages';
import ProtectedRoute from './ProtectedRoute';
import EsperaConfirmacion from '../pages/EsperaConfirmacion';


export const AppRoutes = () => {
  const { isAuthenticated, loading, user } = useAuth(); // Traemos 'user'

  if (loading) return <PantallaCarga />;

  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/nosotros" element={<Nosotros />} />
      <Route path="/politicas" element={<Politicas />} />
      <Route path="/pagos" element={<Pagos />} />

      <Route 
        path="/espera-confirmacion" 
        element={isAuthenticated ? <EsperaConfirmacion /> : <Navigate to="/login" />} 
      />

      <Route element={<ProtectedRoute isAuthenticated={isAuthenticated} user={user} isAuthLoading={loading} />}>
        <Route path="/" element={<Home />} />
        <Route path="/articulo/:id" element={<DetalleArticuloPage />} />
        <Route path="/categoria/:categoryName" element={<CategoryPage />} />
        <Route path="/presupuesto" element={<Presupuesto />} />
        <Route path="/presupuesto/:id" element={<Presupuesto />} />
        <Route path="/mis-presupuestos" element={<MisPresupuestos />} />
        <Route path="/gracias" element={<Gracias />} />
      </Route>

      <Route path="*" element={<div>Página no encontrada</div>} />
    </Routes>
  );
};