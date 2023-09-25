import { useDispatch } from "react-redux";
import { useState } from "react";
import { loginUser } from "../redux/slices/userSlice";
import { useNavigate } from "react-router-dom";

export const signupHook = () => {
  const navigate = useNavigate();
  const [error, setError] = useState();
  const disatch = useDispatch();

  const handleSignup = async (email, password) => {
    const response = await fetch("http://localhost:5000/api/user/signup", {
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
      setError(null);
      disatch(loginUser(data));
      localStorage.setItem("user", JSON.stringify(data));
      navigate("/");
    }
  };

  return { handleSignup, error };
};
