import { Link } from "react-router-dom";
import useFetch from "./useFetch";

const App = () => {
  const { data, error, loading } = useFetch(
    "https://ecommerce-site-backend-virid.vercel.app/api/categories"
  );
  console.log(data);
  return (
    <main className="container my-4">
      <div className="row">
        {data?.map((product) => (
          <div className="col col-md-4" key={product._id}>
            <Link>
              <img img={product.img} />
            </Link>
          </div>
        ))}
      </div>
    </main>
  );
};
export default App;
