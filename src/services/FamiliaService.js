const API_URL = "http://localhost:8000/familias";

export const FamiliaService = {
    getPorSector: async (sectorId) => {
        try {
            // Asumiendo que tu backend acepta este filtro: /familias/sector/5
            const response = await fetch(`${API_URL}/sector/${sectorId}`);
            if (!response.ok) throw new Error("Error al obtener familias");
            return await response.json();
        } catch (error) {
            console.error(error);
            return [];
        }
    }
};