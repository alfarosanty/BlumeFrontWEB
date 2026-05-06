import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, useLocation } from 'react-router-dom';
import { Mail, User as UserIcon, ArrowRight, Building2, Hash, Phone, AlertCircle, Eye, EyeOff, Lock, CheckCircle2 } from 'lucide-react';
import { usuarioService } from '../services/usuarioService';
import { authService } from '../services/AuthService';

const Login = () => {
  const [isRegister, setIsRegister] = useState(false);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  
  const [formData, setFormData] = useState({
    email: '', password: '', username: '', razon_social: '', cuit: '', telefono: ''
  });

  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'cuit' || name === 'telefono') {
      const soloNumeros = value.replace(/\D/g, '');
      if (name === 'cuit' && soloNumeros.length > 11) return;
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

        const payload = {
          email: formData.email,
          username: formData.username,
          password: formData.password,
          razon_social: formData.razon_social,
          cuit: formData.cuit.trim(),
          telefono: formData.telefono?.trim() || null 
        };

        await usuarioService.registrar(payload);

        setIsRegister(false);
        
        setFormData({
          email: '', password: '', username: '', razon_social: '', cuit: '', telefono: ''
        });

        navigate('/login', { 
          state: { 
            message: 'Cuenta creada con éxito. Tu perfil será validado por la administración de Blume antes de habilitar tu acceso.' 
          },
          replace: true 
        });

      } else {

        const usuarioLogueado = await authService.login(
          formData.email.trim(), 
          formData.password
        );
        
        login(usuarioLogueado); 
        navigate('/');
      }
    } catch (err) {

      console.error("Error en el formulario:", err.message);
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
            {isRegister ? 'Ingresá tus datos de cliente mayorista' : 'Gestioná tus presupuestos'}
          </p>

          {/* MENSAJE DE ÉXITO (Solo se muestra si venimos de un registro exitoso) */}
          {location.state?.message && !isRegister && !error && (
            <div className="mb-6 p-4 bg-emerald-50 rounded-2xl flex items-start gap-3 text-emerald-700 text-[11px] font-medium border border-emerald-100 animate-in fade-in slide-in-from-top-2 duration-700">
              <CheckCircle2 size={16} className="shrink-0 mt-0.5" />
              <span>{location.state.message}</span>
            </div>
          )}

          {/* MENSAJE DE ERROR */}
          {error && (
            <div className="mb-6 p-4 bg-red-50 rounded-2xl flex items-center gap-3 text-red-600 text-[11px] font-medium border border-red-100">
              <AlertCircle size={16} />
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className={`grid ${isRegister ? 'md:grid-cols-2' : 'grid-cols-1'} gap-4`}>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-300" size={18} />
                <input name="email" type="email" placeholder="Email" required value={formData.email} onChange={handleChange}
                  className="w-full bg-stone-50 border-none rounded-2xl py-4 pl-12 pr-4 text-sm focus:ring-2 focus:ring-orange-500/20 outline-none" />
              </div>

              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-300" size={18} />
                <input name="password" type={showPassword ? "text" : "password"} placeholder="Contraseña" required value={formData.password} onChange={handleChange}
                  className="w-full bg-stone-50 border-none rounded-2xl py-4 pl-12 pr-12 text-sm focus:ring-2 focus:ring-orange-500/20 outline-none" />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600 transition-colors cursor-pointer">
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>

              {isRegister && (
                <>
                  <div className="relative">
                    <UserIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-300" size={18} />
                    <input name="username" type="text" placeholder="Usuario" required value={formData.username} onChange={handleChange}
                      className="w-full bg-stone-50 border-none rounded-2xl py-4 pl-12 pr-4 text-sm focus:ring-2 focus:ring-orange-500/20 outline-none" />
                  </div>
                  <div className="relative">
                    <Building2 className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-300" size={18} />
                    <input name="razon_social" type="text" placeholder="Razón Social" required value={formData.razon_social} onChange={handleChange}
                      className="w-full bg-stone-50 border-none rounded-2xl py-4 pl-12 pr-4 text-sm focus:ring-2 focus:ring-orange-500/20 outline-none" />
                  </div>
                  <div className="relative">
                    <Hash className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-300" size={18} />
                    <input name="cuit" type="text" placeholder="CUIT" required value={formData.cuit} onChange={handleChange}
                      className="w-full bg-stone-50 border-none rounded-2xl py-4 pl-12 pr-4 text-sm focus:ring-2 focus:ring-orange-500/20 outline-none" />
                  </div>
                  <div className="relative">
                    <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-300" size={18} />
                    <input name="telefono" type="text" placeholder="Teléfono" value={formData.telefono} onChange={handleChange}
                      className="w-full bg-stone-50 border-none rounded-2xl py-4 pl-12 pr-4 text-sm focus:ring-2 focus:ring-orange-500/20 outline-none" />
                  </div>
                </>
              )}
            </div>

            <button disabled={loading} className="w-full bg-stone-900 hover:bg-stone-800 disabled:bg-stone-300 text-white py-4 rounded-2xl font-bold uppercase tracking-[0.2em] text-[10px] transition-all duration-300 flex items-center justify-center gap-3 shadow-lg mt-4 cursor-pointer">
              {loading ? 'Procesando...' : (isRegister ? 'Registrarme' : 'Entrar')}
              {!loading && <ArrowRight size={14} />}
            </button>
          </form>

          <div className="mt-8 text-center">
            <button onClick={() => { setIsRegister(!isRegister); setError(null); }} className="text-[10px] uppercase tracking-widest text-stone-400 hover:text-stone-900 font-bold transition-colors cursor-pointer">
              {isRegister ? '¿Ya sos cliente? Iniciá sesión' : '¿No tenés cuenta? Registrate'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;