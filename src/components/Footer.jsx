import { Link } from 'react-router-dom';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#0f0f0f] text-stone-400 pt-20 pb-10 border-t border-stone-800">
      <div className="max-w-400 mx-auto px-6 md:px-12">
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-8">
          
          {/* Columna 1: Branding (Ocupa más espacio en desktop) */}
          <div className="md:col-span-4 space-y-6">
            <h2 className="text-white text-3xl font-serif tracking-[0.15em] mb-4">BLUME</h2>
            <p className="text-[11px] md:text-xs uppercase tracking-[0.2em] leading-relaxed text-stone-500 max-w-xs">
              Diseño y fabricación textil de alta gama. <br /> 
              Estética atemporal para espacios contemporáneos.
            </p>
          </div>

          {/* Espaciador para Desktop */}
          <div className="hidden md:block md:col-span-1"></div>

          {/* Columna 2: Navegación */}
          <div className="md:col-span-2">
            <h3 className="text-white font-bold mb-8 uppercase text-[10px] tracking-[0.3em]">Empresa</h3>
            <ul className="space-y-4 text-[11px] uppercase tracking-widest">
              <li><Link to="/nosotros" className="hover:text-white transition-colors duration-300">Sobre Nosotros</Link></li>
              <li><Link to="/politicas" className="hover:text-white transition-colors duration-300">Políticas</Link></li>
              <li><Link to="/pagos" className="hover:text-white transition-colors duration-300">Pagos</Link></li>
            </ul>
          </div>

          {/* Columna 3: Soporte */}
          <div className="md:col-span-2">
            <h3 className="text-white font-bold mb-8 uppercase text-[10px] tracking-[0.3em]">Asistencia</h3>
            <ul className="space-y-4 text-[11px] uppercase tracking-widest">
              <li><a href="#" className="hover:text-white transition-colors duration-300">F.A.Q.</a></li>
              <li><a href="#" className="hover:text-white transition-colors duration-300">Contacto</a></li>
              <li><a href="#" className="hover:text-white transition-colors duration-300">Envíos</a></li>
            </ul>
          </div>

          {/* Columna 4: Contacto */}
          <div className="md:col-span-3">
            <h3 className="text-white font-bold mb-8 uppercase text-[10px] tracking-[0.3em]">Contacto</h3>
            <div className="space-y-4 text-[11px] uppercase tracking-[0.15em]">
              <p className="text-stone-500">WhatsApp <span className="text-stone-300 ml-2">+54 11 XXXX . XXXX</span></p>
              <p className="text-stone-500">Showroom <span className="text-stone-300 ml-2">Bs. As. Argentina</span></p>
            </div>
          </div>
        </div>

        {/* Línea final - Estilo MAF System */}
        <div className="border-t border-stone-800/50 mt-20 pt-10 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex gap-8 text-[9px] uppercase tracking-[0.4em] font-medium">
            <span className="text-stone-600">© {currentYear} Blume Textil</span>
            <span className="text-stone-800 hidden md:inline">|</span>
            <span className="text-stone-600">All rights reserved</span>
          </div>
          
          <div className="flex items-center gap-4">
             <span className="text-[8px] uppercase tracking-[0.5em] text-stone-700 italic">Desarrollado por</span>
             <span className="text-[9px] uppercase tracking-[0.3em] text-stone-400 font-bold border border-stone-800 px-3 py-1">
                ALFA SOLUCIONES
             </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;