const API_URL = "http://localhost:8000/usuarios";

export const usuarioService = {
  // Registro completo: Usuario + Cliente
  registrar: async (datosRegistro) => {
    try {
      const response = await fetch(`${API_URL}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(datosRegistro),
      });

      if (!response.ok) {
        // Intentamos capturar el error detallado de FastAPI (el que pusiste en la excepción)
        const errorData = await response.json();
        throw new Error(errorData.detail || "Error al registrar el usuario");
      }

      return await response.json(); // Retorna el UsuarioResponse
    } catch (error) {
      console.error("Error en registrarUsuarioService:", error.message);
      throw error;
    }
  },

  // Obtener por email (útil para verificar existencia o perfiles)
  obtenerPorEmail: async (email) => {
    try {
      const response = await fetch(`${API_URL}/${email}`);
      
      if (!response.ok) {
        if (response.status === 404) return null;
        throw new Error("Error al obtener los datos del usuario");
      }
      
      return await response.json();
    } catch (error) {
      throw error;
    }
  },

  login: async (email, password) => {
    try {
      const response = await fetch(`${API_URL}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        // Si el back devuelve 401 (Credenciales inválidas), lo capturamos acá
        throw new Error(errorData.detail || "Email o contraseña incorrectos");
      }

      return await response.json(); // Retorna el objeto del usuario: { id, email, username, ... }
    } catch (error) {
      throw error;
    }
  },
  
};
