import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import "./App.css";
import Home from "./pages/home.js";
import Surat from "./pages/surat.js";
import Ayat from "./pages/ayat.js";
  
function App() {
  return (
    <div>
      <Router>
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/surat" element={<Surat />} />
            <Route path="/ayat/:surat" element={<Ayat />} />
        </Routes>
      </Router>
    </div>
  );
}
  
export default App;