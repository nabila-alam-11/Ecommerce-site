import { Link, useNavigate, useParams } from "react-router-dom";
import useShopContext from "../contexts/ShopContext";
import { useState } from "react";

const Nav = () => {
  const { wishlist, cart, setSearchQuery } = useShopContext();
  const [input, setInput] = useState("");
  const navigate = useNavigate();
  const { productName } = useParams();

  const handleSearch = (e) => {
    e.preventDefault();
    if (input.trim()) {
      setSearchQuery(input);
      navigate(`/products/search?q=${productName}`);
    }
  };
  return (
    <nav
      className="navbar navbar-expand-lg navbar-light bg-white px-4"
      style={{ paddingBlock: "0px !important" }}
    >
      <div className="container-fluid" style={{ paddingInline: "4.2rem" }}>
        <Link
          to="/"
          className="navbar-brand text-secondary-emphasis navbar-css"
        >
          The Outfit Hub
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav my-4 mx-auto">
            <form
              className="nav-item"
              onSubmit={handleSearch}
              style={{ width: "30rem" }}
            >
              <input
                type="text"
                className="form-control"
                placeholder="Search for products..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
              />
            </form>
          </ul>
          <ul className="navbar-nav d-flex align-items-lg-center gap-4">
            <li className="nav-item">
              <button className="btn btn-secondary">Login</button>
            </li>
            <li
              className="nav-item text-secondary position-relative"
              style={{ fontSize: "3rem" }}
            >
              <Link
                to="/wishlist"
                className="text-decoration-none text-secondary"
              >
                <span className="position-relative">♡</span>
                <span className="fav-item position-absolute text-center">
                  {wishlist.length > 0 ? wishlist.length : 0}
                </span>
              </Link>
            </li>
            <li
              className="nav-item position-relative"
              style={{ fontSize: "2.3rem" }}
            >
              <Link to="/cart" className="text-decoration-none">
                <span className="position-relative">🛒</span>
                <span className="cart-item position-absolute text-center">
                  {cart.length}
                </span>
                <span
                  style={{ fontSize: "1.2rem" }}
                  className="align-item-center text-secondary"
                >
                  Cart
                </span>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};
export default Nav;
