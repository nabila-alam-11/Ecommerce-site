import { useParams, Link } from "react-router-dom";
import { useState } from "react";
import useFetch from "../useFetch";
import useShopContext from "../contexts/ShopContext";
import Nav from "../components/Nav";
import ShimmerCategory from "../components/ShimmerCategory";

const CategoryPage = () => {
  const { data: categoryData } = useFetch(
    `https://ecommerce-site-backend-virid.vercel.app/api/categories`
  );
  const { data: productData, loading: productLoading } = useFetch(
    `https://ecommerce-site-backend-virid.vercel.app/api/products`
  );
  const { wishlist, toggleWishlist, addToCart } = useShopContext();
  const { categoryId } = useParams();

  const categoryDetail = categoryData?.find(
    (category) => category._id === categoryId
  );

  const categoryProducts = productData?.filter(
    (product) => product.category._id === categoryId
  );

  // Filter and Sorting
  const [maxPrice, setMaxPrice] = useState(10200);
  const [minRating, setMinRating] = useState(0);
  const [sortByPrice, setSortByPrice] = useState("");
  const [filterByBrand, setFilterByBrand] = useState([]);

  const minProductPrice =
    productData?.length > 0
      ? Math.min(...productData.map((product) => product.price))
      : 0;

  const maxProductPrice =
    productData?.length > 0
      ? Math.max(...productData.map((product) => product.price))
      : maxPrice;

  const filteredProducts = productData
    ?.filter((product) => product.category._id === categoryId)
    .filter((product) => product.price <= maxPrice)
    .filter((product) => product.rating >= minRating)
    .filter((product) =>
      filterByBrand.length > 0 ? filterByBrand.includes(product.brand) : true
    );

  const sortedProducts = [...(filteredProducts || [])]?.sort((a, b) => {
    if (sortByPrice === "low") return a.price - b.price;
    if (sortByPrice === "high") return b.price - a.price;
    return 0;
  });

  const uniqueBrands = [
    ...new Set(categoryProducts?.map((product) => product.brand)),
  ];

  const brandChangeHandler = (event) => {
    const { checked, value } = event.target;
    setFilterByBrand((prevValues) =>
      checked ? [...prevValues, value] : prevValues.filter((b) => b !== value)
    );
  };

  const clearFilters = () => {
    setMaxPrice(10200);
    setMinRating(0);
    const ratingsInput = document.getElementsByName("rating");
    ratingsInput.forEach((input) => (input.checked = false));
    const sortingsInput = document.getElementsByName("sort");
    sortingsInput.forEach((input) => (input.checked = false));
    const brandsInput = document.querySelectorAll("input[type='checkbox']");
    brandsInput.forEach((input) => (input.checked = false));
    setFilterByBrand([]);
  };

  // Toast
  const [productAddededToCart, setProductAddedToCart] = useState(false);

  return (
    <>
      <Nav />
      {productAddededToCart && (
        <p
          style={{
            background: "black",
            color: "white",
            width: "12rem",
            paddingInline: "5px",
            textAlign: "center",
            borderRadius: "3px",
            paddingBlock: "2px",
            justifySelf: "end",
            marginRight: "1rem",
          }}
        >
          Product added to cart
        </p>
      )}
      {!productLoading ? (
        <main>
          <div className="d-flex">
            <div
              style={{
                width: "25%",
                background: "white",
                paddingInline: "5rem",
                paddingBlock: "2rem",
              }}
            >
              <div className="d-flex justify-content-between pb-4">
                <h4>Filters</h4>
                <button
                  type="button"
                  onClick={clearFilters}
                  style={{
                    background: "white",
                    outline: "none",
                    border: "1px solid white",
                    textDecoration: "underline",
                  }}
                >
                  Clear
                </button>
              </div>
              <label className="form-label">
                <strong>Price: </strong>
              </label>
              <br />
              <input
                type="range"
                className="form-change"
                min={minProductPrice}
                max={maxProductPrice}
                value={maxPrice}
                onChange={(e) => setMaxPrice(e.target.value)}
                style={{ width: "10rem", accentColor: "gray" }}
              />
              <h6 className="mb-5">
                ₹{minProductPrice} to ₹{maxPrice}
              </h6>
              <label className="form-label">
                <strong>Rating: </strong>
              </label>
              <br />
              <label htmlFor="4S">
                <input
                  type="radio"
                  id="4S"
                  name="rating"
                  value="4"
                  onChange={(e) => setMinRating(e.target.value)}
                />{" "}
                4 Stars & above
              </label>
              <br />
              <label htmlFor="3S">
                <input
                  type="radio"
                  id="3S"
                  name="rating"
                  value="3"
                  onChange={(e) => setMinRating(e.target.value)}
                />{" "}
                3 Stars & above
              </label>
              <br />
              <label htmlFor="2S">
                <input
                  type="radio"
                  id="2S"
                  name="rating"
                  value="2"
                  onChange={(e) => setMinRating(e.target.value)}
                />{" "}
                2 Stars & above
              </label>
              <br />
              <label htmlFor="1S" className="mb-4">
                <input
                  type="radio"
                  id="1S"
                  name="rating"
                  value="1"
                  onChange={(e) => setMinRating(e.target.value)}
                />{" "}
                1 Star & above
              </label>
              <br />
              <label className="form-label">
                <strong>Sort By: </strong>
              </label>
              <br />
              <label htmlFor="low">
                <input
                  type="radio"
                  id="low"
                  name="sort"
                  value="low"
                  onChange={(e) => setSortByPrice(e.target.value)}
                />
                Price - Low to High
              </label>
              <label htmlFor="high">
                <input
                  type="radio"
                  id="high"
                  name="sort"
                  value="high"
                  onChange={(e) => setSortByPrice(e.target.value)}
                />
                Price - High to Low
              </label>
              <br />
              <label className="form-label mt-4">
                <strong>Brand: </strong>
              </label>
              <br />

              {uniqueBrands.map((brand) => (
                <>
                  <label htmlFor="brand">
                    <input
                      type="checkbox"
                      value={brand}
                      id={`brand-${brand}`}
                      onChange={brandChangeHandler}
                    />
                    &nbsp;{brand}
                  </label>
                  <br />
                </>
              ))}
              <br />
            </div>
            <div
              className="bg-light"
              style={{
                width: "75%",

                paddingInline: "5rem",
                paddingBlock: "2rem",
              }}
            >
              <h3 className="pb-4">
                Buy{" "}
                {categoryDetail?.name === "Women" ||
                categoryDetail?.name === "Men"
                  ? categoryDetail?.name + `'s`
                  : categoryDetail?.name}{" "}
                Collection Online{" "}
                <span className="text-secondary fs-6 text">
                  ({sortedProducts?.length} Items)
                </span>
              </h3>
              <div className="row gap-4">
                {sortedProducts?.map((product) => {
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
                            <button
                              className="btn btn-primary"
                              onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                addToCart(product);
                                setProductAddedToCart(true);
                                setTimeout(() => {
                                  setProductAddedToCart(false);
                                }, 1000);
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
            </div>
          </div>
        </main>
      ) : (
        <ShimmerCategory />
      )}
    </>
  );
};
export default CategoryPage;
