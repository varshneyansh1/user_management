// /pages/DeleteAccount.jsx
import { useState } from "react";
import api from "../services/api";

export default function DeleteAccount() {
  const [confirmed, setConfirmed] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!confirmed) {
      setMessage({
        type: "error",
        text: "Please confirm the deletion by checking the box below.",
      });
      return;
    }

    setLoading(true);
    setMessage({ type: "", text: "" });

    try {
      const token = localStorage.getItem("token");
      await api.post(
        "delete-request",
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setMessage({
        type: "success",
        text: "Verification email sent to confirm account deletion.",
      });
      setConfirmed(false);
    } catch (err) {
      setMessage({
        type: "error",
        text:
          err.response?.data?.message ||
          "Failed to request account deletion. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card" style={{ maxWidth: "500px", margin: "2rem auto" }}>
      <h2 className="card-title">Delete Your Account</h2>

      {message.text && (
        <div className={`alert alert-${message.type}`}>{message.text}</div>
      )}

      <div
        style={{
          border: "1px solid var(--error)",
          borderRadius: "var(--border-radius)",
          padding: "1rem",
          marginBottom: "1.5rem",
          backgroundColor: "rgba(239, 68, 68, 0.05)",
        }}
      >
        <h3
          style={{
            color: "var(--error)",
            fontSize: "1.125rem",
            marginBottom: "0.75rem",
          }}
        >
          Warning: This action cannot be undone!
        </h3>
        <p>
          Deleting your account will permanently remove all your data from our
          system. You will receive an email with a confirmation link to finalize
          the deletion.
        </p>
      </div>

      <form onSubmit={handleSubmit}>
        <div
          className="form-group"
          style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}
        >
          <input
            id="confirm"
            type="checkbox"
            style={{ width: "auto" }}
            checked={confirmed}
            onChange={() => setConfirmed(!confirmed)}
          />
          <label htmlFor="confirm" style={{ margin: 0, cursor: "pointer" }}>
            I understand that this action is permanent and cannot be reversed
          </label>
        </div>

        <button
          type="submit"
          className="btn btn-danger"
          style={{ width: "100%", marginTop: "1rem" }}
          disabled={loading}
        >
          {loading ? "Processing..." : "Delete My Account"}
        </button>
      </form>
    </div>
  );
}
