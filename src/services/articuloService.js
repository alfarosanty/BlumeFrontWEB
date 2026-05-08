import { apiClient } from './apiClient';

export const ArticuloService = {
  getArticulosPrecios: async (pagina = 1, size = 20, filtros = {}) => {
    try {
      const params = new URLSearchParams({ pagina, size, ...filtros });
      const pagedResponse = await apiClient(`/articulos/precios?${params}`);
      return pagedResponse.items || [];
    } catch (error) {
      console.error("Error en getArticulosPrecios:", error);
      return [];
    }
  },

  getDetalleArticulo: async (pagina = 1, size = 40, articulo_precio_id = 0) => {
    try {
      const params = new URLSearchParams({ pagina, size });
      if (articulo_precio_id) params.append("articulo_precio_id", articulo_precio_id);
      
      const pagedResponse = await apiClient(`/articulos?${params}`);
      return pagedResponse.items || [];
    } catch (error) {
      console.error("Error en getDetalleArticulo:", error);
      return [];
    }
  },

  getSugerencias: async (q) => {
    console.group("🔎 ArticuloService: getSugerencias");
    try {
      if (!q || q.length < 2) {
        console.groupEnd();
        return [];
      }

      const params = new URLSearchParams({ q });


      const sugerencias = await apiClient(`/articulos/sugerencias?${params}`);
      
      console.groupEnd();
      
      return sugerencias;
    } catch (error) {
      console.error("❌ Error en getSugerencias:", error.message);
      console.groupEnd();
      return [];
    }
  }
};