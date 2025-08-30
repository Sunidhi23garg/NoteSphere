import React, { useState, useEffect } from "react";

export default function SettingsPage() {
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");
  const [fontSize, setFontSize] = useState(localStorage.getItem("fontSize") || "16");

  useEffect(() => {
    localStorage.setItem("theme", theme);
    localStorage.setItem("fontSize", fontSize);
    document.body.setAttribute("data-theme", theme);
    document.body.style.fontSize = `${fontSize}px`;
  }, [theme, fontSize]);

  return (
    <div className="settings-page">
      <h2>Settings</h2>
      <div className="setting">
        <label>Font Size:</label>
        <input
          type="number"
          min="12"
          max="24"
          value={fontSize}
          onChange={e => setFontSize(e.target.value)}
        />
      </div>
    </div>
  );
}
