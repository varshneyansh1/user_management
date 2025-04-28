// App.jsx
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import UpdateAccount from "./pages/UpdateAccount";
import DeleteAccount from "./pages/DeleteAccount";
import VerifyAction from "./pages/VerifyAction";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";

function App() {
  return (
    <BrowserRouter>
      <div className="app-container">
        <Navbar />
        <main className="content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/update" element={<UpdateAccount />} />
            <Route path="/delete" element={<DeleteAccount />} />
            <Route path="/verify/:token" element={<VerifyAction />} />
          </Routes>
        </main>
        <footer
          style={{
            padding: "1.5rem",
            backgroundColor: "var(--card-bg)",
            borderTop: "1px solid var(--gray-200)",
            textAlign: "center",
            color: "var(--gray-600)",
            fontSize: "0.875rem",
          }}
        >
          <div className="content" style={{ padding: "0" }}>
            <p>
              © {new Date().getFullYear()} User Management System. All rights
              reserved.
            </p>
          </div>
        </footer>
      </div>
    </BrowserRouter>
  );
}

export default App;
