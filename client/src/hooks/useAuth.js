import { useEffect, useState } from "react";

const useAuth = (
  { email, password, firstName, lastName, profilePicture },
  isFromRegister
) => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);
  const baseUrl = "http://localhost:3000/api";
  const endpoint = isFromRegister ? "register" : "login";
  const url = `${baseUrl}/${endpoint}`;
  const fullName = `${firstName}${lastName ? " " + lastName : ""}`;
  const body = isFromRegister
    ? { email, password, fullName, profilePicture }
    : { email, password };

  useEffect(() => {
    if (body.email && body.password) {
      fetch(url, {
        method: "POST",
        body: JSON.stringify(body),
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((res) => res.json())
        .then((resData) => {
          if (!resData.error) {
            if (!isFromRegister) localStorage.setItem("token", resData.token);
            setData(resData);
            setError(null); // Clear any previous error.
          } else {
            setError(resData.error); // Set the error message.
          }
          setLoading(false); // Set loading back to false.
        })
        .catch((error) => {
          setError("An error occurred."); // Handle network errors.
          setLoading(false); // Set loading back to false.
        });
    }
  }, [email, password]); // Only run when email or password changes.

  return { data, loading, error };
};

export default useAuth;
