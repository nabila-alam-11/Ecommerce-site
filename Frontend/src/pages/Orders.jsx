import useFetch from "../useFetch";
import Nav from "../components/Nav";

const Orders = () => {
  const { data: orders, loading } = useFetch(
    "https://ecommerce-site-backend-virid.vercel.app/api/orders"
  );
  console.log(orders);
  return (
    <>
      <Nav />
      <main style={{ marginInline: "6rem" }} className="my-4">
        <h2 className="text-center my-4">All Orders</h2>
        {loading && (
          <div class="d-flex justify-content-center py-4">
            <div class="spinner-border text-danger" role="status">
              <span class="visually-hidden">Loading...</span>
            </div>
          </div>
        )}
        {orders?.map((order) => (
          <div style={{ marginInline: "15rem" }} key={order._id}>
            <div
              style={{ background: "white", width: "100%" }}
              className="d-flex flex-column gap-4 p-3 shadow-sm rounded"
            >
              {order.items.map((item, idx) => {
                const product = item.product;
                if (!product || Object.keys(product).length === 0) return null;

                return (
                  <div
                    key={idx}
                    className="d-flex align-items-center gap-4"
                    style={{
                      borderBottom: "1px solid #eee",
                      paddingBottom: "1rem",
                    }}
                  >
                    <img
                      src={product.img?.[0]}
                      style={{
                        width: "6rem",
                        height: "6rem",
                        objectFit: "cover",
                        borderRadius: "0.5rem",
                      }}
                      alt={product.name}
                    />
                    <div>
                      <p className="mb-1">
                        <strong>{product.brand}</strong>
                      </p>
                      <p className="mb-0">{product.name}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </main>
    </>
  );
};
export default Orders;
