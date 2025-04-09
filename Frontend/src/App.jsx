import { Link } from "react-router-dom";
import useFetch from "./useFetch";
import Nav from "./components/Nav";
import Shimmer from "./components/Shimmer";
import Footer from "./components/Footer";
import img1 from "../src/assets/images/main-img-1.jpg";
import img2 from "../src/assets/images/main-img-2.jpg";
import img3 from "../src/assets/images/main-img-3.jpg";
import Eid from "../src/assets/images/eid.jpg";
import Summer from "../src/assets/images/summer.jpg";

const App = () => {
  const {
    data: categories,
    error: categoryError,
    loading: categoryLoading,
  } = useFetch(
    `https://ecommerce-site-backend-virid.vercel.app/api/categories`
  );

  return (
    <>
      <Nav />
      {categoryError && <p>Error while fetching products.</p>}
      {categoryLoading ? (
        <Shimmer />
      ) : (
        <main className="mt-4" style={{ marginInline: "6rem" }}>
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
                  src={Summer}
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
                  src={Eid}
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
