import Nav from "../components/Nav";
import { Link } from "react-router-dom";
import Profile from "../assets/images/profile.png";
import AddressImg from "../assets/images/postal-address.png";
import rightArrow from "../assets/images/angle-small-right.png";
import orderHistory from "../assets/images/order-history.png";
import wishlistImg from "../assets/images/wishlist-heart.png";

const MyProfile = () => {
  return (
    <>
      <Nav />
      <main
        style={{
          paddingInline: "6rem",
          paddingBlock: "5rem",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            background: "white",
            width: "50rem",
            paddingBottom: "1rem",
            borderRadius: "10px",
          }}
        >
          <h3 className="text-center my-4">My Profile</h3>
          <img
            src={Profile}
            style={{ width: "10rem", display: "block", margin: "0 auto" }}
            alt="Profile"
          />
          <h3 className="my-2" style={{ textAlign: "center" }}>
            Anonymous
          </h3>

          {/* Address Row */}
          <div
            style={{
              marginTop: "2rem",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              background: "#F8F8F8",
              paddingInline: "1rem",
              paddingBlock: "0.49rem",
            }}
          >
            <div style={{ display: "flex", alignItems: "center" }}>
              <img
                src={AddressImg}
                style={{ width: "1.5rem", height: "1.5rem" }}
                alt="Address icon"
              />
              <h6 style={{ paddingLeft: "1rem" }}>Address</h6>
            </div>
            <Link to="/checkout/address">
              <img
                src={rightArrow}
                style={{ width: "1.5rem" }}
                alt="Right arrow"
              />
            </Link>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              background: "lightgrey",
              paddingInline: "1rem",
              paddingBlock: "0.49rem",
              marginTop: "0.94px",
            }}
          >
            <div style={{ display: "flex", alignItems: "center" }}>
              <img
                src={orderHistory}
                style={{ width: "1.5rem", height: "1.5rem" }}
                alt="Address icon"
              />
              <h6 style={{ paddingLeft: "1rem" }}>Order History</h6>
            </div>
            <Link to="/orders">
              <img
                src={rightArrow}
                style={{ width: "1.5rem" }}
                alt="Right arrow"
              />
            </Link>
          </div>
          <div
            style={{
              marginTop: "0.98px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              background: "#F8F8F8",
              paddingInline: "1rem",
              paddingBlock: "0.49rem",
            }}
          >
            <div style={{ display: "flex", alignItems: "center" }}>
              <img
                src={wishlistImg}
                style={{ width: "1.5rem", height: "1.5rem" }}
                alt="Address icon"
              />
              <h6 style={{ paddingLeft: "1rem" }}>Wishlist</h6>
            </div>
            <Link to="/wishlist">
              <img
                src={rightArrow}
                style={{ width: "1.5rem" }}
                alt="Right arrow"
              />
            </Link>
          </div>
          <div
            style={{
              width: "6rem",
              background: "lightgrey",
              height: "0.34rem",
              borderRadius: "10px",
              margin: "auto",
              marginTop: "1.5rem",
            }}
          ></div>
        </div>
      </main>
    </>
  );
};

export default MyProfile;
