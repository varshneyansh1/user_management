// /pages/Register.jsx
import { useState } from "react";
import api from "../services/api";
import { Link } from "react-router-dom";

export default function Register() {
  const [form, setForm] = useState({ email: "", username: "", password: "" });
  const [message, setMessage] = useState({ type: "", text: "" });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ type: "", text: "" });

    try {
      await api.post("/register", form);
      setMessage({
        type: "success",
        text: "Registration successful! Please check your email to verify your account.",
      });
      setForm({ email: "", username: "", password: "" });
    } catch (err) {
      setMessage({
        type: "error",
        text:
          err.response?.data?.message ||
          "Registration failed. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card" style={{ maxWidth: "500px", margin: "2rem auto" }}>
      <h2 className="card-title">Create Account</h2>

      {message.text && (
        <div className={`alert alert-${message.type}`}>{message.text}</div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="email" className="form-label">
            Email Address
          </label>
          <input
            id="email"
            name="email"
            type="email"
            placeholder="yourname@example.com"
            value={form.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="username" className="form-label">
            Username
          </label>
          <input
            id="username"
            name="username"
            placeholder="Choose a username"
            value={form.username}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            id="password"
            name="password"
            type="password"
            placeholder="Create a secure password"
            value={form.password}
            onChange={handleChange}
            required
          />
        </div>

        <button
          type="submit"
          className="btn"
          style={{ width: "100%" }}
          disabled={loading}
        >
          {loading ? "Creating Account..." : "Register"}
        </button>

        <p
          style={{
            textAlign: "center",
            marginTop: "1.5rem",
            color: "var(--gray-600)",
          }}
        >
          Already have an account?{" "}
          <Link to="/login" style={{ color: "var(--primary)" }}>
            Login
          </Link>
        </p>
      </form>
    </div>
  );
}
