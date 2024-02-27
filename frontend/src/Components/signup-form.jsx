import React from "react";
import { FirstName, LastName, SignUp, SignInInstead } from "./signup-input";
import { Email, Pwd } from "./input";
import { useState } from "react";

const SignUpForm = () => {
  const [selectedRole, setSelectedRole] = useState("Teacher");

  const handleRoleToggle = (role) => {
    setSelectedRole(role);
  };

  return (
    <div className="w-10/12 max-w-[700px] px-10 py-10 rounded-3xl bg-gray-200 border-2 border-gray-100">
      <div className="w-full h-100">
        <h1 className="text-5xl md:text-2xl font-semibold leading-tight mt-4">
          Create an account
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

        <form className="mt-3" action="#" method="POST">
          <div className="grid grid-cols-2 gap-4">
            <FirstName />
            <LastName />
          </div>
          <div className="mt-4">
            <Email />
          </div>

          <Pwd />

          <SignUp />

          <SignInInstead />
        </form>
      </div>
    </div>
  );
};

export default SignUpForm;
