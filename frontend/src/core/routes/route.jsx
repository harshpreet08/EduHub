import React, { lazy, Suspense } from 'react';
import {
  createBrowserRouter,
  RouterProvider,
} from 'react-router-dom';
import Loader from '../../Components/atom/loader';
/* internal components */
const SignUp = lazy(() => import('../../pages/Signup'));
const Login = lazy(() => import('../../pages/Login'));
const ForgotPwd = lazy(() => import('../../pages/ForgotPwd'));
const LandingPage = lazy(() => import('../../pages/Landing'));
const Error = lazy(() => import('../../Components/error'));
const FAQS = lazy(() => import('../../pages/Faqs/Faqs.tsx'));
const Dashboard = lazy(() => import('../../pages/Dashboard/Dashboard.tsx'));
const Contactus = lazy(() => import('../../pages/Contact/Contactus.tsx'));
const PricingPage = lazy(() => import('../../Components/PricingPage'));
const BlogList = lazy(() => import('../../Components/BlogListPage'));
const BlogFormPage = lazy(() => import('../../Components/BlogFormPage'));
const BlogDetailsPage = lazy(() => import('../../Components/BlogDetails'));
const Questions = lazy(() => import('../../Components/molecules/questions'));
const QnAPage = lazy(() => import('../../Components/organisms/qnaPage'));

const ErrorElement = () => {
  <Suspense fallback={<Loader />}>
    <Error />
  </Suspense>;
};

const routes = {
  '/': LandingPage,
  '/login': Login,
  '/register': SignUp,
  '/forgotpwd': ForgotPwd,
  '/contactus': Contactus,
  '/faqs': FAQS,
  '/dashboard': Dashboard,
  '/pricing': PricingPage,
  '/blogs': BlogList,
  '/blog/:id': BlogDetailsPage,
  '/newblog': BlogFormPage,
  '/questions': Questions,
  '/questions/:qid': QnAPage,
};

function RouteConfig() {
  const routeComponents = Object.entries(routes).map(([path, Component]) => ({
    path,
    element: (
      <Suspense fallback={<Loader />}>
        <Component />
      </Suspense>
    ),
    errorElement: ErrorElement,
  }));

  const router = createBrowserRouter(routeComponents);

  return <RouterProvider router={router} />;
}

export default RouteConfig;