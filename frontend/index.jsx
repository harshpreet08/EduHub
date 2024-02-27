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
    element: <ForgotPwd />,
    errorElement: <Error/>
  },
]);

const rootElement = document.getElementById("root");
const root = ReactDOM.createRoot(rootElement);

root.render(
  // <App />
  <RouterProvider router={appRoute} />
);
