import { useState, useEffect } from "react";

const useApiCall = (params, setData) => {
  const apiCall = async ({ endpoint, id }) => {
    const baseUrl = "http://localhost:3000";
    const url = `${baseUrl}${endpoint}${id ? `?id=${key}` : ""}`;
    const res = await fetch(url);
    const data = await res.json();
    console.log(data);
    return data;
  };

  const fetchData = async () => {
    try {
      const res = await apiCall(params);
      console.log(res);
      setData(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);
};

export default useApiCall;
