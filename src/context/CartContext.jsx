import { createContext, useState, useContext, useEffect } from 'react';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {

  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem('blume_cart');
    return savedCart ? JSON.parse(savedCart) : [];
  });

  const [isCartOpen, setIsCartOpen] = useState(false);

  const openCart = () => setIsCartOpen(true);
  const closeCart = () => setIsCartOpen(false);

  useEffect(() => {
    localStorage.setItem('blume_cart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = (itemNuevo, cantidadElegida = 1) => {
    setCart(prevCart => {
      const exists = prevCart.find(item => item.id_articulo === itemNuevo.id_articulo);
      
      if (exists) {
        return prevCart.map(item => 
          item.id_articulo === itemNuevo.id_articulo 
            ? { 
                ...item, 
                cantidad: item.cantidad + cantidadElegida,
                subtotal: (item.cantidad + cantidadElegida) * item.precio_unitario 
              }
            : item
        );
      }

      return [...prevCart, itemNuevo];
    });
  };

  const updateQuantity = (id_articulo, nuevaCantidad) => {
    if (nuevaCantidad < 1) return;
    setCart(prevCart => 
      prevCart.map(item => 
        item.id_articulo === id_articulo 
          ? { ...item, cantidad: nuevaCantidad, subtotal: nuevaCantidad * item.precio_unitario }
          : item
      )
    );
  };

  const removeFromCart = (id) => {
    setCart(prevCart => prevCart.filter(item => item.id_articulo !== id));
  };

  const clearCart = () => setCart([]);

  const totalItems = cart.reduce((acc, item) => acc + item.cantidad, 0);
  const totalPrecio = cart.reduce((acc, item) => acc + item.subtotal, 0);

  return (
    <CartContext.Provider value={{ 
      cart,
      addToCart, 
      updateQuantity, 
      removeFromCart, 
      clearCart, 
      totalItems, 
      totalPrecio,
      isCartOpen, 
      openCart, 
      closeCart
    }}>
      {children}
    </CartContext.Provider>
  );
};