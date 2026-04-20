import { BrowserRouter } from 'react-router-dom';
import { AppRoutes } from './routes/AppRoutes';
import {Navbar, Footer} from './components';

function App() {
  return (
    <BrowserRouter>
      {/* Este div controla que el Footer siempre sea el final */}
      <div className="flex flex-col min-h-screen text-stone-800 bg-white">
        
        <Navbar />

        {/* El main flex-grow empuja al Footer al fondo del todo */}
        <main className="flex-grow">
          <AppRoutes />
        </main>

        <Footer />
        
      </div>
    </BrowserRouter>
  );
}

export default App;