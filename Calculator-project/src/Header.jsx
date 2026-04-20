import { useEffect, useState } from "react";
import "./header.css";

function Header() {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    document.body.setAttribute("data-theme", isDark ? "dark" : "light");
  }, [isDark]);

  return (
    <nav className="navbar">
      <div className="nav-logo">
        <h3>AdjacencyMatrix </h3>
      </div>

      <ul className="nav-links">
        <li><a href="#" className="nav-link active">Home</a></li>
        <li><a href="#" className="nav-link">About</a></li>
        <li><a href="#" className="nav-link">How to Use</a></li>
        <li><a href="#" className="nav-link">Contact</a></li>
        <button
          className="theme-toggle"
          onClick={() => setIsDark(prev => !prev)}
          aria-label="Toggle theme"
        >
          {isDark ? "☀️" : "🌙"}
        </button>
      </ul>

      
    </nav>
  );
}

export default Header;