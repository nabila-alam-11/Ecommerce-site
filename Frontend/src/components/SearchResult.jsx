import { useEffect, useState } from "react";
import useShopContext from "../contexts/ShopContext";
import Nav from "./Nav";
import { Link } from "react-router-dom";

const SearchResult = () => {
  const { searchQuery, setSearchQuery, wishlist, toggleWishlist } =
    useShopContext(); // Get searchQuery from ShopProvider
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const query = params.get("q");

    if (query) {
      setSearchQuery(query);
      fetch(
        `https://ecommerce-site-backend-virid.vercel.app/api/products/search/result?q=${query}`
      )
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          if (Array.isArray(data)) {
            setProducts(data);
          } else {
            setProducts([]);
          }
        })
        .catch((err) => console.error(err));
    }
  }, [location.search, searchQuery]);

  const upperCaseSearchQuery = searchQuery
    .split("  ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1));

  return (
    <>
      <Nav />
      <main className="py-4 container">
        <h3>
          {upperCaseSearchQuery}{" "}
          <span style={{ fontSize: "1rem" }} className="text-secondary">
            • {products.length} {products.length > 1 ? "Items" : "Item"}
          </span>
        </h3>
        <div className="row gap-4">
          {products?.map((product) => {
            const discountedPrice = Math.round(
              product.price - (product.price * product.discount) / 100
            );

            return (
              <div
                className="col-12 col-md-3"
                key={product._id}
                style={{ width: "16rem" }}
              >
                <Link
                  to={`/product/${product._id}`}
                  className="text-decoration-none"
                >
                  <div className="card position-relative">
                    <button
                      className="position-absolute fav-icon text-danger bg-white border rounded-circle py-auto"
                      style={{ width: "2rem", height: "2rem" }}
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        toggleWishlist(product._id);
                      }}
                    >
                      {wishlist.includes(product._id) ? "♥️" : "🤍"}
                    </button>
                    <p
                      className="position-absolute bg-white text-center rating"
                      style={{ width: "3rem" }}
                    >
                      {product.rating} <span style={{ color: "green" }}>★</span>
                    </p>
                    <img
                      className="img-fluid card-img-top"
                      src={product.img[0]}
                      style={{ height: "20rem" }}
                    />
                    <div className="card-body">
                      <h6>{product.brand}</h6>
                      <p
                        className="text-truncate "
                        style={{ maxWidth: "100%" }}
                      >
                        {product.name}
                      </p>
                      {product.discount != 0 ? (
                        <p>
                          ₹ {discountedPrice}{" "}
                          <span className="text-decoration-line-through text-secondary">
                            ₹ {product.price}
                          </span>{" "}
                          <span style={{ color: "green" }}>
                            {product.discount}%
                          </span>
                        </p>
                      ) : (
                        <p>₹ {product.price}</p>
                      )}
                      <button
                        className="btn btn-primary"
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          addToCart(product);
                        }}
                      >
                        Add to Cart
                      </button>
                    </div>
                  </div>
                </Link>
              </div>
            );
          })}
        </div>
      </main>
    </>
  );
};

export default SearchResult;
