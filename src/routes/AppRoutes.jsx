import { Routes, Route } from 'react-router-dom';
import { Home, DetalleArticuloPage, Nosotros, Pagos, Politicas, CategoryPage, Presupuesto, Login } from '../pages';

export const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/articulo/:id" element={<DetalleArticuloPage />} />
      <Route path="/categoria/:categoryName" element={<CategoryPage />} />
      <Route path="/presupuesto" element={<Presupuesto />} />
      <Route path="/login" element={<Login />} />
      {/* Podrías agregar rutas protegidas para el admin después */}
      {/* Nuevas rutas estáticas (sin dependencia de BD) */}
      <Route path="/nosotros" element={<Nosotros />} />
      <Route path="/politicas" element={<Politicas />} />
      <Route path="/pagos" element={<Pagos />} />
      <Route path="*" element={<div>Página no encontrada</div>} />
    </Routes>
  );
};