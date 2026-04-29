const API_URL = "http://localhost:8000/articulos";

export const ArticuloService = {
    
    getArticulosPrecios: async (pagina = 1, size = 20, codigo = "") => {
        try {
            const url = new URL(`${API_URL}/precios`);
            url.searchParams.append("pagina", pagina);
            url.searchParams.append("size", size);
            if (codigo) url.searchParams.append("codigo", codigo);

            const response = await fetch(url.toString());
            if (!response.ok) throw new Error("Error al conectar con el servidor");
            
            const pagedResponse = await response.json();
            return pagedResponse.items || [];
        } catch (error) {
            console.error("Error en getArticulosPrecios:", error);
            return [];
        }
    },

    getDetalleArticulo: async (pagina = 1, size = 20, articulo_precio_id = 0, signal) => {
        try {
            const url = new URL(API_URL);
            url.searchParams.append("pagina", pagina);
            url.searchParams.append("size", size);
            if (articulo_precio_id) url.searchParams.append("articulo_precio_id", articulo_precio_id);

            const response = await fetch(url.toString(), { signal });
            if (!response.ok) throw new Error("Error en el servidor");
            
            const pagedResponse = await response.json();
            return pagedResponse.items || [];
        } catch (error) {
            if (error.name === 'AbortError') return null;
            console.error("Error en getDetalleArticulo:", error);
            return [];
        }
    },

    getSugerencias: async (q) => {
        try {
            const url = new URL(`${API_URL}/sugerencias`);
            url.searchParams.append("q", q);

            const response = await fetch(url.toString());
            if (!response.ok) throw new Error("Error en las sugerencias");
            
            return await response.json(); // Devuelve la lista de ArticuloSugerencia
        } catch (error) {
            console.error("Error en getSugerencias:", error);
            return [];
        }
    }
};