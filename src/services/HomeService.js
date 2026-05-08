const API_BASE_URL = "http://localhost:8000/config";

export const HomeService = {
    getHomeConfig: async () => {
        try {
            const response = await fetch(`${API_BASE_URL}/home`);
            
            if (!response.ok) {
                throw new Error("Error al obtener la configuración de la Home");
            }
            
            const data = await response.json();
            return data;
        } catch (error) {
            console.error("Error en HomeService.getHomeConfig:", error);
            return {
                hero_url: "",
                hero_titulo: "Blume Textil",
                hero_subtitulo: "Diseño Atemporal",
                whatsapp_contacto: "+54 11 XXXX-XXXX",
                email_contacto: "hola@blumetextil.com"
            };
        }
    }
};