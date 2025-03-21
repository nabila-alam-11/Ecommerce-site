import { useParams, Link } from "react-router-dom";
import Nav from "../components/Nav";
import useFetch from "../useFetch";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTruck,
  faVault,
  faMoneyBill1,
  faRotateBack,
} from "@fortawesome/free-solid-svg-icons";
import ShimmerCategoryPage from "../components/ShimmerCategory";
import useShopContext from "../contexts/ShopContext";

const ProductDetail = () => {
  const { toggleWishlist, wishlist, addToCart } = useShopContext();
  const { data, loading, error } = useFetch(
    `https://ecommerce-site-backend-virid.vercel.app/api/products`
  );

  const { productId } = useParams();
  const productDetails = data?.find((product) => product._id === productId);
  const discountedPrice = Math.round(
    productDetails?.price -
      (productDetails?.price * productDetails?.discount) / 100
  );

  const getRandomProducts = (products, num) => {
    const shuffled = [...products].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, num);
  };
  return (
    <>
      <Nav />
      <main style={{ paddingInline: "8rem" }} className="my-4">
        {!loading ? (
          <div className="bg-white">
            {productDetails && (
              <div className="d-flex bg-white p-4 gap-5">
                <div style={{ width: "30%" }}>
                  <img className="img-fluid" src={productDetails.img[0]} />
                  <button
                    className="btn btn-light mt-3 border"
                    style={{ width: "27rem" }}
                    onClick={(e) => {
                      e.preventDefault();
                      toggleWishlist(productDetails._id);
                    }}
                  >
                    {wishlist.includes(productDetails._id)
                      ? "Remove from wishlist"
                      : "Add to wishlist"}
                  </button>
                  <br />
                  <button
                    className="btn btn-secondary my-3"
                    style={{ width: "27rem" }}
                    onClick={(e) => {
                      e.preventDefault();
                      addToCart(productDetails);
                    }}
                  >
                    Add to Bag
                  </button>
                </div>
                <div style={{ width: "70%" }}>
                  <h4>{productDetails.brand}</h4>
                  <p className="fs-5 text">{productDetails.name}</p>
                  <span
                    className="border py-1 px-4 fs-5 text"
                    style={{ fontSize: "1.2rem" }}
                  >
                    {productDetails.rating}{" "}
                    <span className="text-dark" style={{ fontSize: "1.2rem" }}>
                      {" "}
                      ★
                    </span>
                  </span>
                  {productDetails?.discount > 0 ? (
                    <>
                      <h4 className="pt-4 pb-1">
                        ₹{discountedPrice}{" "}
                        <span
                          style={{
                            color: "green",
                            fontSize: "1.4rem",
                          }}
                        >
                          {productDetails?.discount}% Off
                        </span>
                      </h4>
                      <p
                        className="fs-5 text text-secondary mb-4"
                        style={{ letterSpacing: "1px", fontWeight: "500" }}
                      >
                        MRP ₹
                        <span style={{ textDecoration: "line-through" }}>
                          {productDetails?.price}
                        </span>
                      </p>
                    </>
                  ) : (
                    <h3 className="my-4">₹{productDetails?.price}</h3>
                  )}
                  <div className="d-flex align-items-center">
                    <h5 className="me-3">Quantity:</h5>
                    <div className="d-flex align-items-center gap-3">
                      <p
                        className="rounded-circle border text-center d-flex align-items-center justify-content-center"
                        style={{
                          width: "2rem",
                          height: "2rem",
                          cursor: "pointer",
                          userSelect: "none",
                          fontSize: "1.2rem",
                        }}
                      >
                        –
                      </p>
                      <span
                        className="border text-center d-flex justify-content-center"
                        style={{
                          width: "2rem",
                          height: "2rem",
                          fontSize: "1.2rem",
                        }}
                      >
                        1
                      </span>
                      <p
                        className="rounded-circle border text-center d-flex align-items-center justify-content-center"
                        style={{
                          width: "2rem",
                          height: "2rem",
                          cursor: "pointer",
                          userSelect: "none",
                          fontSize: "1.2rem",
                        }}
                      >
                        +
                      </p>
                    </div>
                  </div>
                  <div className="d-flex my-3">
                    <h5>Size: </h5>
                    {productDetails?.size?.map((product) => {
                      const isNumberRange = /^\d+(-\d+)?$/.test(product);
                      return (
                        <p
                          key={product}
                          className="border rounded text-center d-flex justify-content-center ms-3 pe-2 ps-2"
                          style={{ fontSize: "1.1rem" }}
                        >
                          {isNumberRange ? product + " years" : product}
                        </p>
                      );
                    })}
                  </div>
                  <hr />
                  <div className="d-flex">
                    <div className="me-4 text-center">
                      <div
                        style={{ width: "5rem", height: "5rem" }}
                        className="bg-light rounded-circle mb-2 align-items-center d-flex justify-content-center"
                      >
                        <FontAwesomeIcon
                          icon={faRotateBack}
                          style={{ fontSize: "2rem" }}
                        />
                      </div>
                      <p style={{ width: "5rem" }}>10 days Returnable</p>
                    </div>
                    <div style={{ width: "5rem" }} className="me-4 text-center">
                      <div
                        style={{ width: "5rem", height: "5rem" }}
                        className="bg-light rounded-circle mb-2 align-items-center d-flex justify-content-center"
                      >
                        <FontAwesomeIcon
                          icon={faMoneyBill1}
                          style={{ fontSize: "2rem" }}
                        />
                      </div>
                      <p>Pay on Delivery</p>
                    </div>
                    <div style={{ width: "5rem" }} className="me-4 text-center">
                      <div
                        style={{ width: "5rem", height: "5rem" }}
                        className="bg-light rounded-circle mb-2 align-items-center d-flex justify-content-center"
                      >
                        <FontAwesomeIcon
                          icon={faTruck}
                          style={{ fontSize: "2rem" }}
                        />
                      </div>
                      <p>Free Delivery</p>
                    </div>
                    <div style={{ width: "5rem" }} className="me-4 text-center">
                      <div
                        style={{ width: "5rem", height: "5rem" }}
                        className="bg-light rounded-circle mb-2 align-items-center d-flex justify-content-center"
                      >
                        {" "}
                        <FontAwesomeIcon
                          icon={faVault}
                          style={{ fontSize: "2rem" }}
                        />
                      </div>
                      <p>Secure Payment</p>
                    </div>
                  </div>
                  <hr />
                  <div className="py-4">
                    <h5>Description</h5>
                    <ul>
                      {productDetails?.description?.map((detail, index) => (
                        <li key={index}>{detail}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            )}
            <div className="my-4 pe-4 ps-4 pb-5">
              <hr />

              <h3>More items you may like</h3>
              <div className="row gap-5 my-4">
                {data &&
                  getRandomProducts(data, 4).map((product) => (
                    <div
                      className="col-12 col-md-3 col-lg-6"
                      key={product._id}
                      style={{ width: "19rem" }}
                    >
                      <Link
                        to={`/product/${product._id}`}
                        className="text-decoration-none"
                      >
                        <div className="card position-relative">
                          <p
                            className="position-absolute bg-white text-center rating"
                            style={{ width: "3rem" }}
                          >
                            {product.rating}{" "}
                            <span style={{ color: "green" }}>★</span>
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
                            <button className="btn btn-primary">
                              Add to Cart
                            </button>
                          </div>
                        </div>
                      </Link>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        ) : (
          <ShimmerCategoryPage />
        )}
      </main>
    </>
  );
};
export default ProductDetail;
