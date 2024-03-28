import React from "react";
import ReactDOM from "react-dom/client";
/* internal components */
import App from "./src/core/config/App";
import Login from "./src/pages/Login.jsx";
import { createBrowserRouter, Router, RouterProvider } from "react-router-dom";
import SignUp from "./src/pages/Signup.jsx";
import ForgotPwd from "./src/pages/ForgotPwd.jsx";
import LandingPage from "./src/pages/Landing.jsx";
import Error from "./src/components/error.jsx";
import FAQS from "./src/pages/Faqs/Faqs";
import Dashboard from "./src/pages/Dashboard/Dashboard";
import Contactus from "./src/pages/Contact/Contactus";
import PricingPage from "./src/Components/PricingPage.jsx";
import BlogList from "./src/Components/BlogListPage.jsx";
import BlogFormPage from "./src/Components/BlogFormPage.jsx";
import BlogDetailsPage from "./src/Components/BlogDetails.jsx";
import QuestionBank from "./src/pages/Tests/Professor/JSX/QuestionBank.jsx";
import AddQuestion from "./src/pages/Tests/Professor/JSX/AddQuestion.jsx";
import EditQuestion from "./src/pages/Tests/Professor/JSX/EditQuestion.jsx";
import CreateTest from "./src/pages/Tests/Professor/JSX/CreateTest.jsx";
import TestList from "./src/pages/Tests/Student/JSX/TestList.jsx";
import TestScreen from "./src/pages/Tests/Student/JSX/TestScreen.jsx";
import FinishTestScreen from "./src/pages/Tests/Student/JSX/FinishTestScreen.jsx";
import ResultList from "./src/pages/Tests/Student/JSX/ResultList.jsx";
import ResultDetailedView from "./src/pages/Tests/Student/JSX/ResultDetailedView.jsx";

const appRoute = createBrowserRouter([
  {
    path: "/",
    element: <LandingPage />,
    errorElement: <Error />,
  },
  {
    path: "/login",
    element: <Login />,
    errorElement: <Error />,
  },
  {
    path: "/register",
    element: <SignUp />,
    errorElement: <Error />,
  },
  {
    path: "/forgotpwd",
    element: <ForgotPwd />,
    errorElement: <Error />,
  },
  {
    path: "/contact us",
    element: <Contactus></Contactus>,
    errorElement: <Error />,
  },
  {
    path: "/faqs",
    element: <FAQS></FAQS>,
    errorElement: <Error />,
  },
  {
    path: "/",
    element: <Dashboard></Dashboard>,
    errorElement: <Error />,
  },
  {
    path: "/pricing",
    element: <PricingPage></PricingPage>,
    errorElement: <Error />,
  },
  {
    path: "/blogs",
    element: <BlogList></BlogList>,
    errorElement: <Error />,
  },
  {
    path: "/blog/:id",
    element: <BlogDetailsPage></BlogDetailsPage>,
    errorElement: <Error />,
  },
  {
    path: "/newblog",
    element: <BlogFormPage></BlogFormPage>,
    errorElement: <Error />,
  },
  {
    path: "/questionbank",
    element: <QuestionBank/>,
    errorElement: <Error />,
  },
  {
    path: "/addquestion",
    element: <AddQuestion />,
    errorElement: <Error />,
  },
  {
    path: "/editquestion",
    element: <EditQuestion/>,
    errorElement: <Error />,
  },
  {
    path: "/createtest",
    element: <CreateTest/>,
    errorElement: <Error/>
  },
  {
    path: "/test-list",
    element: <TestList/>,
    errorElement: <Error/>
  },
  {
    path:"/start-test",
    element: <TestScreen/>,
    errorElement: <Error/>
  },
  {
    path:"/finish-test",
    element:<FinishTestScreen/>,
    errorElement:<Error/>
  },
  {
    path:"/result-list",
    element: <ResultList/>,
    errorElement: <Error/>
  },
  {
    path:"/result-detailed-view",
    element:<ResultDetailedView/>,
    errorElement: <Error/>
  }
]);

const rootElement = document.getElementById("root");
const root = ReactDOM.createRoot(rootElement);

root.render(
  // <App />
  <RouterProvider router={appRoute} />
);
