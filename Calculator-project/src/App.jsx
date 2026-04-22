import Canvas from "./canvas";
import Header from "./Header";
import Body from "./Body";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [isDark, setIsDark] = useState(() => {
    return localStorage.getItem('theme') === 'dark'; // ✅ read on load
  });

  useEffect(() => {
    document.body.setAttribute("data-theme", isDark ? "dark" : "light");
    localStorage.setItem('theme', isDark ? 'dark' : 'light'); // ✅ save on change
  }, [isDark]);

  return (
    <BrowserRouter>
      <Header isDark={isDark} setIsDark={setIsDark} />
      <Routes>
        <Route path="/" element={<Body />} />
        <Route path="/canvas" element={<Canvas />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;