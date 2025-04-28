// /pages/VerifyAction.jsx
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import api from "../services/api";

export default function VerifyAction() {
  const { token } = useParams();
  const [status, setStatus] = useState({
    type: "loading",
    message: "Verifying your request...",
  });

  useEffect(() => {
    const verifyToken = async () => {
      try {
        await api.get(`/verify/${token}`);
        setStatus({
          type: "success",
          message: "Your action has been successfully verified!",
        });
      } catch (err) {
        setStatus({
          type: "error",
          message:
            err.response?.data?.message ||
            "Verification failed. The token may be invalid or expired.",
        });
      }
    };

    verifyToken();
  }, [token]);

  return (
    <div
      className="card"
      style={{ maxWidth: "600px", margin: "3rem auto", textAlign: "center" }}
    >
      <h2 className="card-title">Verification Status</h2>

      <div
        className={`alert alert-${
          status.type === "loading" ? "success" : status.type
        }`}
        style={{ marginBottom: "2rem" }}
      >
        {status.message}
      </div>

      {status.type === "loading" && (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            margin: "2rem 0",
          }}
        >
          <div
            style={{
              border: "4px solid var(--gray-200)",
              borderRadius: "50%",
              borderTop: "4px solid var(--primary)",
              width: "40px",
              height: "40px",
              animation: "spin 1s linear infinite",
            }}
          />
        </div>
      )}

      {status.type === "success" && (
        <div style={{ margin: "2rem 0" }}>
          <div
            style={{
              width: "60px",
              height: "60px",
              borderRadius: "50%",
              backgroundColor: "rgba(16, 185, 129, 0.1)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              margin: "0 auto 1.5rem",
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="32"
              height="32"
              fill="var(--success)"
              viewBox="0 0 16 16"
            >
              <path d="M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0z" />
            </svg>
          </div>
          <Link to="/login" className="btn" style={{ marginTop: "1rem" }}>
            Go to Login
          </Link>
        </div>
      )}

      {status.type === "error" && (
        <div style={{ margin: "2rem 0" }}>
          <div
            style={{
              width: "60px",
              height: "60px",
              borderRadius: "50%",
              backgroundColor: "rgba(239, 68, 68, 0.1)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              margin: "0 auto 1.5rem",
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="32"
              height="32"
              fill="var(--error)"
              viewBox="0 0 16 16"
            >
              <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
            </svg>
          </div>
          <Link to="/" className="btn" style={{ marginTop: "1rem" }}>
            Back to Home
          </Link>
        </div>
      )}

      <style>
        {`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}
      </style>
    </div>
  );
}
