import React from "react";
import { useState } from "react";
import Spinner from "../components/Spinner";
import { toast } from "react-toastify";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { getAuth } from "firebase/auth";
import { v4 as uuidv4 } from "uuid";
import {
  addDoc,
  collection,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "../firebase";
import { useNavigate } from "react-router-dom";
export default function CreateListing() {
  const navigate = useNavigate();
  const [
    geolocationEnabled,
    setGeolocationEnabled,
  ] = useState(true);
  const auth = getAuth();

  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    type: "rent",
    name: "",
    bedrooms: 1,
    bathrooms: 1,
    parking: false,
    furnished: false,
    address: "",
    description: "",
    offer: false,
    regularPrice: 1,
    discountedPrice: 1,
    latitude: 0,
    longitude: 0,
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
    latitude,
    longitude,
    images,
  } = formData;

  function onChange(e) {
    let boolean = null;
    if (e.target.value === "true") {
      boolean = true;
    }
    if (e.target.value === "false") {
      boolean = false;
    }
    // Files
    if (e.target.files) {
      setFormData((prevState) => ({
        ...prevState,
        images: e.target.files,
      }));
    }

    // Text/Booleans/Numbers
    if (!e.target.files) {
      setFormData((prevState) => ({
        ...prevState,
        [e.target.id]: boolean ?? e.target.value,
      }));
    }
  }
  async function onSubmit(e) {
    e.preventDefault();
    setLoading(true);
    if (+discountedPrice >= +regularPrice) {
      setLoading(false);
      toast.error(
        "Discounted price needs to be less than regular price"
      );
      return;
    }
    if (images.length > 6) {
      toast.error("Max 6 images only");
      setLoading(false);
      return;
    }

    const geolocation = {};
    let location;

    if (geolocationEnabled) {
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${process.env.REACT_APP_GEOCODE_API_KEY}`
      );
      const data = await response.json();

      console.log(data);
      geolocation.lat =
        data.results[0]?.geometry.location.lat ??
        0;
      geolocation.lng =
        data.results[0]?.geometry.location.lng ??
        0;
      location =
        data.status === "ZERO_RESULTS" &&
        undefined;

      if (
        location === "ZERO_RESULTS" ||
        undefined
      ) {
        setLoading(false);
        toast.error(
          "Please enter a correct address"
        );
        return;
      }
    } else {
      geolocation.lat = latitude;
      geolocation.lng = longitude;
    }

    async function storeImage(image) {
      return new Promise((resolve, reject) => {
        const storage = getStorage();
        const fileName = `${
          auth.currentUser.uid
        }-${image.name}-${uuidv4()}`;
        const storageRef = ref(
          storage,
          "images/" + fileName
        );

        const uploadTask = uploadBytesResumable(
          storageRef,
          image
        );
        uploadTask.on(
          "state_changed",
          (snapshot) => {
            // Observe state change events such as progress, pause, and resume
            // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
            const progress =
              (snapshot.bytesTransferred /
                snapshot.totalBytes) *
              100;
            console.log(
              "Upload is " + progress + "% done"
            );
            switch (snapshot.state) {
              case "paused":
                console.log("Upload is paused");
                break;
              case "running":
                console.log("Upload is running");
                break;
            }
          },
          (error) => {
            // Handle unsuccessful uploads
            reject(error);
          },
          () => {
            // Handle successful uploads on complete
            // For instance, get the download URL: https://firebasestorage.googleapis.com/...
            getDownloadURL(
              uploadTask.snapshot.ref
            ).then((downloadURL) => {
              resolve(downloadURL);
            });
          }
        );
      });
    }

    const imgUrls = await Promise.all(
      [...images].map((image) =>
        storeImage(image)
      )
    ).catch((error) => {
      setLoading(false);
      toast.error("Images not uploaded");
      console.log(error);
      return;
    });

    const formDataCopy = {
      ...formData,
      imgUrls,
      geolocation,
      timestamp: serverTimestamp(),
    };
    delete formDataCopy.images;
    !formDataCopy.offer &&
      delete formDataCopy.discountedPrice;
    delete formDataCopy.latitude;
    delete formDataCopy.longitude;
    const docRef = await addDoc(
      collection(db, "listings"),
      formDataCopy
    );
    setLoading(false);
    toast.success("Listing created");

    navigate(
      `/category/${formDataCopy.type}/${docRef.id}`
    );
  }

  if (loading) {
    return <Spinner />;
  }
  return (
    <>
      <div className="max-w-2xl m-auto px-2">
        <h1 className="text-3xl text-center font-bold mt-5">
          Create Your Listing
        </h1>
        <form onSubmit={onSubmit}>
          <p className="text-lg mt-6 text-center font-semibold">
            Sell / Rent
          </p>
          <div className="flex justify-center items-center space-x-6 mt-2">
            <button
              className={`w-full hover:bg-slate-600 active:bg-slate-700 rounded-md bg-slate-500 px-24 py-2 uppercase font-semibold txt-xl shadow-lg ${
                type === "rent"
                  ? "bg-white text-black hover:text-white"
                  : "bg-slate-500 text-white"
              }`}
              type="button"
              id="type"
              value="sale"
              onClick={onChange}
            >
              Sell
            </button>
            <button
              className={`w-full hover:bg-slate-600 active:bg-slate-700 rounded-md px-24 py-2  uppercase font-semibold txt-xl shadow-lg ${
                type === "sale"
                  ? "bg-white text-black hover:text-white"
                  : "bg-slate-500 text-white"
              }`}
              type="button"
              id="type"
              value="rent"
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
                id="bedrooms"
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
                id="bathrooms"
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
                className={`w-full hover:bg-slate-600 active:bg-slate-700 rounded-md bg-slate-500 px-24 py-2 uppercase font-semibold  shadow-lg ${
                  !parking
                    ? "bg-white text-black hover:text-white"
                    : "bg-slate-500 text-white"
                }`}
                type="button"
                id="parking"
                value={true}
                onClick={onChange}
              >
                Yes
              </button>
              <button
                className={`w-full hover:bg-slate-600 active:bg-slate-700 rounded-md px-24 py-2 uppercase font-semibold shadow-lg ${
                  parking
                    ? "bg-white text-black hover:text-white"
                    : "bg-slate-500 text-white"
                }`}
                type="button"
                id="parking"
                value={false}
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
                className={`w-full hover:bg-slate-600 active:bg-slate-700 rounded-md bg-slate-500 px-24 py-2 uppercase font-semibold  shadow-lg ${
                  !furnished
                    ? "bg-white text-black hover:text-white"
                    : "bg-slate-500 text-white"
                }`}
                type="button"
                id="furnished"
                value={true}
                onClick={onChange}
              >
                Yes
              </button>
              <button
                className={`w-full hover:bg-slate-600 active:bg-slate-700 rounded-md px-24 py-2 uppercase font-semibold  shadow-lg ${
                  furnished
                    ? "bg-white text-black hover:text-white"
                    : "bg-slate-500 text-white"
                }`}
                type="button"
                id="furnished"
                value={false}
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
          {!geolocationEnabled && (
            <div className="flex justify-center items-center space-x-6 flex-col">
              <div className="w-full">
                <p className="text-lg text-start font-semibold">
                  Latitude
                </p>
                <input
                  className="w-1/2 text-xl text-gray-600 px-3 py-2 bg-white border border-gray-700 rounded-md transition duration-150 ease-in-out focus:text-gray-900 focus:bg-white focus:border-slate-600"
                  type="number"
                  id="latitude"
                  value={latitude}
                  onChange={onChange}
                  required
                  max="90"
                  min="-90"
                />
                <p className="mt-3 text-lg text-start font-semibold">
                  Longitude
                </p>
                <input
                  className="w-1/2 text-xl text-gray-600 px-3 py-2 bg-white border border-gray-700 rounded-md transition duration-150 ease-in-out focus:text-gray-900 focus:bg-white focus:border-slate-600"
                  type="number"
                  id="longitude"
                  value={longitude}
                  onChange={onChange}
                  required
                  min="-180"
                  max="180"
                />
              </div>
            </div>
          )}

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
                className={`w-full hover:bg-slate-600 active:bg-slate-700 rounded-md px-24 py-2 uppercase font-semibold shadow-lg ${
                  !offer
                    ? "bg-white text-black hover:text-white"
                    : "bg-slate-500 text-white"
                }`}
                type="button"
                id="offer"
                value={true}
                onClick={onChange}
              >
                Yes
              </button>
              <button
                className={`w-full hover:bg-slate-600 active:bg-slate-700 rounded-md px-24 py-2 uppercase font-semibold shadow-lg ${
                  offer
                    ? "bg-white text-black hover:text-white"
                    : "bg-slate-500 text-white"
                }`}
                type="button"
                id="offer"
                value={false}
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
                id="regularPrice"
                onChange={onChange}
                min="50"
                max="500000000"
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
          {offer && (
            <div>
              <p className="mt-3 text-lg text-start font-semibold">
                Discounted Price
              </p>
              <input
                className="w-1/2 text-xl text-gray-600 px-3 py-2 bg-white border border-gray-700 rounded-md transition duration-150 ease-in-out focus:text-gray-900 focus:bg-white focus:border-slate-600"
                type="number"
                value={discountedPrice}
                id="discountedPrice"
                onChange={onChange}
                min="0"
                max="90000000"
                required={offer}
              />
            </div>
          )}
          <div className="flex justify-start space-y-1 flex-col mb-6">
            <p className="mt-3 text-lg text-start font-semibold">
              Images
            </p>
            <span className="text-gray-600 text-sm">
              The first image will be the cover
              (max 6)
            </span>
            <input
              className="focus:bg-white focus:border-slate-500 w-full px-3 py-2 bg-white border-gray-600 rounded-md border-1 shadow-md transition duration-150 ease-in-out"
              type="file"
              onChange={onChange}
              id="images"
              multiple
              min={1}
              max={6}
              accept=".jpg, .png, .jpeg"
              required
            />
          </div>

          <button
            type="submit"
            className="mb-6 w-full text-white hover:bg-slate-600 active:bg-slate-700 rounded-md bg-red-500 px-24 py-2 uppercase font-semibold text-lg shadow-lg transition duration-150 ease-in-out"
          >
            Create Listing
          </button>
        </form>
      </div>
    </>
  );
}
