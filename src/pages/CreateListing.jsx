import React from "react";
import { useState } from "react";
export default function CreateListing() {
  const [formData, setFormData] = useState({
    type: "rent",
  });
  const { type } = formData;
  function onChange(e) {
    console.log("test");
  }
  return (
    <>
      <div className="max-w-2xl m-auto px-2">
        <h1 className="text-3xl text-center font-bold mt-5">
          Create Your Listing
        </h1>
        <form>
          <p className="text-lg mt-6 text-center font-semibold">
            Sell / Rent
          </p>
          <div className="flex justify-center items-center space-x-6 mt-2">
            <button
              className={`w-full hover:bg-red-600 active:bg-red-700 rounded-md bg-red-500 px-24 py-2 text-white uppercase font-semibold txt-xl shadow-lg ${
                type === "rent"
              }`}
              type="button"
              id="type"
              value={type}
              onClick={onChange}
            >
              Sell
            </button>
            <button
              className={`w-full hover:bg-slate-600 active:bg-slate-700 rounded-md bg-slate-500 px-24 py-2 text-white uppercase font-semibold txt-xl shadow-lg ${
                type === "rent"
              }`}
              type="button"
              id="type"
              value={type}
              onClick={onChange}
            >
              Rent
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
