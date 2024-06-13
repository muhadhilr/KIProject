import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login.jsx";
import Cashier from "./pages/Cashier.jsx";
import Menu from "./pages/MenuPage.jsx";
import Manager from "./pages/Manager.jsx";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/cashier" element={<Cashier />} />
          <Route path="/manager" element={<Manager />} />
          <Route path="/" element={<Menu />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
