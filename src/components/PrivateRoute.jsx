import React from "react";
import {
  Outlet,
  Navigate,
} from "react-router-dom";
import useAuthStatus from "../hooks/useAuthStatus.jsx";
export default function PrivateRoute() {
  const { loggedIn, checkingStatus } =
    useAuthStatus();
  if (checkingStatus) {
    return <h2>Loading</h2>;
  }
  return loggedIn ? (
    <Outlet />
  ) : (
    <Navigate to="/sign-in" />
  );
}
