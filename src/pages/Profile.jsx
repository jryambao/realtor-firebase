import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { getAuth } from "firebase/auth";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
function Profile() {
  const auth = getAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: auth.currentUser.displayName,
    email: auth.currentUser.email,
  });

  function onLogout() {
    auth.signOut();
    navigate("/sign-in");
  }

  const { name, email, password } = formData;

  return (
    <>
      <section className="bg-gray-50 max-w-6xl mx-auto flex justify-center items-center flex flex-col">
        <h1 className="font-bold text-3xl text-center mt-6">
          Profile
        </h1>
        <div className="mt-6 w-full mx-auto md:w-[50%]">
          <form className="">
            <input
              type="text"
              id="name"
              className="block border border-grey-light w-full p-3 rounded mb-4 text-xl"
              name="name"
              value={name}
              placeholder={name}
              disabled
            />
            <input
              type="email"
              id="email"
              className="block border border-grey-light w-full p-3 rounded mb-4 text-xl"
              name="email"
              value={email}
              placeholder={email}
              disabled
            />
            <input
              type="password"
              id="password"
              className="block border border-grey-light w-full p-3 rounded mb-4 text-xl"
              name="password"
              placeholder="Password"
              disabled
            />
            <div className="flex justify-between whitespace-nowrap text-sm sm:text-lg mb-6">
              <p className="flex justify-start">
                Do you want to change your name?
                <span className="font-bold text-red-600 hover:text-red-700 transition ease-in-out duration-150 cursor-pointer ml-1">
                  Edit
                </span>
              </p>
              <p
                onClick={onLogout}
                className="text-blue-600 hover:text-blue-700 transition ease-in-out duration-150 cursor-pointer"
              >
                Sign out
              </p>
            </div>
            <button
              type="submit"
              className="w-full text-center py-3 rounded bg-green-500 text-white hover:bg-green-dark focus:outline-none my-1"
            >
              Update
            </button>
          </form>
        </div>
      </section>
    </>
  );
}

export default Profile;
