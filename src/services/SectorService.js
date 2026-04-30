const API_URL = "http://localhost:8000/sectores";

export const SectorService = {
    getVisiblesWeb: async () => {
        try {
            const response = await fetch(`${API_URL}/web`);
            if (!response.ok) throw new Error("Error al obtener sectores");
            
            return await response.json();
        } catch (error) {
            console.error("Error en SectorService.getVisiblesWeb:", error);
            return [];
        }
    }
};