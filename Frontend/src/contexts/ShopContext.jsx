import { createContext, useContext, useEffect, useState } from "react";
import useFetch from "../useFetch";

const ShopContext = createContext();
const useShopContext = () => useContext(ShopContext);

export default useShopContext;

export function ShopProvider({ children }) {
  // WISHLIST
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

  // CART
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

  // SEARCH
  const { data } = useFetch(
    "https://ecommerce-site-backend-virid.vercel.app/api/products"
  );
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);
  const filterProducts = (query) => {
    setSearchQuery(query);
    if (!query) {
      setFilteredProducts([]);
    } else {
      const filtered = data?.filter((product) =>
        product.name.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredProducts(filtered);
    }
  };

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
        filterProducts,
        filteredProducts,
      }}
    >
      {children}
    </ShopContext.Provider>
  );
}
