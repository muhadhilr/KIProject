import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login.jsx";
import Cashier from "./pages/Cashier.jsx";
import Menu from "./pages/MenuPage.jsx";
import Manager from "./pages/Manager.jsx";
import ProtectedRoute from "./services/ProtectedRoute.jsx";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route 
            path="/cashier" 
            element={
              <ProtectedRoute allowedRoles={['cashier']}>
                <Cashier />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/manager" 
            element={
              <ProtectedRoute allowedRoles={['manager']}>
                <Manager />
              </ProtectedRoute>
            } 
          />
          <Route path="/" element={<Menu />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
