import Nav from "../components/Nav";
import { Link } from "react-router-dom";

const SuccessOrder = () => {
  return (
    <>
      <Nav />
      <main
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
          height: "90vh",
        }}
      >
        <img
          src="https://static.vecteezy.com/system/resources/previews/017/177/933/non_2x/round-check-mark-symbol-with-transparent-background-free-png.png"
          className="img-fluid"
          style={{
            width: "10rem",
            marginBottom: "1rem",
            marginTop: "-25rem",
          }}
        />
        <h3
          style={{
            color: "green",
            letterSpacing: "0.789px",
            marginBottom: "0.567rem",
          }}
        >
          Order Confirmed!
        </h3>
        <p className="text-secondary" style={{ letterSpacing: "0.678px" }}>
          Your order has been placed successfully.{" "}
          <Link to="/orders" className="text-success text-decoration-none">
            Order History
          </Link>
        </p>
        <Link
          className="btn btn-success"
          to="/"
          style={{
            width: "15rem",
            fontSize: "1.3rem",
            paddingBlock: "0.678rem",
            marginTop: "1rem",
            letterSpacing: "1.5px",
          }}
        >
          Continue Shopping
        </Link>
      </main>
    </>
  );
};
export default SuccessOrder;
