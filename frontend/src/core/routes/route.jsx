import React from 'react';
import {
  createBrowserRouter,
  RouterProvider,
} from 'react-router-dom';
/* internal components */
import SignUp from '../../pages/Signup';
import Login from '../../pages/Login';
import ForgotPwd from '../../pages/ForgotPwd';
import LandingPage from '../../pages/Landing';
import Error from '../../Components/error';
import FAQS from '../../pages/Faqs/Faqs.tsx';
import Dashboard from '../../pages/Dashboard/Dashboard.tsx';
import Contactus from '../../pages/Contact/Contactus.tsx';
import PricingPage from '../../Components/PricingPage';
import BlogList from '../../Components/BlogListPage';
import BlogFormPage from '../../Components/BlogFormPage';
import BlogDetailsPage from '../../Components/BlogDetails';
import Questions from '../../Components/molecules/questions';
import QnAPage from '../../Components/organisms/qnaPage';

function RouteConfig() {
  const routes = createBrowserRouter([
    {
      path: '/',
      element: <LandingPage />,
      errorElement: <Error />,
    },
    {
      path: '/login',
      element: <Login />,
      errorElement: <Error />,
    },
    {
      path: '/register',
      element: <SignUp />,
      errorElement: <Error />,
    },
    {
      path: '/forgotpwd',
      element: <ForgotPwd />,
      errorElement: <Error />,
    },
    {
      path: '/contact us',
      element: <Contactus />,
      errorElement: <Error />,
    },
    {
      path: '/faqs',
      element: <FAQS></FAQS>,
      errorElement: <Error />,
    },
    {
      path: '/',
      element: <Dashboard />,
      errorElement: <Error />,
    },
    {
      path: '/pricing',
      element: <PricingPage />,
      errorElement: <Error />,
    },
    {
      path: '/blogs',
      element: <BlogList />,
      errorElement: <Error />,
    },
    {
      path: '/blog/:id',
      element: <BlogDetailsPage />,
      errorElement: <Error />,
    },
    {
      path: '/newblog',
      element: <BlogFormPage />,
      errorElement: <Error />,
    },
    {
      path: '/questions',
      element: <Questions />,
      errorElement: <Error />,
      children: [{
        path: 'qid',
        element: <QnAPage />,
      }],
    },
  ]);

  return (
    <RouterProvider router={routes} />
  );
}

export default RouteConfig;
