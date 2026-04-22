import { useState } from "react";
import "./header.css";

function Header({ isDark, setIsDark }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="navbar">
      <div className="nav-logo">
        <h3>AdjacencyMatrix</h3>
      </div>

      {/* Burger Button */}
      <button
        className={`burger ${isOpen ? "active" : ""}`}
        onClick={() => setIsOpen(!isOpen)}
      >
        <span></span>
        <span></span>
        <span></span>
      </button>

      {/* Nav Links */}
      <ul className={`nav-links ${isOpen ? "open" : ""}`}>
        <li><a href="/" className="nav-link active">Home</a></li>
        <li><a href="#" className="nav-link">About</a></li>
        <li><a href="#" className="nav-link">How to Use</a></li>
        <li><a href="#" className="nav-link">Contact</a></li>
        <li>
          <div className="ThemeButton">
          <button
            className="theme-toggle"
            onClick={() => setIsDark(prev => !prev)}
            aria-label="Toggle theme"
          >
            {isDark ? "☀️" : "🌙"}
          </button>
          </div>
        </li>
      </ul>
    </nav>
  );
}

export default Header;