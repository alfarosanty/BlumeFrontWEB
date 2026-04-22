import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Mail, Lock, User as UserIcon, ArrowRight } from 'lucide-react';

const Login = () => {
  const [isRegister, setIsRegister] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulamos el ingreso
    login({ username: 'Fran', email: 'fran@example.com' });
    navigate('/presupuesto'); // Lo mandamos de vuelta a terminar su pedido
  };

  return (
    <div className="min-h-screen bg-[#faf9f6] flex items-center justify-center p-6">
      <div className="max-w-md w-full bg-white rounded-3xl shadow-xl border border-stone-100 overflow-hidden">
        <div className="p-10">
          <h2 className="text-3xl font-serif font-bold text-stone-900 mb-2">
            {isRegister ? 'Crear cuenta.' : 'Bienvenido.'}
          </h2>
          <p className="text-stone-400 text-xs uppercase tracking-widest mb-8">
            {isRegister ? 'Registrate para gestionar tus presupuestos' : 'Ingresá a tu cuenta de Blume'}
          </p>

          <form onSubmit={handleSubmit} className="space-y-5">
            {isRegister && (
              <div className="relative">
                <UserIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-300" size={18} />
                <input 
                  type="text" 
                  placeholder="Nombre de usuario"
                  className="w-full bg-stone-50 border-none rounded-2xl py-4 pl-12 pr-4 text-sm focus:ring-2 focus:ring-orange-500/20 transition-all"
                />
              </div>
            )}

            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-300" size={18} />
              <input 
                type="email" 
                placeholder="Email"
                className="w-full bg-stone-50 border-none rounded-2xl py-4 pl-12 pr-4 text-sm focus:ring-2 focus:ring-orange-500/20 transition-all"
              />
            </div>

            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-300" size={18} />
              <input 
                type="password" 
                placeholder="Contraseña"
                className="w-full bg-stone-50 border-none rounded-2xl py-4 pl-12 pr-4 text-sm focus:ring-2 focus:ring-orange-500/20 transition-all"
              />
            </div>

            <button className="w-full bg-stone-900 hover:bg-orange-600 text-white py-4 rounded-2xl font-bold uppercase tracking-[0.2em] text-[11px] transition-all duration-500 flex items-center justify-center gap-3 shadow-lg">
              {isRegister ? 'Registrarse' : 'Iniciar Sesión'}
              <ArrowRight size={14} />
            </button>
          </form>

          <div className="mt-8 text-center">
            <button 
              onClick={() => setIsRegister(!isRegister)}
              className="text-[10px] uppercase tracking-widest text-stone-400 hover:text-stone-900 font-bold transition-colors"
            >
              {isRegister ? '¿Ya tenés cuenta? Ingresá' : '¿No tenés cuenta? Create una'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;