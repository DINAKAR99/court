import React from "react";
import Navbar from "../pages/public/Navbar";
import { Link } from "react-router-dom";

const PublicLayout = ({ children }) => {
  return (
    <div>
      <header>
        <Navbar />
      </header>
      <main style={{ minHeight: 450, marginBottom: 50 }}>{children}</main>
      <footer
        className="footer mt-auto py-3"
        style={{
          backgroundColor: "#f8f9fa",
          boxShadow: "0 -2px 40px rgba(0, 0, 0, 0.4)",
        }}
      >
        <div className="container text-center">
          <span className="text-muted">© 2024 MyApp. All Rights Reserved.</span>
          <div className="mt-2">
            <Link className="text-muted mx-2" to="/about">
              About
            </Link>
            <Link className="text-muted mx-2" to="/contact">
              Contact
            </Link>
            <Link className="text-muted mx-2" to="/privacy">
              Privacy Policy
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default PublicLayout;
