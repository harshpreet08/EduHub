import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import NavBar from "../../Components/NavBar";
import BlogFormPage from "../../Components/BlogFormPage";
import BlogListPage from "../../Components/BlogListPage";
import "../../Components/Global.css";

import PricingPage from "../../Components/PricingPage";

function App() {
  return (
    <Router>
      <div>
        <NavBar />
        <Routes>
          <Route path="/" element={<PricingPage />} />
          <Route path="/blogform" element={<BlogFormPage />} />
          <Route path="/bloglist" element={<BlogListPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
