import { useState } from "react";
import Nav from "../components/Nav";
import useShopContext from "../contexts/ShopContext";
import useFetch from "../useFetch";
import { Link } from "react-router-dom";

const Wishlist = () => {
  const { wishlist, removeItemFromWishlist, addToCart } = useShopContext();
  const { data, loading } = useFetch(
    "https://ecommerce-site-backend-virid.vercel.app/api/products"
  );
  const [success, setSuccess] = useState(false);

  // Ensure wishlistProducts is always an array
  const wishlistProducts =
    data?.filter((product) => wishlist.includes(product._id)) || [];
  const [successMessage, setSuccessMessage] = useState(false);
  return (
    <>
      <Nav />
      <main className="bg-light my-5" style={{ marginInline: "20rem" }}>
        <h3 className="mb-4">
          My Wishlist{" "}
          <span style={{ fontSize: "1rem", color: "grey" }}>
            • {wishlist.length} {wishlist.length > 1 ? "products" : "product"}
          </span>
        </h3>
        {loading && <p>Loading...</p>}
        {successMessage && (
          <p className="p-2  bg-success-subtle text-success">
            Item removed from wishlist
          </p>
        )}
        {success && (
          <p
            className="bg-dark text-white p-2 rounded"
            style={{ width: "18rem" }}
          >
            Item moved to cart successfully!
          </p>
        )}
        <div className="row g-4">
          {wishlistProducts.length != 0 &&
            wishlistProducts.map((product) => {
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
                        className="position-absolute fav-icon  bg-white border rounded-circle py-auto"
                        style={{ width: "2rem", height: "2rem" }}
                        onClick={(e) => {
                          e.preventDefault();
                          removeItemFromWishlist(product._id);
                          setSuccessMessage(true);
                          setTimeout(() => {
                            setSuccessMessage(false);
                          }, 1000);
                        }}
                      >
                        ✕
                      </button>
                      <p
                        className="position-absolute bg-white text-center rating"
                        style={{ width: "3rem" }}
                      >
                        {product.rating}{" "}
                        <span style={{ color: "green" }}>★</span>
                      </p>
                      <img
                        className="img-fluid card-img-top"
                        src={product.img?.[0] || "default-image-url.jpg"}
                        style={{ height: "20rem" }}
                        alt={product.name}
                      />
                      <div className="card-body">
                        <h6>{product.brand}</h6>
                        <p
                          className="text-truncate"
                          style={{ maxWidth: "100%" }}
                        >
                          {product.name}
                        </p>
                        {product.discount !== 0 ? (
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
                            addToCart(product);
                            removeItemFromWishlist(product._id);
                            setSuccess(true);
                            setTimeout(() => {
                              setSuccess(false);
                            }, 1000);
                          }}
                        >
                          Move to Cart
                        </button>
                      </div>
                    </div>
                  </Link>
                </div>
              );
            })}
          {wishlist.length <= 0 && <p>No items in the wishlist</p>}
        </div>
      </main>
    </>
  );
};

export default Wishlist;
