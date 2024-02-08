import React from "react";
import { useState } from "react";
export default function CreateListing() {
  const [formData, setFormData] = useState({
    type: "rent",
    name: "",
    bedrooms: "1",
    bathrooms: "1",
    parking: false,
    furnished: false,
    address: "",
    description: "",
    offer: false,
    regularPrice: "1",
    discountedPrice: "1",
    images: [],
  });
  const {
    type,
    name,
    bedrooms,
    bathrooms,
    parking,
    furnished,
    address,
    description,
    offer,
    regularPrice,
    discountedPrice,
    images,
  } = formData;

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
                  ? "bg-slate-500"
                  : "bg-red-500"
              }`}
              type="button"
              id="type"
              value={type}
              onClick={onChange}
            >
              Sell
            </button>
            <button
              className={`w-full hover:bg-slate-600 active:bg-slate-700 rounded-md px-24 py-2 text-white uppercase font-semibold txt-xl shadow-lg ${
                type === "sale"
                  ? "bg-slate-500"
                  : "bg-red-500"
              }`}
              type="button"
              id="type"
              value={type}
              onClick={onChange}
            >
              Rent
            </button>
          </div>
          <p className="text-lg mt-6 text-center font-semibold">
            Name
          </p>
          <input
            className="w-full rounded-md shadow-md px-6 py-2 border-gray-300 border-1 text-lg text-gray-700 transition duration-150 ease-in-out focus:text-gray-600 focus:border-slate-600 mb-6"
            type="text"
            id="name"
            value={name}
            placeholder="Name"
            maxLength="32"
            minLength="10"
            onChange={onChange}
            required
          />
          <div className="flex justify-start space-x-3">
            <div>
              <p className="text-lg font-semibold">
                Beds
              </p>
              <input
                className="w-full text-xl text-gray-600 px-3 py-2 bg-white border border-gray-700 rounded-md transition duration-150 ease-in-out focus:text-gray-900 focus:bg-white focus:border-slate-600"
                type="number"
                value={bedrooms}
                id="bed"
                onChange={onChange}
                min="1"
                max="50"
                required
              />
            </div>

            <div>
              <p className="text-lg font-semibold">
                Baths
              </p>
              <input
                className="w-full text-xl text-gray-600 px-3 py-2 bg-white border border-gray-700 rounded-md transition duration-150 ease-in-out focus:text-gray-900 focus:bg-white focus:border-slate-600"
                type="number"
                value={bathrooms}
                id="baths"
                onChange={onChange}
                min="1"
                max="50"
                required
              />
            </div>
          </div>

          <div className="mt-6">
            <p className="text-lg font-semibold">
              Parking spot
            </p>
            <div className="flex justify-center items-center space-x-6 mt-2">
              <button
                className={`w-full hover:bg-red-600 active:bg-red-700 rounded-md bg-red-500 px-24 py-2 text-white uppercase font-semibold txt-xl shadow-lg ${
                  !parking
                    ? "bg-slate-500"
                    : "bg-red-500"
                }`}
                type="button"
                id="parking"
                value={parking}
                onClick={onChange}
              >
                Yes
              </button>
              <button
                className={`w-full hover:bg-slate-600 active:bg-slate-700 rounded-md px-24 py-2 text-white uppercase font-semibold txt-xl shadow-lg ${
                  parking
                    ? "bg-slate-500"
                    : "bg-red-500"
                }`}
                type="button"
                id="parking"
                value={parking}
                onClick={onChange}
              >
                No
              </button>
            </div>
          </div>

          <div className="mt-6">
            <p className="text-lg font-semibold">
              Furnished
            </p>
            <div className="flex justify-center items-center space-x-6 mt-2">
              <button
                className={`w-full hover:bg-red-600 active:bg-red-700 rounded-md bg-red-500 px-24 py-2 text-white uppercase font-semibold txt-xl shadow-lg ${
                  !furnished
                    ? "bg-slate-500"
                    : "bg-red-500"
                }`}
                type="button"
                id="furnished"
                value={furnished}
                onClick={onChange}
              >
                Yes
              </button>
              <button
                className={`w-full hover:bg-slate-600 active:bg-slate-700 rounded-md px-24 py-2 text-white uppercase font-semibold txt-xl shadow-lg ${
                  furnished
                    ? "bg-slate-500"
                    : "bg-red-500"
                }`}
                type="button"
                id="furnished"
                value={furnished}
                onClick={onChange}
              >
                No
              </button>
            </div>
          </div>
          <p className="text-lg mt-6 text-start font-semibold">
            Address
          </p>
          <textarea
            className="w-full rounded-md shadow-md px-3 py-2 border-gray-300 border-1 text-lg text-gray-700 transition duration-150 ease-in-out focus:text-gray-600 focus:border-slate-600 mb-6"
            type="text"
            id="address"
            placeholder="Address"
            value={address}
            onChange={onChange}
            required
          />

          <p className="text-lg text-start font-semibold">
            Description
          </p>
          <textarea
            className="w-full rounded-md shadow-md px-3 py-2 border-gray-300 border-1 text-lg text-gray-700 transition duration-150 ease-in-out focus:text-gray-600 focus:border-slate-600 mb-6"
            type="text"
            id="description"
            placeholder="Description"
            value={description}
            onChange={onChange}
            required
          />

          <div>
            <p className="text-lg font-semibold">
              Offer
            </p>
            <div className="flex justify-center items-center space-x-6 mt-2">
              <button
                className={`w-full hover:bg-red-600 active:bg-red-700 rounded-md bg-red-500 px-24 py-2 text-white uppercase font-semibold txt-xl shadow-lg ${
                  !offer
                    ? "bg-slate-500"
                    : "bg-red-500"
                }`}
                type="button"
                id="furnished"
                value={offer}
                onClick={onChange}
              >
                Yes
              </button>
              <button
                className={`w-full hover:bg-slate-600 active:bg-slate-700 rounded-md px-24 py-2 text-white uppercase font-semibold txt-xl shadow-lg ${
                  offer
                    ? "bg-slate-500"
                    : "bg-red-500"
                }`}
                type="button"
                id="offer"
                value={offer}
                onClick={onChange}
              >
                No
              </button>
            </div>
          </div>
          <div>
            <p className="mt-6 text-lg text-start font-semibold">
              Regular Price
            </p>
            <div className="flex justify-start items-center space-x-6">
              <input
                className="w-1/2 text-xl text-gray-600 px-3 py-2 bg-white border border-gray-700 rounded-md transition duration-150 ease-in-out focus:text-gray-900 focus:bg-white focus:border-slate-600"
                type="number"
                value={regularPrice}
                id="regularprice"
                onChange={onChange}
                min="69"
                max="50000000"
                required
              />
              {type === "rent" && (
                <div className="">
                  <p className="text-lg whitespace-nowrap">
                    $ / Month
                  </p>
                </div>
              )}
            </div>
          </div>

          <p className="mt-3 text-lg text-start font-semibold">
            Discounted Price
          </p>
          <input
            className="w-1/2 text-xl text-gray-600 px-3 py-2 bg-white border border-gray-700 rounded-md transition duration-150 ease-in-out focus:text-gray-900 focus:bg-white focus:border-slate-600"
            type="number"
            value={discountedPrice}
            id="discountedprice"
            onChange={onChange}
            min="30"
            max="9000"
            required
          />
        </form>
      </div>
    </>
  );
}
