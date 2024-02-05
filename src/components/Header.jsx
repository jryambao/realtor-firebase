import React, { useEffect } from "react";
import logo from "../assets/realtor-logo.png";
import { useState } from "react";
import {
  useLocation,
  useNavigate,
} from "react-router-dom";
import {
  getAuth,
  onAuthStateChanged,
} from "firebase/auth";

export default function Header() {
  const [pageState, setPageState] = useState();

  const location = useLocation();
  const navigate = useNavigate();
  const auth = getAuth();

  // Changes the text dynamically when user is logged in
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setPageState("Profile");
      } else {
        setPageState("Sign In");
      }
    });
  }),
    [auth];

  function pathMatchRoute(route) {
    if (route === location.pathname) {
      console.log(route);
      return true;
    }
    return false;
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
                className={`text-xl cursor-pointer py-3 font-semibold transition-all duration-300 ease-in-out ${
                  pathMatchRoute("/")
                    ? "text-black border-b-[6px] border-b-red-500"
                    : "border-b-[6px] border-b-transparent text-gray-800"
                }`}
              >
                Home
              </li>
              <li
                onClick={() =>
                  navigate("/offers")
                }
                className={`text-xl cursor-pointer py-3 font-semibold transition-all duration-300 ease-in-out ${
                  pathMatchRoute("/offers")
                    ? "text-black border-b-[6px] border-b-red-500"
                    : "border-b-[6px] border-b-transparent text-gray-800"
                }`}
              >
                Offers
              </li>
              <li
                onClick={() =>
                  navigate("/profile")
                }
                className={`text-xl cursor-pointer py-3 font-semibold transition-all duration-300 ease-in-out ${
                  pathMatchRoute("/sign-in") ||
                  pathMatchRoute("/profile")
                    ? "text-black border-b-[6px] border-b-red-500"
                    : "border-b-[6px] border-b-transparent text-gray-800"
                }`}
              >
                {pageState}
              </li>
            </ul>
          </nav>
        </div>
      </header>
    </div>
  );
}
