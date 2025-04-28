// /pages/UpdateAccount.jsx
import { useState } from "react";
import api from "../services/api";

export default function UpdateAccount() {
  const [form, setForm] = useState({ username: "", password: "" });
  const [message, setMessage] = useState({ type: "", text: "" });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ type: "", text: "" });

    try {
      const token = localStorage.getItem("token");
      await api.post("update-request", form, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setMessage({
        type: "success",
        text: "Verification email sent to confirm your account update.",
      });
    } catch (err) {
      setMessage({
        type: "error",
        text:
          err.response?.data?.message ||
          "Failed to update account. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card" style={{ maxWidth: "500px", margin: "2rem auto" }}>
      <h2 className="card-title">Update Your Account</h2>

      {message.text && (
        <div className={`alert alert-${message.type}`}>{message.text}</div>
      )}

      <p style={{ marginBottom: "1.5rem", color: "var(--gray-600)" }}>
        Update your username or password. You'll receive an email to confirm
        these changes.
      </p>

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="username" className="form-label">
            New Username
          </label>
          <input
            id="username"
            name="username"
            placeholder="Enter new username"
            value={form.username}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="password" className="form-label">
            New Password
          </label>
          <input
            id="password"
            name="password"
            type="password"
            placeholder="Enter new password"
            value={form.password}
            onChange={handleChange}
          />
        </div>

        <button
          type="submit"
          className="btn"
          style={{ width: "100%" }}
          disabled={loading}
        >
          {loading ? "Requesting Update..." : "Request Update"}
        </button>

        <p
          style={{
            textAlign: "center",
            marginTop: "1.5rem",
            fontSize: "0.875rem",
            color: "var(--gray-600)",
          }}
        >
          Both fields are optional. Only fill in what you want to change.
        </p>
      </form>
    </div>
  );
}
