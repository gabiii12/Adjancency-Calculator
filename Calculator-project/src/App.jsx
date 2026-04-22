import Canvas from "./canvas";
import Header from "./Header";
import Body from "./Body";
import Htu from "./howtouse";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [isDark, setIsDark] = useState(() => {
    return localStorage.getItem('theme') === 'dark'; 
  });

  useEffect(() => {
    document.body.setAttribute("data-theme", isDark ? "dark" : "light");
    localStorage.setItem('theme', isDark ? 'dark' : 'light'); 
  }, [isDark]);

  return (
    <BrowserRouter>
      <Header isDark={isDark} setIsDark={setIsDark} />
      
      <Routes>
        <Route path="/" element={<Body />} />
      </Routes>
      <Htu/>
      <Canvas />
    </BrowserRouter>
    
  );
}

export default App;