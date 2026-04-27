const API_URL = "http://localhost:8000/presupuestos";

export const presupuestoService = {
  crear: async (datosPresupuesto) => {
    const token = localStorage.getItem("blume_token");

    try {
      const response = await fetch(`${API_URL}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(datosPresupuesto)
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || "Error al crear el presupuesto");
      }

      return await response.json();
    } catch (error) {
      console.error("Error en presupuestoService:", error);
      throw error;
    }
  },

  getMisPresupuestos: async () => {
  const token = localStorage.getItem("blume_token");
  const response = await fetch(`${API_URL}`, { 
      headers: {
      "Authorization": `Bearer ${token}`,
      "Content-Type": "application/json"
      }
  });
    
  if (!response.ok) throw new Error("Error al traer presupuestos");
  const data = await response.json();
  return data.items;
  },

  getById: async (id) => {
    const token = localStorage.getItem("blume_token");
    const response = await fetch(`${API_URL}/${id}`, {
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json"
      }
    });

    if (!response.ok) {
      if (response.status === 404) throw new Error("Presupuesto no encontrado");
      throw new Error("Error al obtener el detalle del presupuesto");
    }

    const data = await response.json();
    console.log(data)
    return data; 
  }

};