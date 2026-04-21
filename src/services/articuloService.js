const API_URL = "http://localhost:8000/articulos";

export const getArticulosPrecios = async (pagina = 1, size = 20, codigo = "") => {
    try {
        const url = new URL(`${API_URL}/precios`);
        url.searchParams.append("pagina", pagina.toString());
        url.searchParams.append("size", size.toString());
        if (codigo) url.searchParams.append("codigo", codigo);

        const response = await fetch(url.toString());
        
        if (!response.ok) {
            throw new Error("No pude conectar con el servidor");
        }
        
        const pagedResponse = await response.json();
        console.log("response del back: ", pagedResponse)

        return pagedResponse.items || [];
    
    } catch (error) {
        console.error("Error al obtener los precios:", error);
        return [];
    }
};

export const getDetalleArticulo = async (pagina = 1, size = 20, articulo_precio_id = 0, signal) => {
    try {
        const url = new URL(API_URL);
        url.searchParams.append("pagina", pagina.toString());
        url.searchParams.append("size", size.toString());
        
        if (articulo_precio_id) {
            url.searchParams.append("articulo_precio_id", articulo_precio_id);
        }

        // PASAMOS EL SIGNAL ACÁ:
        const response = await fetch(url.toString(), { signal });
        
        if (!response.ok) throw new Error("Error en el servidor");
        
        const pagedResponse = await response.json();
        return pagedResponse.items || [];
    
    } catch (error) {
        if (error.name === 'AbortError') {
            console.log("Petición cancelada (Strict Mode)");
            return null; // Retornamos null para saber que fue una cancelación
        }
        console.error("Error al obtener los artículos:", error);
        return [];
    }
};