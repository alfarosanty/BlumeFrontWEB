import React, { createContext, useContext, useState, useEffect } from 'react';
import { authService } from '../services/AuthService';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate()

  useEffect(() => {
    const verificarSesionPersistente = async () => {
      const token = localStorage.getItem("blume_token");
      const userSaved = localStorage.getItem("blume_user");

      if (token && userSaved) {
        try {
          const datosFrescos = await authService.validarToken(token);
          setUser(datosFrescos);
        } catch (error) {
          console.error("Token inválido o expirado");
          logout();
        }
      }
      setLoading(false);
    };

    verificarSesionPersistente();
  }, []);

  const login = (data) => {
    setUser(data.user);
    localStorage.setItem("blume_token", data.access_token);
    localStorage.setItem("blume_user", JSON.stringify(data.user));
  };

  const logout = () => {
    setUser(null);

    localStorage.removeItem("blume_token");
    localStorage.removeItem("blume_user");

    navigate("/login", { replace: true });
    };

  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated: !!user, loading }}>
      {loading ? (
        /* Pantalla de carga estética mientras verificamos sesión */
        <div className="h-screen w-full bg-[#faf9f6] flex flex-col justify-center items-center space-y-4">
          <div className="w-8 h-8 border-4 border-stone-200 border-t-orange-500 rounded-full animate-spin"></div>
          <p className="text-stone-400 text-[10px] uppercase tracking-[0.2em] font-bold">
            Explorando Blume...
          </p>
        </div>
      ) : (
        /* Renderizado normal de la aplicación */
        children
      )}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);