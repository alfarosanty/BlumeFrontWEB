import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Mail, User as UserIcon, ArrowRight, Building2, Hash, Phone, AlertCircle, Eye, EyeOff, Lock } from 'lucide-react';
import { usuarioService } from '../services/usuarioService';

const Login = () => {
  const [isRegister, setIsRegister] = useState(false);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    username: '', // Nuevo campo
    razon_social: '',
    cuit: '',
    telefono: ''
  });

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Filtro para CUIT y Teléfono: solo números
    if (name === 'cuit' || name === 'telefono') {
      const soloNumeros = value.replace(/\D/g, '');
      if (name === 'cuit' && soloNumeros.length > 11) return; // Límite de 11
      setFormData(prev => ({ ...prev, [name]: soloNumeros }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }

    if (error) setError(null);
  };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setLoading(true);

        try {
            if (isRegister) {
            // REGISTRO REAL
            const respuestaBack = await usuarioService.registrar(formData);
            login(respuestaBack); 
            navigate('/presupuesto');
            } else {
            // LOGIN REAL
            // Mandamos solo email y password que el usuario escribió
            const usuarioLogueado = await usuarioService.login(formData.email, formData.password);
            
            // Si llegamos acá, es porque el back devolvió 200 OK
            login(usuarioLogueado); 
            navigate('/presupuesto');
            }
        } catch (err) {
            // Aquí caerán errores como "Usuario no encontrado" o "Contraseña incorrecta"
            setError(err.message);
        } finally {
            setLoading(false);
        }
        };

  return (
    <div className="min-h-screen bg-[#faf9f6] flex items-center justify-center p-6">
      <div className={`${isRegister ? 'max-w-2xl' : 'max-w-md'} w-full bg-white rounded-3xl shadow-xl border border-stone-100 overflow-hidden transition-all duration-500`}>
        <div className="p-10">
          <h2 className="text-3xl font-serif font-bold text-stone-900 mb-2 text-center">
            {isRegister ? 'Crear cuenta.' : 'Bienvenido.'}
          </h2>
          <p className="text-stone-400 text-[10px] uppercase tracking-[0.2em] mb-8 text-center">
            {isRegister ? 'Ingresá tus datos de cliente mayorista' : 'Gestioná tus presupuestos de Blume'}
          </p>

          {error && (
            <div className="mb-6 p-4 bg-red-50 rounded-2xl flex items-center gap-3 text-red-600 text-[11px] font-medium border border-red-100 animate-pulse">
              <AlertCircle size={16} />
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className={`grid ${isRegister ? 'md:grid-cols-2' : 'grid-cols-1'} gap-4`}>
              
              {/* Email */}
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-300" size={18} />
                <input 
                  name="email" type="email" placeholder="Email" required
                  value={formData.email} onChange={handleChange}
                  className="w-full bg-stone-50 border-none rounded-2xl py-4 pl-12 pr-4 text-sm focus:ring-2 focus:ring-orange-500/20 outline-none"
                />
              </div>

              {/* Password */}
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-300" size={18} />
                
                <input 
                    name="password" 
                    // Aquí está la magia: el tipo cambia según el estado
                    type={showPassword ? "text" : "password"} 
                    placeholder="Contraseña" 
                    required
                    value={formData.password} 
                    onChange={handleChange}
                    className="w-full bg-stone-50 border-none rounded-2xl py-4 pl-12 pr-12 text-sm focus:ring-2 focus:ring-orange-500/20 outline-none"
                />

                {/* Botón para alternar visibilidad */}
                <button
                    type="button" // Importante: que no sea submit
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600 transition-colors"
                >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
                </div>

              {/* Campos extra de Registro */}
              {isRegister && (
                <>
                  <div className="relative">
                    <UserIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-300" size={18} />
                    <input 
                      name="username" type="text" placeholder="Nombre de Usuario" required
                      value={formData.username} onChange={handleChange}
                      className="w-full bg-stone-50 border-none rounded-2xl py-4 pl-12 pr-4 text-sm focus:ring-2 focus:ring-orange-500/20 outline-none"
                    />
                  </div>
                  <div className="relative">
                    <Building2 className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-300" size={18} />
                    <input 
                      name="razon_social" type="text" placeholder="Razón Social" required
                      value={formData.razon_social} onChange={handleChange}
                      className="w-full bg-stone-50 border-none rounded-2xl py-4 pl-12 pr-4 text-sm focus:ring-2 focus:ring-orange-500/20 outline-none"
                    />
                  </div>
                  <div className="relative">
                    <Hash className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-300" size={18} />
                    <input 
                      name="cuit" type="text" placeholder="CUIT (Solo números)" required
                      value={formData.cuit} onChange={handleChange}
                      className="w-full bg-stone-50 border-none rounded-2xl py-4 pl-12 pr-4 text-sm focus:ring-2 focus:ring-orange-500/20 outline-none"
                    />
                  </div>
                  <div className="relative">
                    <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-300" size={18} />
                    <input 
                      name="telefono" type="text" placeholder="Teléfono"
                      value={formData.telefono} onChange={handleChange}
                      className="w-full bg-stone-50 border-none rounded-2xl py-4 pl-12 pr-4 text-sm focus:ring-2 focus:ring-orange-500/20 outline-none"
                    />
                  </div>
                </>
              )}
            </div>

            <button 
              disabled={loading}
              className="w-full bg-stone-900 hover:bg-orange-600 disabled:bg-stone-400 text-white py-4 rounded-2xl font-bold uppercase tracking-[0.2em] text-[11px] transition-all duration-500 flex items-center justify-center gap-3 shadow-lg mt-4"
            >
              {loading ? 'Validando...' : (isRegister ? 'Registrarme' : 'Entrar')}
              {!loading && <ArrowRight size={14} />}
            </button>
          </form>

          <div className="mt-8 text-center">
            <button 
              onClick={() => { setIsRegister(!isRegister); setError(null); }}
              className="text-[10px] uppercase tracking-widest text-stone-400 hover:text-stone-900 font-bold transition-colors"
            >
              {isRegister ? '¿Ya sos cliente? Iniciá sesión' : '¿No tenés cuenta? Registrate como mayorista'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;