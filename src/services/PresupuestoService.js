import { apiClient } from './apiClient';

const ENDPOINT = "/presupuestos";

export const presupuestoService = {
  
  crear: async (datosPresupuesto) => {
    return await apiClient(ENDPOINT, {
      method: "POST",
      body: JSON.stringify(datosPresupuesto)
    });
  },

  getMisPresupuestos: async () => {
    try {
      const data = await apiClient(ENDPOINT);
      return data.items || [];
    } catch (error) {
      console.error("Error en getMisPresupuestos:", error.message);
      throw error;
    }
  },

  getById: async (id) => {
    try {
      const data = await apiClient(`${ENDPOINT}/${id}`);
      console.log("Detalle del presupuesto:", data);
      return data;
    } catch (error) {
      console.error(`Error al obtener presupuesto ${id}:`, error.message);
      throw error;
    }
  }
};