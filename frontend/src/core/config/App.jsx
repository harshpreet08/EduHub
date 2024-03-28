import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import NavBar from "../../components/NavBar";
import BlogFormPage from "../../components/BlogFormPage";
import BlogListPage from "../../components/BlogListPage";
import BlogDetailsPage from "../../components/BlogDetails";
import PricingPage from "../../components/PricingPage";
import QuestionBank from "../../pages/Tests/Professor/JSX/QuestionBank"; 
import "../../components/Global.css";
import React from 'react';
import NavBar from '../../components/NavBar';
import Router from '../routes/route';

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

