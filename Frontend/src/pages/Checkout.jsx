import Nav from "../components/Nav";

const Checkout = () => {
  return (
    <>
      <Nav />
      <main className="py-4 ps-4 pe-4" style={{ marginInline: "5rem" }}>
        <div className="d-flex">
          <div style={{ width: "45%" }}>
            <h3 className="mb-4">Shipping Address</h3>
            <form>
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
          </div>
        </div>
      </main>
    </>
  );
};
export default Checkout;
