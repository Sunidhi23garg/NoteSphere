import React, { useEffect, useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { ThemeProvider, useTheme } from "./context/ThemeContext";
import Navbar from "./pages/Navbar";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import SettingsPage from "./pages/SettingsPage";
import Signup from "./pages/Signup";
import "./styles/style.css";

function RequireAuth({ children }) {
  const token = localStorage.getItem("token");
  return token ? children : <Navigate to="/login" replace />;
}

function AppContent() {
  const [compact, setCompact] = useState(
    JSON.parse(localStorage.getItem("compactMode") || "false")
  );
  const { theme } = useTheme();

  useEffect(() => {
    localStorage.setItem("compactMode", JSON.stringify(compact));
    document.body.classList.toggle("compact", compact);
    
    if (window.electronAPI) {
      if (compact) {
        window.electronAPI.resizeWindow(400, 300);
      } else {
        window.electronAPI.resizeWindow(1200, 800);
      }
    }
  }, [compact]);

  return (
    <div className={`app-shell ${compact ? "compact" : ""} ${theme}`}>
      <Navbar compact={compact} setCompact={setCompact} />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route 
          path="/" 
          element={
            <RequireAuth>
              <Dashboard />
            </RequireAuth>
          } 
        />
        <Route 
          path="/settings" 
          element={
            <RequireAuth>
              <SettingsPage />
            </RequireAuth>
          } 
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <ThemeProvider>
        <AppContent />
      </ThemeProvider>
    </AuthProvider>
  );
}