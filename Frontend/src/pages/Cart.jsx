import { useState } from "react";
import Nav from "../components/Nav";
import useShopContext from "../contexts/ShopContext";
import { Link } from "react-router-dom";

const Cart = () => {
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

  const [success, setSuccess] = useState(false);
  const [itemRemove, setItemRemove] = useState(false);
  return (
    <>
      <Nav />
      <main className="container py-4">
        <h1 className="py-4 text-center">Bag</h1>
        {success && (
          <p
            className="bg-dark p-2 text-white rounded"
            style={{ width: "18rem" }}
          >
            Item moved to wishlist successfully!
          </p>
        )}
        {itemRemove && (
          <p
            className="bg-dark p-2 text-white rounded"
            style={{ width: "18rem" }}
          >
            Item removed from cart!
          </p>
        )}
        {cart?.length > 0 ? (
          <div className="d-flex gap-4">
            <div style={{ width: "55%" }}>
              {cart?.map((product) => {
                const discountedPrice = Math.round(
                  product.price - (product.price * product.discount) / 100
                );

                return (
                  <div className="card mb-3" style={{ maxWidth: "650px" }}>
                    <div className="row g-0">
                      <div className="col-md-4">
                        <img src={product.img[0]} className="img-fluid" />
                      </div>
                      <div className="col-md-8">
                        <div className="card-body">
                          <div className="d-flex justify-content-between">
                            <h6 className="card-title">{product.brand}</h6>
                            <button
                              onClick={(e) => {
                                e.preventDefault();
                                removeFromCart(product._id);
                                setItemRemove(true);
                                setTimeout(() => {
                                  setItemRemove(false);
                                }, 1000);
                              }}
                              style={{
                                background: "#fff",
                                outline: "none",
                                border: "none",
                              }}
                            >
                              ✕
                            </button>
                          </div>
                          <p className="card-text text-truncate">
                            {product.name}
                          </p>
                          <div className="d-flex">
                            {product.discount ? (
                              <p>
                                <strong>
                                  ₹{discountedPrice * product.quantity}{" "}
                                </strong>
                                <span className="text-decoration-line-through text-secondary">
                                  ₹{product.price * product.quantity}
                                </span>
                              </p>
                            ) : (
                              <p>
                                <strong>
                                  ₹{product.price * product.quantity}
                                </strong>
                              </p>
                            )}
                            &nbsp;
                            <p className="text-danger">
                              {product.discount ? product.discount + "%" : ""}
                            </p>
                          </div>
                          <div className="d-flex gap-4">
                            <p>
                              <strong>Quantity: </strong>
                            </p>
                            <button
                              className="quantity bg-white"
                              onClick={() =>
                                product.quantity > 1 &&
                                updateCartQuantity(
                                  product._id,
                                  product.quantity - 1
                                )
                              }
                            >
                              –
                            </button>
                            <span className="number">{product.quantity}</span>
                            <button
                              className="quantity bg-white"
                              onClick={() =>
                                updateCartQuantity(
                                  product._id,
                                  product.quantity + 1
                                )
                              }
                            >
                              +
                            </button>
                          </div>
                          <p style={{ fontSize: "0.89rem" }}>
                            ↻ <strong>{product.returnPeriod} days </strong>
                            return available
                          </p>
                          <button
                            className="btn btn-secondary mb-2"
                            onClick={(e) => {
                              e.preventDefault();
                              toggleWishlist(product._id);
                              removeFromCart(product._id);
                              setSuccess(true);
                              setTimeout(() => {
                                setSuccess(false);
                              }, 1000);
                            }}
                          >
                            Move to Wishlist
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {cart?.length > 0 ? (
              <div
                style={{ width: "35%", height: "100%" }}
                className="bg-white p-4"
              >
                <h6>PRICE DETAILS</h6>
                <hr />
                <div className="d-flex  justify-content-between">
                  <p>
                    Price ({totalQuantity}{" "}
                    {totalQuantity > 1 ? "Items" : "Item"})
                  </p>
                  <p>₹{totalPrice}</p>
                </div>
                {totalDiscount > 0 && (
                  <div className="d-flex justify-content-between">
                    <p>Discount</p>
                    <p className="text-success">₹{totalDiscount}</p>
                  </div>
                )}
                <div className="d-flex justify-content-between">
                  <p>Delivery Charges</p>
                  <p>
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
                  <h6>₹{totalAmount}</h6>
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
              </div>
            ) : (
              <p className="">Your Cart is Empty</p>
            )}
          </div>
        ) : (
          <div>
            <p className="text-center">Your Cart is Empty</p>
            {wishlist.length > 0 ? (
              <Link className="text-decoration-none" to="/wishlist">
                <button
                  className="border-danger-subtle p-2 d-flex justify-content-center align-items-center mx-auto"
                  style={{ letterSpacing: "1px", fontSize: "1.2rem" }}
                >
                  Add Items from Wishlist
                </button>
              </Link>
            ) : (
              <Link
                to="/"
                className="d-flex align-items-center text-decoration-none justify-content-center"
              >
                <button
                  className="p-2 border-info-subtle"
                  style={{ letterSpacing: "1px", fontSize: "1.2rem" }}
                >
                  Continue Shopping
                </button>
              </Link>
            )}
          </div>
        )}
      </main>
    </>
  );
};
export default Cart;
