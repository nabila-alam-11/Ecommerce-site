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
      <main>
        {orders?.map((order) => (
          <div
            className="d-flex"
            style={{
              background: "white",
            }}
          >
            {order.items?.map((item) => (
              <div></div>
            ))}
            <div></div>
          </div>
        ))}
      </main>
    </>
  );
};
export default Orders;
