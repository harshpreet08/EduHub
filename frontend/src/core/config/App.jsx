import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import NavBar from "../../Components/NavBar";
import BlogFormPage from "../../Components/BlogFormPage";
import BlogListPage from "../../Components/BlogListPage";
import BlogDetailsPage from "../../Components/BlogDetails";
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
          <Route path="/blog/:id" element={<BlogDetailsPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
