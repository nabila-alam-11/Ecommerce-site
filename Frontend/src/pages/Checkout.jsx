import { useEffect, useState } from "react";
import Nav from "../components/Nav";
import useFetch from "../useFetch";
import useAddressContext from "../contexts/AddressContext";
import AddressForm from "./AddressForm";

const Checkout = () => {
  const { data, loading } = useFetch(
    "https://ecommerce-site-backend-virid.vercel.app/address"
  );
  const { addresses, removeAddress } = useAddressContext();
  const [selectedAddress, setSelectedAddress] = useState("");
  const [editAddress, setEditAddress] = useState(null);

  useEffect(() => {
    if (addresses?.length > 0) {
      const defaultAddress = addresses.find(
        (address) => address.isDefault === true
      );
      if (defaultAddress) {
        setSelectedAddress(defaultAddress._id);
      } else {
        setSelectedAddress(data[0]._id);
      }
    }
  }, [addresses]);

  const handleAddressChange = (event) => {
    setSelectedAddress(event.target.value);
  };

  const handleEdit = (address) => {
    setEditAddress(address);
    const editModal = new bootstrap.Modal(
      document.getElementById("editAddressModal")
    );
    editModal.show();
  };
  return (
    <>
      <Nav />
      <main className="py-4 ps-4 pe-4" style={{ marginInline: "5rem" }}>
        <div className="d-flex">
          {addresses?.length > 0 ? (
            <div style={{ width: "45%" }}>
              <h3 className="mb-4">Select Delivery Address</h3>
              {loading && <p>Loading...</p>}
              {addresses?.map((address) => (
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
                        {address.street}, {address.landmark}, {address.city},{" "}
                        {address.state} - {address.pinCode}
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
                  <div className="d-flex gap-4" style={{ paddingLeft: "2rem" }}>
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
                      onClick={() => handleEdit(address)}
                    >
                      EDIT
                    </button>
                  </div>
                </div>
              ))}
              <button
                className="text-danger new-address"
                style={{
                  fontWeight: "bold",
                  border: "2px dashed gray",
                  width: "43rem",
                  paddingBlock: "10px",
                }}
              >
                + ADD NEW ADDRESS
              </button>
            </div>
          ) : (
            <div style={{ width: "45%" }}>
              <h3 className="mb-4">ADD NEW ADDRESS</h3>
            </div>
          )}
        </div>
      </main>
      <AddressForm />
      <div
        className="modal fade"
        id="editAddressModal"
        tabIndex="-1"
        aria-labelledby="editAddressModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Edit Address</h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              {editAddress && <AddressForm address={editAddress} />}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Checkout;
