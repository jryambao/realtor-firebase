import React, { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { getAuth } from "firebase/auth";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import {
  updateProfile,
  updateEmail,
} from "firebase/auth";
import {
  collection,
  doc,
  getDocs,
  orderBy,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { db } from "../firebase";
import { FaHouse } from "react-icons/fa6";
import { v4 as uuidv4 } from "uuid";
import ListingItem from "../components/ListingItem";
function Profile() {
  const auth = getAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: auth.currentUser.displayName,
    email: auth.currentUser.email,
  });
  const [changeDetail, setChangeDetail] =
    useState(false);

  const [listings, getListings] = useState();
  const [loading, setLoading] = useState(true);

  function onLogout() {
    auth.signOut();
    navigate("/sign-in");
  }
  function onChange(e) {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  }

  async function onSubmit() {
    try {
      if (auth.currentUser.displayName !== name) {
        updateProfile(auth.currentUser, {
          displayName: name,
        });
      }
      if (auth.currentUser.email !== email) {
        updateEmail(auth.currentUser, email);
      }

      const docRef = doc(
        db,
        "users",
        auth.currentUser.uid
      );
      await updateDoc(docRef, {
        name,
        email,
      });

      toast.success("Profile updated");
      navigate("/");
    } catch (error) {
      toast.error(
        "Could not update profile details"
      );
    }
  }

  const { name, email } = formData;

  useEffect(() => {
    setLoading(true);
    async function fetchUserListings() {
      const listingRef = collection(
        db,
        "listings"
      );
      const q = query(
        listingRef,
        where(
          "userRef",
          "==",
          auth.currentUser.uid
        ),
        orderBy("timestamp", "desc")
      );

      const querySnap = await getDocs(q);
      const listings = [];
      querySnap.forEach((doc) => {
        return listings.push({
          id: doc.id,
          data: doc.data(),
        });
      });
      getListings(listings);
      setLoading(false);
    }
    fetchUserListings();
  }, [auth.currentUser.uid]);

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
              className={`block border border-grey-light w-full p-3 rounded mb-4 text-xl ${
                changeDetail &&
                "bg-red-200 focus:bg-red-200"
              }`}
              name="name"
              value={name}
              disabled={!changeDetail}
              onChange={onChange}
            />
            <input
              type="email"
              id="email"
              className={`block border border-grey-light w-full p-3 rounded mb-4 text-xl ${
                changeDetail &&
                "bg-red-200 focus:bg-red-200"
              }`}
              name="email"
              value={email}
              disabled={!changeDetail}
              onChange={onChange}
            />

            <div className="flex justify-between whitespace-nowrap text-sm sm:text-lg mb-6">
              <p className="flex justify-start">
                Do you want to change your name?
                <span
                  onClick={() => {
                    changeDetail && onSubmit();
                    setChangeDetail(
                      (prevState) => !prevState
                    );
                  }}
                  className="font-bold text-red-600 hover:text-red-700 transition ease-in-out duration-150 cursor-pointer ml-1"
                >
                  {changeDetail
                    ? "Apply change"
                    : "Edit"}
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
          <button
            className="mx-auto my-5 border-gray-500 rounded-md flex justify-center font-semibold w-1/2 bg-red-600 py-3 shadow-md hover:bg-red-700 text-white uppercase text-2xl transition duration-100 ease-in hover:shadow-lg"
            type="submit"
          >
            <Link
              className="flex items-center justify-center space-x-2"
              to="/create-listing"
            >
              <FaHouse />
              <span>Sell or Rent Your Home</span>
            </Link>
          </button>
        </div>
      </section>

      <div className="max-w-6xl px-3 mt-6 mx-auto">
        {!loading && listings.length > 0 && (
          <>
            <h2 className="text-center text-2xl font-semibold mt-6">
              My Listings
            </h2>
            <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 2xl:grid-cols-6 gap-8 mt-6">
              {listings.map((listing) => (
                <ListingItem
                  key={listing.id}
                  id={listing.id}
                  listing={listing.data}
                />
              ))}
            </ul>
          </>
        )}
      </div>
    </>
  );
}

export default Profile;
