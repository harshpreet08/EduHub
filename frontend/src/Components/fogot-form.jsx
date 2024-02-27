import { Email } from "./input";
import BackLogo from "../assets/images/back-logo-1.webp";
import {Link} from "react-router-dom";

export const ForgotForm = () => {
  return (
    <div className=" w-10/12 max-w-[700px] px-10 py-10 rounded-3xl bg-gray-200 border-2 border-gray-100">
      <div className="w-full h-100">
        <h1 className="text-10xl md:text-3xl font-semibold leading-tight mt-4">
          Forgot
        </h1>
        <h1 className="text-5xl md:text-2xl font-semibold leading-tight mt-2">
          your password?
        </h1>
        <hr className="my-6 border-gray-300 w-full" />

        <form className="mt-10" action="#" method="POST">
          <Email />

          <button
            type="submit"
            className="w-full block bg-indigo-500 hover:bg-indigo-400 focus:bg-indigo-400 text-white font-semibold rounded-lg
              px-4 py-3 mt-6"
          >
            Send OTP
          </button>
        </form>
        <div className="text-center mt-6">
          <Link to="/" className="text-blue-500 hover:text-blue-700 font-semibold flex items-center justify-center">
            <img src={BackLogo} alt="Back" className="h-5 w-5 mr-2" />
            Back to Login
          </Link>
        </div>
      </div>
    </div>
  );
};
