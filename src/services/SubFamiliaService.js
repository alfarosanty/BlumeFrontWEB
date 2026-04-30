const API_URL = "http://localhost:8000/subfamilias";

export const SubFamiliaService = {
    getVisiblesWeb: async () => {
        try {
            const response = await fetch(`${API_URL}/web`);
            if (!response.ok) throw new Error("Error al obtener subfamilias");
            
            return await response.json();
        } catch (error) {
            console.error("Error en SubFamiliaService.getVisiblesWeb:", error);
            return [];
        }
    }
};