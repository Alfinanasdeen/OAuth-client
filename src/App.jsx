import { Routes, Route, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import Home from "./pages/Home/home.jsx";
import Login from "./pages/Login/login.jsx";
import Signup from "./pages/Signup/signup.jsx";
import "./App.css";

function App() {
  const [user, setUser] = useState(null);

  const getUser = async () => {
    try {
      const url = `${import.meta.env.VITE_API_BASE_URL}/auth/login/success`;
      const { data } = await axios.get(url, { withCredentials: true });
      console.log("User data:", data); // Log user data
      setUser(data.user._json);
    } catch (err) {
      console.error("Error fetching user:", err.response?.data || err.message);
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <div className="container">
      <Routes>
        <Route
          exact
          path="/"
          element={user ? <Home user={user} /> : <Navigate to="/login" />}
        />
        <Route
          exact
          path="/login"
          element={user ? <Navigate to="/" /> : <Login />}
        />
        <Route
          path="/signup"
          element={user ? <Navigate to="/" /> : <Signup />}
        />
      </Routes>
    </div>
  );
}

export default App;
