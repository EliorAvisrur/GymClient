import React, { useState } from "react";
import formStyles from "../styles/formStyles.module.css";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { LOGIN_URL } from "../constants/endPoint";

const Login = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const [loginData, setLoginData] = useState(null); // Store form data
  const [req, setReq] = useState({
    data: null,
    loading: false,
    error: null,
  });

  const handleRequest = async (data) => {
    setReq({ ...req, loading: true }); // Set loading state

    try {
      const response = await fetch(LOGIN_URL, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json(); // Parse JSON response

      if (response.ok) {
        // Handle success
        setReq({ ...req, loading: false, data: result });
        console.log("Login successful:", result);
        navigate("/"); // Navigate to homepage after successful login
        reset(); // Reset form fields after successful login
      } else {
        // Handle error response
        setReq({ ...req, loading: false, error: result });
        console.log("Login failed:", result);
      }
    } catch (error) {
      // Catch network errors
      setReq({ ...req, loading: false, error: error });
      console.log("Error during login:", error);
    }
  };

  // Show loading spinner if data is being fetched
  if (req.loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-500"></div>
      </div>
    );
  }

  // Error handling if the fetch fails
  console.log(req.error);

  // if (req.error) {
  //   return <p className={formStyles.errorMessage}>{req.error.message}</p>;
  // }

  return (
    <div className={formStyles.formContainer}>
      <form onSubmit={handleSubmit(handleRequest)}>
        <div>
          <label htmlFor="email" className={formStyles.label}>
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^\S+@\S+\.\S+$/,
                message: "Email is not valid",
              },
            })}
            className={formStyles.input}
          />
          {errors.email && (
            <p className={formStyles.errorMessage}>{errors.email.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="password" className={formStyles.label}>
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            {...register("password", { required: "Password is required" })}
            className={formStyles.input}
          />
          {errors.password && (
            <p className={formStyles.errorMessage}>{errors.password.message}</p>
          )}
        </div>

        <div>
          <button type="submit" className={formStyles.button}>
            {req.loading ? "Logging in..." : "Login"}
          </button>
        </div>
        {req.error && (
          <p className={formStyles.errorMessage}>{req.error.message}</p>
        )}
      </form>
    </div>
  );
};

export default Login;
