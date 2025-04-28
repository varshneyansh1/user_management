import React from "react";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="hero">
      <h1 className="hero-title">Welcome to the User Management System</h1>
      <p className="hero-subtitle">
        A secure and modern platform to manage your user account efficiently.
        Register, login, update, or delete your account with ease.
      </p>
      <div className="button-group">
        <Link to="/register" className="btn">
          Get Started
        </Link>
        <Link
          to="/login"
          className="btn btn-outline"
          style={{ marginLeft: "1rem" }}
        >
          Login
        </Link>
      </div>

      <div
        className="card"
        style={{ marginTop: "4rem", maxWidth: "800px", margin: "4rem auto 0" }}
      >
        <h2 className="card-title">Why Choose Our Platform?</h2>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
            gap: "2rem",
          }}
        >
          <div>
            <h3
              style={{
                fontSize: "1.25rem",
                marginBottom: "0.75rem",
                color: "var(--primary)",
              }}
            >
              Secure
            </h3>
            <p>
              Your data is protected with industry-standard security protocols
            </p>
          </div>
          <div>
            <h3
              style={{
                fontSize: "1.25rem",
                marginBottom: "0.75rem",
                color: "var(--primary)",
              }}
            >
              Easy to Use
            </h3>
            <p>Intuitive interface designed for the best user experience</p>
          </div>
          <div>
            <h3
              style={{
                fontSize: "1.25rem",
                marginBottom: "0.75rem",
                color: "var(--primary)",
              }}
            >
              Reliable
            </h3>
            <p>
              Built with modern technologies ensuring stability and performance
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
