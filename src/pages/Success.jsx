import React, { useEffect, useState } from "react";
import "../styles/Success.css";

const Success = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const processPayment = async () => {
      try {
        const queryParams = new URLSearchParams(window.location.search);
        const paymentId = queryParams.get("token");
        const packageId = queryParams.get("packageId");
        const userId = queryParams.get("userId");
        const courseId = queryParams.get("courseId");

        if (paymentId && packageId && userId) {
          setLoading(true);

          console.log("Sending request with:", {
            packageId,
            userId,
            paymentId,
            selectedCourseId: courseId,
          });

          const response = await fetch(
            "http://localhost:3000/packages/purchase",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                packageId,
                userId,
                paymentId,
                selectedCourseId: courseId,
              }),
            }
          );

          const data = await response.json();
          setLoading(false);

          if (!response.ok) {
            throw new Error(data.message || "Failed to process payment.");
          }

          setMessage(
            "Payment Successful! Your subscription has been activated."
          );
        }
      } catch (err) {
        setLoading(false);
        setError(err.message || "Something went wrong. Please try again.");
        console.error("Error processing payment:", err);
      }
    };

    processPayment();
  }, []);

  if (loading) {
    return <h1 className="success-container">Loading Payment Processing...</h1>;
  }

  if (error) {
    return (
      <div className="success-container error-container">
        <h1>Payment Failed</h1>
        <p>{error}</p>
        <button onClick={() => (window.location.href = "/")}>
          Back to Home
        </button>
      </div>
    );
  }

  if (message) {
    return (
      <div className="success-container">
        <h1>Payment Successful!</h1>
        <p>{message}</p>
        <button onClick={() => (window.location.href = "/")}>
          Go to Dashboard
        </button>
      </div>
    );
  }

  return <h1 className="success-container">No Payment Information Found</h1>;
};

export default Success;
