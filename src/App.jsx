import { useState, useEffect } from "react";
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { AppRoutes } from './routes/AppRoutes';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import CartDrawer from './components/CartDrawer';
import { HomeService } from './services/HomeService';
import { CartProvider } from "./context/CartContext";

function App() {
  const [config, setConfig] = useState(null);

  useEffect(() => {
    const fetchConfig = async () => {
      const data = await HomeService.getHomeConfig();
      setConfig(data);
    };
    fetchConfig();
  }, []);

  return (
    <BrowserRouter>
      <AuthProvider>
        <CartProvider>
          <div className="flex flex-col min-h-screen text-stone-800 bg-white">
            
            <Navbar />
            <CartDrawer />

            <main className="grow">
              <AppRoutes config={config} />
            </main>

            <Footer config={config} />
            
          </div>
        </CartProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;