import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-stone-900 text-stone-300 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12">
        
        {/* Columna 1: Branding */}
        <div className="space-y-4">
          <h2 className="text-white text-2xl font-serif tracking-widest">BLUME</h2>
          <p className="text-sm text-stone-500">
            Diseño y fabricación textil. Calidad que se siente.
          </p>
        </div>

        {/* Columna 2: Navegación */}
        <div>
          <h3 className="text-white font-medium mb-6 uppercase text-xs tracking-widest">Empresa</h3>
          <ul className="space-y-4 text-sm">
            <li><Link to="/nosotros" className="hover:text-orange-500 transition-colors">Nosotros</Link></li>
            <li><Link to="/politicas" className="hover:text-orange-500 transition-colors">Políticas de Compra</Link></li>
            <li><Link to="/pagos" className="hover:text-orange-500 transition-colors">Medios de Pago</Link></li>
          </ul>
        </div>

        {/* Columna 3: Soporte */}
        <div>
          <h3 className="text-white font-medium mb-6 uppercase text-xs tracking-widest">Ayuda</h3>
          <ul className="space-y-4 text-sm">
            <li><a href="#" className="hover:text-orange-500 transition-colors">Preguntas Frecuentes</a></li>
            <li><a href="#" className="hover:text-orange-500 transition-colors">Contacto</a></li>
            <li><a href="#" className="hover:text-orange-500 transition-colors">Envíos</a></li>
          </ul>
        </div>

        {/* Columna 4: Contacto Real */}
        <div>
          <h3 className="text-white font-medium mb-6 uppercase text-xs tracking-widest">Contacto</h3>
          <p className="text-sm text-stone-500 mb-2">WhatsApp: +54 11 XXXX-XXXX</p>
          <p className="text-sm text-stone-500">Buenos Aires, Argentina</p>
        </div>
      </div>

      <div className="border-t border-stone-800 mt-16 pt-8 text-center text-xs text-stone-600">
        <p>© {new Date().getFullYear()} Blume Textil | Desarrollado por ALFA Soluciones</p>
      </div>
    </footer>
  );
};
export default Footer;