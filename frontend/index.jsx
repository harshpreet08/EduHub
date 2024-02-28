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

const appRoute = createBrowserRouter([
  {
    path: "/",
    element: <LandingPage />,
    errorElement: <Error/>
  },
  {
    path: "/login",
    element: <Login/>,
    errorElement: <Error/>
  },
  {
    path: "/register",
    element: <SignUp />,
    errorElement: <Error/>
  },
  {
    path: "/forgotpwd",
    element: <ForgotPwd />,
    errorElement: <Error/>
  },
  {
    path:"/contact us",
    element: <Contactus></Contactus>,
    errorElement: <Error/>
  },
  {
    path:"/faqs",
    element: <FAQS></FAQS>,
    errorElement: <Error/>
  },
  {
    path:"/",
    element: <Dashboard></Dashboard>,
    errorElement: <Error/>
  },
]);

const rootElement = document.getElementById("root");
const root = ReactDOM.createRoot(rootElement);

root.render(
  // <App />
  <RouterProvider router={appRoute} />
);
