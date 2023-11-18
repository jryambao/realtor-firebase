import './App.css';
import {BrowserRouter as Router, Routes, Route} from "react-router-dom"

//Page components
import Home from './pages/Home';
import Profile from './pages/Profile'
import Offers from './pages/Offers'
import ForgotPassword from './pages/ForgotPassword';
import SignUp from './pages/SignUp';
import SignIn from './pages/SignIn';

function App() {
  return (
    <>
     <Router>
        <Routes>
            <Route path="/" element={<Home />}></Route>
        </Routes>
        <Routes>
            <Route path="/profile" element={<Profile/>}></Route>
        </Routes>
        <Routes>
            <Route path="/sign-in" element={<SignIn/>}></Route>
        </Routes>
        <Routes>
            <Route path="/sign-up" element={<SignUp/>}></Route>
        </Routes>
        <Routes>
            <Route path="/forgot-password" element={<ForgotPassword/>}></Route>
        </Routes>
        <Routes>
            <Route path="/offers" element={<Offers/>}></Route>
        </Routes>
    </Router>
    </>
  );
}

export default App;
