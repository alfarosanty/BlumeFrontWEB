import { CartProvider } from './context/CartContext';
import { BrowserRouter } from 'react-router-dom';
import { AppRoutes } from './routes/AppRoutes';
import {Navbar, Footer, CartDrawer} from './components';
import { AuthProvider } from './context/AuthContext';

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <BrowserRouter>
          {/* Este div controla que el Footer siempre sea el final */}
          <div className="flex flex-col min-h-screen text-stone-800 bg-white">
            
            <Navbar />
            <CartDrawer />
            {/* El main flex-grow empuja al Footer al fondo del todo */}
            <main className="grow">
              <AppRoutes />
            </main>

            <Footer />
            
          </div>
        </BrowserRouter>
      </CartProvider>
    </AuthProvider>

  );
}

export default App;