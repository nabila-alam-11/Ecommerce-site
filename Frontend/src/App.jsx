import { Link, useParams } from "react-router-dom";
import useFetch from "./useFetch";
import Nav from "./components/Nav";
import Shimmer from "./components/Shimmer";
import img1 from "../src/assets/images/main-img-1.jpg";
import img2 from "../src/assets/images/main-img-2.jpg";
import img3 from "../src/assets/images/main-img-3.jpg";
import Footer from "./components/Footer";

const App = () => {
  const {
    data: categories,
    error: categoryError,
    loading: categoryLoading,
  } = useFetch(
    `https://ecommerce-site-backend-virid.vercel.app/api/categories`
  );
  const {
    data: products,
    error: productError,
    loading: productLoading,
  } = useFetch(
    `https://ecommerce-site-backend-virid.vercel.app/api/categories`
  );
  return (
    <>
      <Nav />
      {categoryLoading ? (
        <Shimmer />
      ) : (
        <main className="my-4" style={{ marginInline: "6rem" }}>
          <div className="row my-4">
            {categories?.map((category) => (
              <div
                className="col-12 col-md-4 position-relative mb-3"
                key={category._id}
              >
                <Link to={`/category/${category._id}`}>
                  <img
                    src={category?.img}
                    className="img-fluid"
                    style={{ width: "30rem" }}
                  />
                </Link>
                <p
                  className="category-text text-black bg-white  position-absolute top-50 start-10 text-center"
                  style={{ width: "30rem" }}
                >
                  {category.name}
                </p>
              </div>
            ))}
          </div>
          <div id="carouselExample" class="carousel slide">
            <div class="carousel-inner">
              <div class="carousel-item active">
                <img
                  src={img3}
                  className="img-fluid cover mt-2 mb-4"
                  style={{
                    width: "100rem",
                    maxWidth: "100%",
                    height: "35rem",
                    maxHeight: "100%",
                    objectFit: "cover",
                  }}
                  alt="..."
                />
              </div>
              <div class="carousel-item">
                <img
                  src={img2}
                  className="img-fluid cover mt-2 mb-4"
                  style={{
                    width: "100rem",
                    maxWidth: "100%",
                    height: "35rem",
                    maxHeight: "100%",
                    objectFit: "cover",
                  }}
                  alt="..."
                />
              </div>
              <div class="carousel-item">
                <img
                  src={img1}
                  className="img-fluid cover mt-2 mb-4"
                  style={{
                    width: "100rem",
                    maxWidth: "100%",
                    height: "35rem",
                    maxHeight: "100%",
                    objectFit: "cover",
                  }}
                  alt="..."
                />
              </div>
            </div>
            <button
              class="carousel-control-prev"
              type="button"
              data-bs-target="#carouselExample"
              data-bs-slide="prev"
            >
              <span
                class="carousel-control-prev-icon"
                aria-hidden="true"
              ></span>
              <span class="visually-hidden">Previous</span>
            </button>
            <button
              class="carousel-control-next"
              type="button"
              data-bs-target="#carouselExample"
              data-bs-slide="next"
            >
              <span
                class="carousel-control-next-icon"
                aria-hidden="true"
              ></span>
              <span class="visually-hidden">Next</span>
            </button>
          </div>

          <div className="row">
            <div className="col-12  col-lg-6 collection mb-3">
              <div className="d-flex">
                <img
                  src="https://img.freepik.com/free-photo/smiling-attractive-man-summer-clothes-holding-coconut-cocktail_171337-19030.jpg?t=st=1741670063~exp=1741673663~hmac=21b310fe654823754df82181c8374c078102c67798221963b250faf7ff8f9023&w=1380"
                  className="img-fluid pe-4"
                  style={{
                    width: "8rem",
                    height: "9.5rem",
                    objectFit: "cover",
                  }}
                />
                <div>
                  <h6 className="pb-4">NEW ARRIVALS</h6>
                  <p style={{ fontSize: "1.5rem" }}>
                    <strong>Summer Collection</strong>
                  </p>
                  <p style={{ width: "25rem" }}>
                    Check out our best summer collection to stay warm in style
                    this season.
                  </p>
                </div>
              </div>
            </div>
            <div className="col-12  col-lg-6 collection mb-3">
              <div className="d-flex">
                <img
                  src="https://img.freepik.com/free-photo/portrait-azeri-woman-traditional-dress-with-semeni-red_140725-148780.jpg?t=st=1741671851~exp=1741675451~hmac=373bc88c927bc81c122da3bfc01580b82bcaa9d4c6d58ac04133cf3cf58643f3&w=1380"
                  className="img-fluid pe-4"
                  style={{
                    width: "8rem",
                    height: "9.5rem",
                    objectFit: "cover",
                  }}
                />
                <div>
                  <h6 className="pb-4">EID EXCLUSIVE ARRIVALS</h6>
                  <p style={{ fontSize: "1.5rem" }}>
                    <strong>Festive Elegance Collection</strong>
                  </p>
                  <p style={{ width: "25rem" }}>
                    Celebrate Eid in style with our finest traditional and
                    contemporary outfits.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </main>
      )}
      <Footer />
    </>
  );
};
export default App;
