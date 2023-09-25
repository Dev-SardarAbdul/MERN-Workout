import { useDispatch } from "react-redux";
import { useState } from "react";
import { loginUser } from "../redux/slices/userSlice";
import { useNavigate } from "react-router-dom";

export const loginUserHook = () => {
  const [error, setError] = useState();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleUserLogin = async (email, password) => {
    const response = await fetch("http://localhost:5000/api/user/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();

    if (!response.ok) {
      setError(data.error);
    }

    if (response.ok) {
      dispatch(loginUser(data));
      setError(null);
      localStorage.setItem("user", JSON.stringify(data));

      navigate("/");
    }
  };

  return { error, handleUserLogin };
};
