import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";

// Page components
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import Offers from "./pages/Offers";
import ForgotPassword from "./pages/ForgotPassword";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// components
import Header from "./components/Header";
function App() {
  return (
    <>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/profile"
            element={<Profile />}
          />
          <Route
            path="/sign-in"
            element={<SignIn />}
          />
          <Route
            path="/sign-up"
            element={<SignUp />}
          />
          <Route
            path="/forgot-password"
            element={<ForgotPassword />}
          />
          <Route
            path="/offers"
            element={<Offers />}
          />
        </Routes>
      </Router>
      <ToastContainer
        position="bottom-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </>
  );
}

export default App;
