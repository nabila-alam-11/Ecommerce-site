import { createContext, useContext, useState, useEffect } from "react";
import useFetch from "../useFetch";

const AddressContext = createContext();

const useAddressContext = () => useContext(AddressContext);

export default useAddressContext;

export function AddressProvider({ children }) {
  const { data: addressData, loading } = useFetch(
    "https://ecommerce-site-backend-virid.vercel.app/api/address"
  );
  const [addresses, setAddresses] = useState([]);
  const [editAddress, setEditAddress] = useState(null);
  const [newAddress, setNewAddress] = useState(null);

  useEffect(() => {
    if (addressData) {
      setAddresses(addressData);
      setNewAddress(addressData);
    }
  }, [addressData]);

  const removeAddress = async (addressId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this address?"
    );
    if (!confirmDelete) return;

    try {
      const response = await fetch(
        `https://ecommerce-site-backend-virid.vercel.app/address/${addressId}`,
        {
          method: "DELETE",
        }
      );
      if (!response.ok) {
        throw new Error("Failed to delete address");
      }
      setAddresses((prevAddress) =>
        prevAddress.filter((add) => add._id !== addressId)
      );
    } catch (error) {
      throw error;
    }
  };

  const selectEditAddress = (address) => {
    setEditAddress(address);
  };

  const updateAddress = (updatedAddress) => {
    setAddresses((prevAddress) =>
      prevAddress.map((addr) =>
        addr._id === updatedAddress._id ? updatedAddress : addr
      )
    );
    setEditAddress(null);
    setNewAddress(updatedAddress);
  };

  const createNewAddress = async (newAddressData) => {
    try {
      const response = await fetch(
        "https://ecommerce-site-backend-virid.vercel.app/api/address",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newAddressData),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to create address.");
      }

      const createdAddress = await response.json();

      // Ensure new address has all required fields before updating state
      if (!createdAddress || !createdAddress._id || !createdAddress.fullName) {
        console.error("Invalid address response:", createdAddress);
        return;
      }

      setAddresses((prevAddresses) => [...prevAddresses, createdAddress]);

      // Store the newly added address for external components
      setNewAddress(createdAddress);
    } catch (error) {
      console.log("Error creating address: ", error);
    }
  };

  return (
    <AddressContext.Provider
      value={{
        addresses,
        removeAddress,
        selectEditAddress,
        editAddress,
        updateAddress,
        createNewAddress,
        newAddress,
      }}
    >
      {children}
    </AddressContext.Provider>
  );
}
