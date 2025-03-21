import { useEffect, useState } from "react";

const useFetch = (url, initialData) => {
  const [data, setData] = useState(initialData);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetch(url)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok.");
        }
        return response.json();
      })
      .then((responseData) => {
        setData(responseData);
        setError(null);
      })
      .catch((error) => {
        console.log("An error occurred while fetching the data.");
        setError(error.message);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [url]);
  return { data, loading, error };
};
export default useFetch;
