const API_URL = "http://localhost:8000/auth";

export const authService = {
  login: async (email, password) => {
    try {
        console.log("Ejecutando la funcion")
      const params = new URLSearchParams();
      params.append('username', email); 
      params.append('password', password);

      const response = await fetch(`${API_URL}/login`, {
        method: "POST",
        headers: { 
          "Content-Type": "application/x-www-form-urlencoded" 
        },
        body: params
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || "Error en el login");
      }

      const data = await response.json(); 
      
      if (data.access_token) {
        localStorage.setItem("blume_token", data.access_token);
        // Si tu back devuelve el user dentro de data, guardalo también
        if (data.user) {
          localStorage.setItem("blume_user", JSON.stringify(data.user));
        }
      }

      console.log("DATA: ", data)
      return data;
    } catch (error) {
      throw error;
    }
  },

  validarToken: async (token) => {
    try {
      const response = await fetch(`${API_URL}/validar-token`, {
        method: "GET",
        headers: { 
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}` 
        },
      });

      if (!response.ok) {
        throw new Error("Sesión expirada o token inválido");
      }

      return await response.json(); 
    } catch (error) {
      console.error("Error validando sesión:", error.message);
      throw error;
    }
  }
};