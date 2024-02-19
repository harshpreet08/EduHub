import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import NavBar from "./Components/NavBar";
import "./Components/Global.css";

import PricingPage from "./Components/PricingPage";

function App() {
  return (
    <Router>
      <div>
        <NavBar />
        <Routes>
          <Route path="/" element={<PricingPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
