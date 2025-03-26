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
  const { data: products } = useFetch(
    "https://ecommerce-site-backend-virid.vercel.app/api/products"
  );
  const { data: categoriesData } = useFetch(
    "https://ecommerce-site-backend-virid.vercel.app/api/categories"
  );

  const [categories, setCategories] = useState([]);
  const [allProducts, setAllProducts] = useState([]);

  // Store fetched data in state so it persists across pages
  useEffect(() => {
    if (categoriesData) setCategories(categoriesData);
  }, [categoriesData]);

  useEffect(() => {
    if (products) setAllProducts(products);
  }, [products]);

  const [searchQuery, setSearchQuery] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);

  const filterProducts = (query) => {
    if (!allProducts.length) return;

    query = query.toLowerCase().trim();

    // Define category keywords mapping
    const categoryKeywords = {
      men: ["men", "man", "gent", "gents"],
      women: ["women", "woman", "lady", "ladies"],
      kids: ["kids", "kid", "children", "boys", "girls"],
    };

    let matchedCategory = null;

    // Check if the query contains category keywords
    for (const category in categoryKeywords) {
      if (categoryKeywords[category].some((word) => query.includes(word))) {
        matchedCategory = category; // Store category as lowercase
        break;
      }
    }

    let filtered = allProducts.filter((product) => {
      const productName = product.name.toLowerCase();
      const productCategory = product.category.name.toLowerCase(); // Ensure category name is lowercase

      const nameMatches = query
        .split(" ")
        .some((word) => productName.includes(word));

      if (matchedCategory) {
        // Ensure category name matches expected names from API
        return productCategory.includes(matchedCategory) && nameMatches;
      }

      // If no category detected, search normally by product name
      return nameMatches;
    });

    setFilteredProducts(filtered);
  };

  // ADDRESS

  const [addresses, setAddresses] = useState([]);

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
