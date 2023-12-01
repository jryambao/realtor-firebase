import React from "react";
import { FcGoogle } from "react-icons/fc";

export default function OAuth() {
  return (
    <div>
      <button
        className="flex justify-center items-center active:bg-red-300 mt-6 w-full my-3 p-3 font-medium uppercase shadow-md rounded-md text-xl text-black border-gray-500 bg-white hover:bg-red-600  hover:text-white transition duration-150 ease-in-out"
        type="submit"
      >
        <FcGoogle />
        <span className="uppercase text-xl font-medium px-4">
          Continue With Google
        </span>
      </button>
    </div>
  );
}
