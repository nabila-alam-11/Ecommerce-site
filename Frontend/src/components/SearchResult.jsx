import { useEffect, useState } from "react";
import useShopContext from "../contexts/ShopContext";

const SearchResult = () => {
  const { searchQuery } = useShopContext(); // Get searchQuery from ShopProvider
  const [products, setProducts] = useState([]);

  useEffect(() => {
    if (searchQuery) {
      fetch(
        `https://ecommerce-site-backend-virid.vercel.app/api/products?search=${searchQuery}`
      )
        .then((res) => res.json())
        .then((data) => setProducts(data))
        .catch((err) => console.error(err));
    }
  }, [searchQuery]);

  return (
    <div>
      <h2 className="text-xl font-semibold my-4">
        Search Results for "{searchQuery}"
      </h2>
      <div className="grid grid-cols-3 gap-4">
        {products.length > 0 ? (
          products.map((product) => (
            <div key={product._id} className="border p-4 rounded">
              <h3 className="text-lg">{product.name}</h3>
              <p>{product.price} USD</p>
            </div>
          ))
        ) : (
          <p>No products found.</p>
        )}
      </div>
    </div>
  );
};

export default SearchResult;
