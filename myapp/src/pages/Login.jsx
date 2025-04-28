// /pages/Login.jsx
import { useState } from "react";
import api from "../services/api";
import { Link } from "react-router-dom";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [message, setMessage] = useState({ type: "", text: "" });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ type: "", text: "" });

    try {
      const res = await api.post("/login", form);
      setMessage({
        type: "success",
        text: "Login successful! Redirecting...",
      });
      localStorage.setItem("token", res.data.token); // Store auth token

      // You would typically redirect after login
      // For now we'll just show success message
    } catch (err) {
      console.log(err);
      setMessage({
        type: "error",
        text: "Login failed. Please check your credentials.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card" style={{ maxWidth: "500px", margin: "2rem auto" }}>
      <h2 className="card-title">Welcome Back</h2>

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
            placeholder="Your email address"
            value={form.email}
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
            placeholder="Your password"
            value={form.password}
            onChange={handleChange}
            required
          />
          <div style={{ textAlign: "right", marginTop: "0.5rem" }}>
            <a
              href="#"
              style={{ color: "var(--primary)", fontSize: "0.875rem" }}
            >
              Forgot password?
            </a>
          </div>
        </div>

        <button
          type="submit"
          className="btn"
          style={{ width: "100%" }}
          disabled={loading}
        >
          {loading ? "Signing in..." : "Sign In"}
        </button>

        <p
          style={{
            textAlign: "center",
            marginTop: "1.5rem",
            color: "var(--gray-600)",
          }}
        >
          Don't have an account yet?{" "}
          <Link to="/register" style={{ color: "var(--primary)" }}>
            Register
          </Link>
        </p>
      </form>
    </div>
  );
}
