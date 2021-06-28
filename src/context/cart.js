import React, { createContext, useContext, useState } from 'react';

const CartContext = createContext();

function CartProvider({ children }) {
  const [cart, setCart] = useState([]);

  const cartTotalPrice = cart.reduce((accumPrice, { price }) => accumPrice + price, 0);

  const addToCart = (product) => setCart((currentCart) => [...currentCart, product]);

  const cartQuantityOfItem = (id) => cart.filter((product) => product.id === id).length;

  const removeSigleFromCart = (product) => {
    setCart((currentCart) => {
      const indexOfItemToRemove = currentCart.findIndex((cartItem) => cartItem.id === product.id);

      if (indexOfItemToRemove === -1) {
        return currentCart;
      }

      return [
        ...currentCart.slice(0, indexOfItemToRemove),
        ...currentCart.slice(indexOfItemToRemove + 1),
      ];
    });
  };

  const removeItemFromCart = (product) => {
    const newCart = cart.filter((cartItem) => cartItem.id !== product.id);
    setCart(newCart);
  };

  const cleanCart = () => setCart([]);
  const uniqueProduct = (product) => Array.from(new Set(product));

  return (
    <CartContext.Provider value={{
      cart,
      addToCart,
      cartQuantityOfItem,
      cartTotalPrice,
      removeItemFromCart,
      removeSigleFromCart,
      cleanCart,
    }}>
      {children}
    </CartContext.Provider>
  );
}

const useCart = () => useContext(CartContext);

export { CartProvider, useCart };