import { createContext, useContext, useEffect, useState } from "react";

const ShopContext = createContext();
const useShopContext = () => useContext(ShopContext);

export default useShopContext;

export function ShopProvider({ children }) {
  const [wishlist, setWishlist] = useState(() => {
    return JSON.parse(localStorage.getItem("wishlist")) || [];
  });

  useEffect(() => {
    localStorage.setItem("wishlist", JSON.stringify(wishlist));
  }, [wishlist]);
  const toggleWishlist = (productId) => {
    setWishlist((prevWishlist) => {
      if (prevWishlist.includes(productId)) {
        return prevWishlist.filter((id) => id !== productId);
      } else {
        return [...prevWishlist, productId];
      }
    });
  };
  const removeItemFromWishlist = (productId) => {
    setWishlist((prevWishlist) => {
      return prevWishlist.filter((id) => id !== productId);
    });
  };

  const [cart, setCart] = useState(() => {
    return JSON.parse(localStorage.getItem("cart")) || [];
  });

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product) => {
    setCart((prevCart) => {
      const existingProduct = prevCart.find((item) => item._id === product._id);
      if (existingProduct) {
        return prevCart.map((item) =>
          item._id === product._id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...prevCart, { ...product, quantity: 1 }];
      }
    });
  };

  const updateCartQuantity = (productId, newQuantity) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item._id === productId ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const removeFromCart = (productId) => {
    setCart((prevCart) => prevCart.filter((item) => item._id !== productId));
  };

  // Search
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <ShopContext.Provider
      value={{
        wishlist,
        toggleWishlist,
        removeItemFromWishlist,
        addToCart,
        cart,
        removeFromCart,
        updateCartQuantity,
        searchQuery,
        setSearchQuery,
      }}
    >
      {children}
    </ShopContext.Provider>
  );
}
