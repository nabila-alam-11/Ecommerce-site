import { createContext, useContext, useState, useEffect } from "react";
import useFetch from "../useFetch";

const AddressContext = createContext();

const useAddressContext = () => useContext(AddressContext);

export default useAddressContext;

export function AddressProvider({ children }) {
  const { data: addressData } = useFetch(
    "https://ecommerce-site-backend-virid.vercel.app/address"
  );
  const [addresses, setAddresses] = useState([]);

  useEffect(() => {
    if (addressData) {
      setAddresses(addressData);
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
  return (
    <AddressContext.Provider value={{ addresses, removeAddress }}>
      {children}
    </AddressContext.Provider>
  );
}
