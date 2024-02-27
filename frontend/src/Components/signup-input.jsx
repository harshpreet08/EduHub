import React from "react";
import {Link} from "react-router-dom";  

export const FirstName = () => {
  return (
    <div className="mt-6">
      <label className="block text-gray-700 font-semibold">First Name</label>
      <input
        type="text"
        name="firstName"
        id="firstName"
        placeholder="Enter First Name"
        className="w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border border-gray-700 focus:border-blue-500
                focus:bg-white focus:outline-none"
        required
      />
    </div>
  );
}

export const LastName = () => {
  return (
    <div className="mt-6">
      <label className="block text-gray-700 font-semibold">Last Name</label>
      <input
        type="text"
        name="lastName"
        id="lastName"
        placeholder="Enter Last Name"
        className="w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border border-gray-700 focus:border-blue-500
                focus:bg-white focus:outline-none"
        required
      />
    </div>
  );
}


export const SignUp = () => {
  return (
    <button
      type="submit"
      className="w-full block bg-indigo-500 hover:bg-indigo-400 focus:bg-indigo-400 text-white font-semibold rounded-lg
              px-4 py-3 mt-6"
    >
      Sign Up
    </button>
  );
}

export const SignInInstead = () => {
  return (
    <p className="mt-8">
      Already have an account?{" "}
      <Link to="/login" className="text-blue-500 hover:text-blue-700 font-semibold">
        Sign In
      </Link>
    </p>
  );
}