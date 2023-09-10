import { useEffect, useState } from "react";

const useFetch = ({ endpoint, id }) => {
  const [data, setdata] = useState(null);
  const [loading, setloading] = useState(true);
  const baseUrl = "http://localhost:3000";
  const url = `${baseUrl}${endpoint}${id ? `/${id}` : ""}`;
  console.log(url);

  useEffect(() => {
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setdata(data);
        setloading(false);
      });
  }, [url]);

  return { data, loading };
};

export default useFetch;
