import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Nav from "../components/Nav";
import useFetch from "../useFetch";
import useAddressContext from "../contexts/AddressContext";
import useShopContext from "../contexts/ShopContext";
import AddressForm from "./AddressForm";

const Checkout = () => {
  const { data, loading } = useFetch(
    "https://ecommerce-site-backend-virid.vercel.app/address"
  );
  const {
    addresses,
    removeAddress,
    editAddress,
    selectEditAddress,
    createNewAddress,
    newAddress,
  } = useAddressContext();

  const [selectedAddress, setSelectedAddress] = useState("");
  const [showEditForm, setShowEditForm] = useState(false);
  const [showNewForm, setShowNewForm] = useState(false);

  useEffect(() => {
    if (addresses?.length > 0) {
      const defaultAddress = addresses.find(
        (address) => address.isDefault === true
      );
      if (newAddress) {
        setSelectedAddress(newAddress._id);
      }
      if (defaultAddress) {
        setSelectedAddress(defaultAddress._id);
      } else {
        setSelectedAddress(data?._id);
      }
    }
  }, [addresses, newAddress]);

  const handleAddressChange = (event) => {
    setSelectedAddress(event.target.value);
  };

  const handleEditClick = (address) => {
    selectEditAddress(address);
    setShowEditForm(true);
  };
  const handleNewAddressClick = () => {
    setShowNewForm(true);
  };

  const { cart, toggleWishlist, removeFromCart, wishlist, updateCartQuantity } =
    useShopContext();
  const totalPrice = cart?.reduce((acc, product) => {
    return product.discount
      ? acc +
          Math.round(product.price - (product.price * product.discount) / 100) *
            product.quantity
      : acc + product.price * product.quantity;
  }, 0);

  const totalDiscount = cart?.reduce((acc, product) => {
    return (
      acc +
      Math.round(
        product.discount
          ? (product.price * product.quantity * product.discount) / 100
          : 0
      )
    );
  }, 0);

  const totalDeliveryCharges = cart?.reduce((acc, product) => {
    return acc + (product?.payment?.charges || 0);
  }, 0);

  const totalQuantity = cart.reduce(
    (acc, product) => acc + product.quantity,
    0
  );
  const totalAmount = totalPrice - totalDiscount + totalDeliveryCharges;

  return (
    <>
      <Nav />
      <main className="py-4 ps-4 pe-4" style={{ marginInline: "5rem" }}>
        <div className="d-flex gap-5">
          {addresses?.length > 0 ? (
            <>
              <div style={{ width: "45%" }}>
                <h3 className="mb-4">Select Delivery Address</h3>
                {loading && <p>Loading...</p>}
                {addresses?.map((address) => (
                  <>
                    <div
                      className="shadow-sm p-3 mb-5 bg-body-tertiary rounded bg-white"
                      key={address._id}
                    >
                      <div className="d-flex align-items-start gap-4">
                        <input
                          type="radio"
                          name="deliveryAddress"
                          value={address._id}
                          onChange={handleAddressChange}
                          checked={selectedAddress === address._id}
                          style={{ marginTop: "5px", marginRight: "-5px" }}
                        />
                        <label>
                          <h6>{address.fullName}</h6>
                          <p
                            className="text-secondary"
                            style={{ fontSize: "0.9rem" }}
                          >
                            {address.street}, {address.landmark}, {address.city}
                            , {address.state} - {address.pinCode}
                          </p>
                          <p style={{ fontSize: "0.9rem" }}>
                            <span className="text-secondary">Mobile: </span>
                            <strong style={{ fontSize: "0.84rem" }}>
                              {address.phoneNumber}
                            </strong>
                          </p>
                          <p
                            className="text-secondary"
                            style={{ fontSize: "0.9rem" }}
                          >
                            • Pay on Delivery Available
                          </p>
                        </label>
                      </div>
                      <div
                        className="d-flex gap-4"
                        style={{ paddingLeft: "2rem" }}
                      >
                        <button
                          className="btn-address"
                          onClick={(e) => {
                            e.preventDefault();
                            removeAddress(address._id);
                          }}
                        >
                          REMOVE
                        </button>
                        <button
                          className="btn-address"
                          onClick={(e) => {
                            e.preventDefault();
                            handleEditClick(address);
                          }}
                        >
                          EDIT
                        </button>
                      </div>
                    </div>
                  </>
                ))}
                <button
                  className="text-danger new-address"
                  style={{
                    fontWeight: "bold",
                    border: "2px dashed gray",
                    width: "18.5rem",
                    paddingBlock: "10px",
                  }}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNewAddressClick();
                  }}
                >
                  + ADD NEW ADDRESS
                </button>
              </div>
              <div
                style={{ width: "35%", height: "100%" }}
                className="bg-white p-4"
              >
                <h6>PRICE DETAILS</h6>
                <hr />
                <div className="d-flex  justify-content-between">
                  <p>Price</p>
                  <p>₹ {totalPrice}</p>
                </div>
                <div className="d-flex justify-content-between">
                  <p>Discount</p>
                  <p className="text-success">₹ {totalDiscount}</p>
                </div>
                <div className="d-flex justify-content-between">
                  <p>Delivery Charges</p>
                  <p>
                    {" "}
                    {totalDeliveryCharges < 1
                      ? "FREE"
                      : "₹" + totalDeliveryCharges}
                  </p>
                </div>
                <hr />
                <div
                  className="d-flex  justify-content-between"
                  style={{ lineHeight: "1" }}
                >
                  <h6>TOTAL AMOUNT</h6>
                  <h6>₹ {totalAmount}</h6>
                </div>
                <hr />
                <p>You will save ₹{totalDiscount} on this order</p>
                <Link to="/checkout/address">
                  <button
                    className="btn btn-primary"
                    style={{ width: "100%", letterSpacing: "1px" }}
                  >
                    PLACE ORDER
                  </button>
                </Link>
              </div>{" "}
            </>
          ) : (
            <div style={{ width: "45%" }}>
              <h3 className="mb-4">ADD NEW ADDRESS</h3>
            </div>
          )}
        </div>
      </main>
      {showEditForm && (
        <div className="modal-overlay">
          <div className="modal-content">
            <AddressForm
              existingAddress={editAddress}
              onClose={() => {
                setShowEditForm(false);
              }}
            />
          </div>
        </div>
      )}
      {showNewForm && (
        <div className="modal-overlay">
          <div className="modal-content">
            <AddressForm
              onClose={() => {
                setShowNewForm(false);
              }}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default Checkout;
