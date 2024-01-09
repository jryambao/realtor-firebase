import { getAuth } from "firebase/auth";
import React from "react";
import { FcGoogle } from "react-icons/fc";
import {
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { db } from "../firebase";
import {
  doc,
  getDoc,
  serverTimestamp,
  setDoc,
} from "firebase/firestore";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export default function OAuth() {
  const navigate = useNavigate();
  async function onGoogleClick() {
    try {
      const auth = getAuth();
      const provider = new GoogleAuthProvider();
      const result = signInWithPopup(
        auth,
        provider
      );

      const user = result.user;

      const docRef = doc(db, "users", user.uid);

      const docSnap = await getDoc(docRef);

      if (!docSnap.exists()) {
        await setDoc(docRef, {
          name: user.displayName,
          email: user.email,
          timestamp: serverTimestamp(),
        });

        toast.success("Successfully logged in");
      }

      navigate("/");
    } catch (error) {
      toast.error(
        "Could not authorize with google"
      );
    }
  }

  return (
    <div>
      <button
        type="button"
        onClick={onGoogleClick}
        className="flex justify-center items-center active:bg-red-300 mt-6 w-full my-3 p-3 uppercase shadow-md rounded-md text-xl text-white border-gray-500 bg-red-700 hover:bg-red-600  hover:text-white transition duration-150 ease-in-out"
      >
        <FcGoogle className="bg-white rounded-full" />
        <span className="uppercase text-lg px-4">
          Continue With Google
        </span>
      </button>
    </div>
  );
}
