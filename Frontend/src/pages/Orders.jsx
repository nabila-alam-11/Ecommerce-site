import useFetch from "../useFetch";
import Nav from "../components/Nav";

const Orders = () => {
  const { data: orders } = useFetch(
    "https://ecommerce-site-backend-virid.vercel.app/api/orders"
  );
  console.log(orders);
  return (
    <>
      <Nav />
      <main style={{ marginInline: "6rem" }} className="my-4">
        <h2 className="text-center">All Orders</h2>
        <div className="my-4" style={{ marginInline: "15rem" }}>
          <div
            style={{ background: "white", width: "70%" }}
            className="d-flex gap-3"
          >
            <img
              style={{ width: "5rem", height: "5rem", objectFit: "contain" }}
              src="https://images.pexels.com/photos/30683099/pexels-photo-30683099/free-photo-of-casual-kid-s-fashion-in-studio-setting.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
            />
            <div>
              <p>
                <strong>Roadster</strong>
              </p>
              <p style={{ lineHeight: "0" }}>Blue Denim Jeans</p>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};
export default Orders;
