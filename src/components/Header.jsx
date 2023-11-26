import React from "react";
import logo from "../assets/realtor-logo.png";
import {
  useLocation,
  useNavigate,
} from "react-router-dom";
export default function Header() {
  const location = useLocation();
  const navigate = useNavigate();
  function pathMathRoute(route) {
    if (route === location.pathname) {
      console.log(route);
      return true;
    }
  }

  return (
    <div className="sticky top-0 z-50 bg-white shadow-md">
      <header className="max-w-7xl mx-auto">
        <div className="flex px-12 items-center justify-between">
          <div className="">
            <img
              onClick={() => navigate("/")}
              className="h-26 w-full cursor-pointer"
              src={logo}
              alt="Realtor Logo"
            />
          </div>
          <nav className="">
            <ul className="flex space-x-10">
              <li
                onClick={() => navigate("/")}
                className={`uppercase text-xl cursor-pointer py-3 font-semibold text-gray-800 border-b-[6px] border-b-transparent ${
                  pathMathRoute("/") &&
                  "text-black border-b-red-500"
                }`}
              >
                Home
              </li>
              <li
                onClick={() =>
                  navigate("/offers")
                }
                className={`uppercase text-xl cursor-pointer py-3 font-semibold text-gray-800 border-b-[6px] border-b-transparent ${
                  pathMathRoute("/offers") &&
                  "text-black border-b-red-500"
                }`}
              >
                Offers
              </li>
              <li
                onClick={() =>
                  navigate("/sign-in")
                }
                className={`uppercase text-xl cursor-pointer py-3 font-semibold text-gray-800 border-b-[6px] border-b-transparent ${
                  pathMathRoute("/sign-in") &&
                  "text-black border-b-red-500"
                }`}
              >
                Sign In
              </li>
            </ul>
          </nav>
        </div>
      </header>
    </div>
  );
}
