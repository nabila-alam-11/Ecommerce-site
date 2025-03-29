const AddressForm = ({ address }) => {
  return (
    <form
      style={{
        width: "30%",
        background: "#fff",
        padding: "1rem",
        borderRadius: "10px",
        margin: "auto",
        zIndex: "1",
        position: "absolute",
        top: "50%",
        left: "30%",
        transform: "translate(-30%, -45%)",
        zIndex: "9999",
        boxShadow: "0px 4px 10px rgba(0,0,0,0.2)",
      }}
    >
      <h5>EDIT ADDRESS</h5>
      <hr />
      <label className="mb-2">Full Name: </label>
      <input type="text" className="form-control mb-4" />
      <label className="mb-2">Phone Number </label>
      <input type="number" className="form-control mb-4" />
      <label className="mb-2">Email: </label>
      <input type="text" className="form-control mb-4" />
      <label className="mb-2">Street: </label>

      <input className="form-control mb-4" type="text" />
      <label className="mb-2">Landmark: </label>
      <input className="form-control mb-4" type="text" />
      <label className="mb-2">City: </label>
      <input className="form-control mb-4" type="text" />
      <label className="mb-2">State: </label>
      <input className="form-control mb-4" type="text" />
      <label className="mb-2">Pin Code: </label>
      <input className="form-control mb-4" type="text" />
      <label className="mb-2">
        <input type="checkbox" /> Set as Default Address
      </label>
    </form>
  );
};
export default AddressForm;
