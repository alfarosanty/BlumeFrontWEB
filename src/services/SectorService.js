async function fetchWithRetry(url, options = {}, retries = 3, delay = 1000) {
    for (let i = 0; i < retries; i++) {
        try {
            const response = await fetch(url, options);
            if (response.ok) return response;
        } catch (err) {
            if (i === retries - 1) throw err; 
            await new Promise(res => setTimeout(res, delay));
        }
    }
}

const API_URL = "http://localhost:8000/sectores";

export const SectorService = {
    getVisiblesWeb: async () => {
        try {
            const response = await fetchWithRetry(`${API_URL}/web`);
            if (!response.ok) throw new Error("Error al obtener sectores");
            
            return await response.json();
        } catch (error) {
            console.error("Error en SectorService.getVisiblesWeb:", error);
            return [];
        }
    }
};