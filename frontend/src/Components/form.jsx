import { Email, Pwd, GoogleSignIn, CreateAccount } from "./input";
import { Link } from "react-router-dom";
import React, { useState } from "react";

const SignForm = () => {
  const [selectedRole, setSelectedRole] = useState("Teacher");

  const handleRoleToggle = (role) => {
    setSelectedRole(role);
  };

  return (
    <div className=" w-10/12 max-w-[700px] px-10 py-10 rounded-3xl bg-gray-200 border-2 border-gray-100">
      <div className="w-full h-100">
        <h1 className="text-5xl md:text-2xl font-semibold leading-tight mt-4">
          Log in to your account
        </h1>
        <div className="flex mb-8 mt-4">
          <div className="border-2 border-blue-500 rounded-md overflow-hidden">
            <button
              onClick={() => handleRoleToggle("Teacher")}
              className={`${
                selectedRole === "Teacher"
                  ? "bg-indigo-500 text-white"
                  : "text-blue-500"
              } font-semibold px-4 py-2 rounded-l-md`}
            >
              Teacher
            </button>
            <button
              onClick={() => handleRoleToggle("Student")}
              className={`${
                selectedRole === "Student"
                  ? "bg-indigo-500 text-white"
                  : "text-blue-500"
              } font-semibold px-4 py-2 rounded-r-md`}
            >
              Student
            </button>
          </div>
        </div>
        <hr className="my-6 border-gray-300 w-full" />

        <form className="mt-10" action="#" method="POST">
          <Email />

          <Pwd />

          <div className="text-right mt-2">
            <Link
              to="/forgotpwd"
              className="text-sm font-semibold text-gray-700 hover:text-blue-700 focus:text-blue-700"
            >
              Forgot Password?
            </Link>
          </div>

          <button
            type="submit"
            className="w-full block bg-indigo-500 hover:bg-indigo-400 focus:bg-indigo-400 text-white font-semibold rounded-lg
              px-4 py-3 mt-6"
          >
            Log In
          </button>
        </form>

        {/* <hr className="my-6 border-gray-300 w-full" /> */}

        {/* <GoogleSignIn /> */}

        <CreateAccount />
      </div>
    </div>
  );
};

export default SignForm;
