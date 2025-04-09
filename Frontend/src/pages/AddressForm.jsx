import { useEffect, useState } from "react";
import useAddressContext from "../contexts/AddressContext";

const AddressForm = ({ existingAddress, onClose }) => {
  const { updateAddress, createNewAddress } = useAddressContext();
  const [formData, setFormData] = useState({
    fullName: "",
    phoneNumber: "",
    email: "",
    street: "",
    landmark: "",
    city: "",
    state: "",
    pinCode: "",
    isDefault: false,
  });

  useEffect(() => {
    if (existingAddress) {
      setFormData(existingAddress);
    }
  }, [existingAddress]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    updateAddress(formData);
    try {
      if (existingAddress) {
        const response = await fetch(
          `https://ecommerce-site-backend-virid.vercel.app/address/${existingAddress._id}`,
          {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formData),
          }
        );

        if (!response.ok) {
          throw new Error("Failed to update address");
        }

        const updatedAddress = await response.json();
        updateAddress(updatedAddress);
      } else {
        createNewAddress(formData);
      } // Update context
      onClose(); // Close modal
    } catch (error) {
      console.error("Error updating address:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="d-flex justify-content-between">
        <h5>{existingAddress ? "EDIT ADDRESS" : "ADD NEW ADDRESS"}</h5>
        <button
          type="button"
          style={{
            outline: "none",
            border: "none",
            background: "rgb(248, 249, 250)",
          }}
          onClick={onClose}
        >
          ✕
        </button>
      </div>
      <hr />

      <label className="mb-2">Full Name: </label>
      <input
        type="text"
        name="fullName"
        className="form-control mb-4"
        value={formData.fullName}
        onChange={handleChange}
        required
      />

      <label className="mb-2">Phone Number: </label>
      <input
        type="number"
        name="phoneNumber"
        className="form-control mb-4"
        value={formData.phoneNumber}
        onChange={handleChange}
        required
      />

      <label className="mb-2">Email: </label>
      <input
        type="email"
        name="email"
        className="form-control mb-4"
        value={formData.email}
        onChange={handleChange}
      />

      <label className="mb-2">Street: </label>
      <input
        type="text"
        name="street"
        className="form-control mb-4"
        value={formData.street}
        onChange={handleChange}
        required
      />

      <label className="mb-2">Landmark: </label>
      <input
        type="text"
        name="landmark"
        className="form-control mb-4"
        value={formData.landmark}
        onChange={handleChange}
      />

      <label className="mb-2">City: </label>
      <input
        type="text"
        name="city"
        className="form-control mb-4"
        value={formData.city}
        onChange={handleChange}
        required
      />

      <label className="mb-2">State: </label>
      <input
        type="text"
        name="state"
        className="form-control mb-4"
        value={formData.state}
        onChange={handleChange}
        required
      />

      <label className="mb-2">Pin Code: </label>
      <input
        type="text"
        name="pinCode"
        className="form-control mb-4"
        value={formData.pinCode}
        onChange={handleChange}
        required
      />

      <label className="mb-2">
        <input
          type="checkbox"
          name="isDefault"
          checked={formData.isDefault}
          onChange={handleChange}
        />{" "}
        Set as Default Address
      </label>

      <hr />
      <div className="d-flex justify-content-between mt-4">
        <button
          type="button"
          className="btn btn-light"
          style={{ width: "10rem", border: "1px solid black" }}
          onClick={onClose}
        >
          Cancel
        </button>
        <button
          type="submit"
          className="btn btn-danger"
          style={{ width: "10rem" }}
        >
          Save
        </button>
      </div>
    </form>
  );
};

export default AddressForm;
