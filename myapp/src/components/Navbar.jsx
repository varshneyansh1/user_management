// /components/Navbar.jsx
import { Link, useLocation } from "react-router-dom";

export default function Navbar() {
  const location = useLocation();

  const isActive = (path) => {
    return location.pathname === path ? "active" : "";
  };

  return (
    <nav>
      <div className="nav-container">
        <Link to="/" className="nav-logo">
          UserMS
        </Link>
        <div className="nav-links">
          <Link to="/" className={isActive("/")}>
            Home
          </Link>
          <Link to="/register" className={isActive("/register")}>
            Register
          </Link>
          <Link to="/login" className={isActive("/login")}>
            Login
          </Link>
          <Link to="/update" className={isActive("/update")}>
            Update
          </Link>
          <Link to="/delete" className={isActive("/delete")}>
            Delete
          </Link>
        </div>
      </div>
    </nav>
  );
}
