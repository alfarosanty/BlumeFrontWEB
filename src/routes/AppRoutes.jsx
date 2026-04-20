import { Routes, Route } from 'react-router-dom';
import { Home, DetalleArticuloPage, Nosotros, Pagos, Politicas } from '../pages';

export const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/articulo/:id" element={<DetalleArticuloPage />} />
      {/* Podrías agregar rutas protegidas para el admin después */}
      {/* Nuevas rutas estáticas (sin dependencia de BD) */}
      <Route path="/nosotros" element={<Nosotros />} />
      <Route path="/politicas" element={<Politicas />} />
      <Route path="/pagos" element={<Pagos />} />
      <Route path="*" element={<div>Página no encontrada</div>} />
    </Routes>
  );
};