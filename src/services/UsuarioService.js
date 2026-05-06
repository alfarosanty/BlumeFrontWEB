const API_URL = "http://localhost:8000/usuarios";

export const usuarioService = {
  registrar: async (datosRegistro) => {
    try {
      console.log("🚀 Enviando a registrar:", datosRegistro);
      const response = await fetch(`${API_URL}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(datosRegistro),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error("❌ Error 422/Backend:", errorData);
        throw new Error(errorData.detail || "Error en el registro");
      }
      return await response.json();
    } catch (error) {
      console.error("🔥 Error Service:", error.message);
      throw error;
    }
  },

  obtenerPorEmail: async (email) => {
    try {
      const response = await fetch(`${API_URL}/${email}`);
      if (!response.ok) {
        if (response.status === 404) return null;
        throw new Error("Error al obtener los datos del usuario");
      }
      return await response.json();
    } catch (error) {
      console.error("Error en obtenerPorEmail:", error);
      throw error;
    }
  },

  login: async (email, password) => {
    try {
      console.log("🔑 Intentando login para:", email);
      const response = await fetch(`${API_URL}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error("❌ Error en Login:", errorData);
        throw new Error(errorData.detail || "Email o contraseña incorrectos");
      }

      return await response.json();
    } catch (error) {
      console.error("🔥 Error en loginService:", error.message);
      throw error;
    }
  },
};