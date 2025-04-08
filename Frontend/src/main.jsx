import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "../src/styles.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import CategoryPage from "./pages/CategoryPage.jsx";
import ProductDetail from "./pages/ProductDetail.jsx";
import { ShopProvider } from "./contexts/ShopContext.jsx";
import Wishlist from "./pages/Wishlist.jsx";
import Cart from "./pages/Cart.jsx";
import Checkout from "./pages/Checkout.jsx";
import SearchResult from "./components/SearchResult.jsx";
import MyProfile from "./pages/MyProfile.jsx";
import { AddressProvider } from "./contexts/AddressContext.jsx";
import SuccessOrder from "./pages/SuccessOrder.jsx";
import Orders from "./pages/Orders.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/category/:categoryId",
    element: <CategoryPage />,
  },
  {
    path: "/product/:productId",
    element: <ProductDetail />,
  },
  {
    path: "/wishlist",
    element: <Wishlist />,
  },
  {
    path: "/cart",
    element: <Cart />,
  },
  {
    path: "/checkout/address",
    element: <Checkout />,
  },
  {
    path: "/products/search",
    element: <SearchResult />,
  },
  {
    path: "/order/success",
    element: <SuccessOrder />,
  },
  {
    path: "/orders",
    element: <Orders />,
  },
  {
    path: "/my/profile",
    element: <MyProfile />,
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ShopProvider>
      <AddressProvider>
        <RouterProvider router={router} />
      </AddressProvider>
    </ShopProvider>
  </StrictMode>
);
