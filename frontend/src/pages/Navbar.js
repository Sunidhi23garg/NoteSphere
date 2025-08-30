import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";
import "../pages/Navbar.css";

const Navbar = ({ compact, setCompact }) => {
  const location = useLocation();
  const token = localStorage.getItem("token");
  const { theme, toggleTheme } = useTheme();

  return (
    <nav className={`navbar ${compact ? "navbar-compact" : ""} ${theme}`}>
      <div className="navbar-brand">
        <Link to="/" className="navbar-logo">
          NoteSphere
        </Link>
      </div>
      
      <div className="navbar-menu">
        {token && (
          <>
            <Link 
              to="/" 
              className={`navbar-item ${location.pathname === "/" ? "active" : ""}`}
            >
              Dashboard
            </Link>
            <Link 
              to="/settings" 
              className={`navbar-item ${location.pathname === "/settings" ? "active" : ""}`}
            >
              Settings
            </Link>
          </>
        )}
      </div>
      
      <div className="navbar-actions">
        <button 
          className="navbar-theme-toggle"
          onClick={toggleTheme}
          title={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
        >
          {theme === 'light' ? '🌙' : '☀️'}
        </button>
        
        {token && (
          <button 
            className="navbar-toggle"
            onClick={() => setCompact(!compact)}
            title={compact ? "Switch to Expanded Mode" : "Switch to Compact Mode"}
          >
            {compact ? "↗" : "↙"}
          </button>
        )}
        
        {token ? (
          <button 
            className="navbar-logout"
            onClick={() => {
              localStorage.removeItem("token");
              window.location.reload();
            }}
          >
            Logout
          </button>
        ) : (
          <div className="navbar-auth">
            <Link to="/login" className="navbar-login">
              Login
            </Link>
            <Link to="/signup" className="navbar-signup">
              Sign Up
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;