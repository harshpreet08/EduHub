import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import NavBar from "../../Components/NavBar";
import BlogFormPage from "../../Components/BlogFormPage";
import BlogListPage from "../../Components/BlogListPage";
import BlogDetailsPage from "../../Components/BlogDetails";
import PricingPage from "../../Components/PricingPage";
import QuestionBank from "../../pages/Tests/QuestionBank"; 
import "../../Components/Global.css";

function App() {
  const defaultUserId = "user123";
  const defaultCourseId = "course123";

  return (
    <Router>
      <div>
        <NavBar />
        <Routes>
          <Route path="/" element={<PricingPage />} />
          <Route path="/blogform" element={<BlogFormPage />} />
          <Route path="/bloglist" element={<BlogListPage />} />
          <Route path="/blog/:id" element={<BlogDetailsPage />} />
          <Route
            path="/questionbank"
            element={<QuestionBank userId={defaultUserId} courseId={defaultCourseId} />}
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

