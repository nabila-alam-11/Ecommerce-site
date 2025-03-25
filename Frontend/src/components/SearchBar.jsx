import { useState } from "react";
import useShopContext from "../contexts/ShopContext";
import { useNavigate } from "react-router-dom";

const SearchBar = () => {
  const [query, setQuery] = useState("");
  const { filterProducts } = useShopContext();
  console.log(query);
  const navigate = useNavigate();

  const handleSearch = (e) => {
    if (e.key === "Enter") {
      filterProducts(query);
      navigate(`/products/search?q=${query}`);
    }
  };
  return (
    <form className="nav-item" style={{ width: "30rem" }}>
      <input
        type="text"
        className="form-control"
        placeholder="Search for products..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={handleSearch}
      />
    </form>
  );
};
export default SearchBar;
