import React from "react";
import { useState } from "react";
import {
  AiFillEye,
  AiFillEyeInvisible,
} from "react-icons/ai";
import { Link } from "react-router-dom";
import OAuth from "../components/OAuth";
import {
  signInWithEmailAndPassword,
  getAuth,
} from "firebase/auth";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
function SignIn() {
  const [showPassword, setShowPassword] =
    useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const auth = getAuth();
      const userCredential =
        await signInWithEmailAndPassword(
          auth,
          email,
          password
        );
      const user = userCredential.user;
      console.log(user);

      if (user) {
        navigate("/");
      }
    } catch (error) {
      toast.error("Bad User Credentials");
    }
  };

  const { email, password } = formData;
  return (
    <>
      <h1 className="font-bold text-3xl uppercase text-center">
        Sign In
      </h1>
      <div className="flex justify-center flex-wrap items-center px-6 py-12 mx-auto max-w-6xl">
        <div className="md:w-[67%] lg:w-[50%] mb-12 md:mb-6">
          <img
            className="w-full rounded-2xl"
            src="https://images.unsplash.com/photo-1523217582562-09d0def993a6?q=80&w=880&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="img"
          />
        </div>
        <div className="md:w-[67%] lg:w-[40%] w-full mx-12">
          <form onSubmit={onSubmit} className="">
            <input
              className="transition ease-in-out w-full my-3 p-3 rounded-md text-xl text-gray-700 bg-white border-gray-300"
              type="email"
              id="email"
              value={email}
              onChange={onChange}
              placeholder="Username"
            />
            <div className="relative">
              <input
                className="transition ease-in-out w-full p-3 rounded-md text-xl text-gray-700 bg-white border-gray-300"
                type={
                  showPassword
                    ? "text"
                    : "password"
                }
                id="password"
                value={password}
                onChange={onChange}
                placeholder="Password"
              />
              {showPassword ? (
                <AiFillEyeInvisible
                  className="absolute z-10 right-3 top-4 text-xl cursor-pointer"
                  onClick={() =>
                    setShowPassword(
                      (prevState) => !prevState
                    )
                  }
                />
              ) : (
                <AiFillEye
                  className="absolute z-10 right-3 top-4 text-xl cursor-pointer"
                  onClick={() =>
                    setShowPassword(
                      (prevState) => !prevState
                    )
                  }
                />
              )}
            </div>

            <div className="flex text-sm sm:text-lg pr-3 mt-4 items-start justify-between whitespace-nowrap">
              <p>
                Don&apos;t have a account?
                <Link
                  className="text-red-700 font-bold hover:text-black transition duration-150 ease-in-out"
                  to="/sign-up"
                >
                  {" "}
                  Sign Up
                </Link>
              </p>
              <p>
                <Link
                  className="text-red-700 font-bold hover:text-black transition duration-150 ease-in-out"
                  to="/forgot-password"
                >
                  Forgot Password?
                </Link>
              </p>
            </div>
            <button
              className="active:bg-blue-900 mt-6 w-full my-3 p-3 font-semibold uppercase shadow-md rounded-md text-xl text-white bg-blue-700 hover:bg-blue-800 transition duration-150 ease-in-out"
              type="submit"
            >
              Sign In
            </button>
            <div className="flex items-center my-2 before:border-t before:flex-1 before:border-gray-300 after:border-t after:flex-1 after:border-gray-300">
              <span className="px-4 text-gray-500">
                OR
              </span>
            </div>
            <OAuth />
          </form>
        </div>
      </div>
    </>
  );
}

export default SignIn;
