import React, { lazy, Suspense, useState } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Loader from "../../Components/atom/loader";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useEffect } from "react";
import { setUserData } from "../../Components/slices/userSlice";
import { useSelector, useDispatch } from "react-redux";


/* internal components */
const SignUp = lazy(() => import("../../pages/Signup"));
const Login = lazy(() => import("../../pages/Login"));
const ForgotPwd = lazy(() => import("../../pages/ForgotPwd"));
const LandingPage = lazy(() => import("../../pages/Landing"));
const Error = lazy(() => import("../../Components/error"));
const Faqs = lazy(() => import("../../pages/Faqs/Faqs.tsx"));
const Dashboard = lazy(() => import("../../pages/Dashboard/Dashboard.tsx"));
const Contactus = lazy(() => import("../../pages/Contact/Contactus.tsx"));
const PricingPage = lazy(() => import("../../Components/PricingPage"));
const BlogList = lazy(() => import("../../Components/BlogListPage"));
const BlogFormPage = lazy(() => import("../../Components/BlogFormPage"));
const BlogDetailsPage = lazy(() => import("../../Components/BlogDetails"));
const QuestionBank = lazy(() =>
  import("../../pages/Tests/Professor/JSX/QuestionBank")
);
const AddQuestion = lazy(() =>
  import("../../pages/Tests/Professor/JSX/AddQuestion")
);
const CreateTest = lazy(() =>
  import("../../pages/Tests/Professor/JSX/CreateTest")
);
const EditQuestion = lazy(() =>
  import("../../pages/Tests/Professor/JSX/EditQuestion")
);
const TestList = lazy(() => import("../../pages/Tests/Student/JSX/TestList"));
const TestScreen = lazy(() =>
  import("../../pages/Tests/Student/JSX/TestScreen")
);
const ResultList = lazy(() =>
  import("../../pages/Tests/Student/JSX/ResultList")
);
const ResultDetailedView = lazy(() =>
  import("../../pages/Tests/Student/JSX/ResultDetailedView")
);
const FinishTestScreen = lazy(() =>
  import("../../pages/Tests/Student/JSX/FinishTestScreen")
);

const Questions = lazy(() =>
  import("../../Components/molecules/questions/Questions")
);
const QnAPage = lazy(() => import("../../Components/organisms/qnaPage"));
const EditBlog = lazy(() => import("../../Components/EditBlog"));
const Success = lazy(() =>
  import("../../Components/molecules/payment/success")
);
const Cancel = lazy(() => import("../../Components/molecules/payment/failure"));

const ErrorElement = () => {
  <Suspense fallback={<Loader />}>
    <Error />
  </Suspense>;
};

const ProtectedRoute = (props) => {
  try {
    const [authenticated, SetAuthenticated] = useState(false);
    const dispatch = useDispatch();

    useEffect(() => {
      axios
        .post("http://localhost:6002/user/validate", null, {
          withCredentials: true,
        })
        .then((response) => {
          SetAuthenticated(true);
          const userData = response?.data?.data;
          const userPayload = {
            userId: userData._id,
            firstName: userData.firstName,
            lastName: userData.lastName,
            email: userData.email,
            role: userData.role,
          };
    
          dispatch(setUserData(userPayload));
        })
        .catch((error) => {
          console.log(error);
          navigate("/login");
        });
    }, []);

    console.log("Inside protected route");
    var navigate = useNavigate();

    return (
      <Suspense fallback={<Loader />}>
        {authenticated && <props.component />}
      </Suspense>
    );
  } catch (error) {
    console.log(error);
    navigate("/login");
  }
};

const PublicRoute = (props) => {
  try {
    const [authenticated, SetAuthenticated] = useState(false);
    const [allowAccess, setAllowAccess] = useState(false);

    useEffect(() => {
      axios
        .post("http://localhost:6002/user/validate", null, {
          withCredentials: true,
        })
        .then(() => SetAuthenticated(true))
        .catch((error) => {
          setAllowAccess(true);
        });
    }, []);

    console.log("Inside public route");
    var navigate = useNavigate();

    return (
      <Suspense fallback={<Loader />}>
        {authenticated && navigate("/dashboard")}
        {allowAccess && <props.component />}
      </Suspense>
    );
  } catch (error) {
    console.log(error);
    navigate("/login");
  }
};

const privateRoutes = {
  "/dashboard": Dashboard,
  "/pricing": PricingPage,
  "/blogs": BlogList,
  "/blog/:id": BlogDetailsPage,
  "/newblog": BlogFormPage,
  "/questions": Questions,
  "/questions/:qId": QnAPage,
  "/success": Success,
  "/cancel": Cancel,
  "/edit-blog/:id": EditBlog,
  "/questionbank": QuestionBank,
  "/createtest": CreateTest,
  "/addquestion": AddQuestion,
  "/editquestion": EditQuestion,
  "/test-list": TestList,
  "/start-test": TestScreen,
  "/result-list": ResultList,
  "/result-detailed-view": ResultDetailedView,
  "/finish-test": FinishTestScreen,
};

const publicRoutes = {
  "/": LandingPage,
  "/login": Login,
  "/register": SignUp,
  "/forgotpwd": ForgotPwd,
  "/contactus": Contactus,
  "/faqs": Faqs,
};

function RouteConfig() {
  const privateRouteComponents = Object.entries(privateRoutes).map(
    ([path, Component]) => ({
      path,
      element: (
        <Suspense fallback={<Loader />}>
          <ProtectedRoute component={Component} path={path} />
        </Suspense>
      ),
      errorElement: ErrorElement,
    })
  );

  const publicRouteComponents = Object.entries(publicRoutes).map(
    ([path, Component]) => ({
      path,
      element: (
        <Suspense fallback={<Loader />}>
          <PublicRoute component={Component} path={path} />
        </Suspense>
      ),
      errorElement: ErrorElement,
    })
  );

  const routeComponents = [...privateRouteComponents, ...publicRouteComponents];

  console.log(routeComponents);

  const router = createBrowserRouter(routeComponents);

  return <RouterProvider router={router} />;
}

export default RouteConfig;
