import React from "react";
import { FcGoogle } from "react-icons/fc";

export default function OAuth() {
  return (
    <div>
      <button
        className="flex justify-center items-center active:bg-red-300 mt-6 w-full my-3 p-3 uppercase shadow-md rounded-md text-xl text-white border-gray-500 bg-red-700 hover:bg-red-600  hover:text-white transition duration-150 ease-in-out"
        type="submit"
      >
        <FcGoogle className="bg-white rounded-full" />
        <span className="uppercase text-lg px-4">
          Continue With Google
        </span>
      </button>
    </div>
  );
}
