import { useState } from "react";

import {
  BrowserRouter,
  Routes,
  Route,
  useNavigate
} from "react-router-dom";

import Home from "./pages/Home";

import StudentDashboard from "./pages/StudentDashboard";
import AdminDashboard from "./pages/AdminDashboard";
import GuardDashboard from "./pages/GuardDashboard";
import Register from "./pages/Register";
import ResetPassword from "./pages/ResetPassword";

import "./App.css";


// =====================================================
// API URL
// =====================================================

const API_URL =
  import.meta.env.VITE_API_URL || "http://localhost:8080";


// =====================================================
// LOGIN
// =====================================================

function Login() {

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const navigate = useNavigate();


  // =====================================================
  // LOGIN FUNCTION
  // =====================================================

  const handleLogin = async (e) => {

    e.preventDefault();

    setMessage("");

    try {

      const response = await fetch(
        `${API_URL}/user/login`,
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json"
          },

          body: JSON.stringify({
            username: username,
            password: password
          })
        }
      );


      if (!response.ok) {

        const errorText = await response.text();

        console.log(
          "LOGIN STATUS:",
          response.status
        );

        console.log(
          "LOGIN ERROR:",
          errorText
        );

        throw new Error("Login failed");
      }


      const token = await response.text();

      console.log(
        "JWT received"
      );


      sessionStorage.setItem(
        "token",
        token
      );


      const userResponse = await fetch(
        `${API_URL}/user/me`,
        {
          method: "GET",

          headers: {
            "Authorization": `Bearer ${token}`
          }
        }
      );


      if (!userResponse.ok) {

        const errorText =
          await userResponse.text();

        console.log(
          "ROLE STATUS:",
          userResponse.status
        );

        console.log(
          "ROLE ERROR:",
          errorText
        );

        throw new Error(
          "Could not get user role"
        );
      }


      const roleResponse =
        await userResponse.text();

      console.log(
        "RAW ROLE RESPONSE:",
        roleResponse
      );


      const role = roleResponse
        .trim()
        .replace(/^"|"$/g, "")
        .trim()
        .toUpperCase();


      console.log(
        "FINAL ROLE:",
        role
      );


      if (role === "STUDENT") {

        navigate("/student");

      }

      else if (role === "ADMIN") {

        navigate("/admin");

      }

      else if (role === "GURD") {

        navigate("/guard");

      }

      else {

        sessionStorage.removeItem(
          "token"
        );

        setMessage(
          "Unknown user role: " + role
        );

      }

    }


    catch (error) {

      console.error(
        "Login error:",
        error
      );

      sessionStorage.removeItem(
        "token"
      );

      setMessage(
        "Login failed. Please check your credentials."
      );

    }

  };


  // =====================================================
  // LOGIN PAGE UI
  // =====================================================

  return (

    <div className="login-container">

      <div className="login-box">

        <h1>
          CampusAccess
        </h1>

        <p>
          Visitor Management System
        </p>

        <form
          onSubmit={handleLogin}
        >

          <label>
            Username
          </label>

          <input
            type="text"
            value={username}
            onChange={(e) =>
              setUsername(e.target.value)
            }
            placeholder="Enter username"
            required
          />


          <label>
            Password
          </label>

          <input
            type="password"
            value={password}
            onChange={(e) =>
              setPassword(e.target.value)
            }
            placeholder="Enter password"
            required
          />


          <button
            type="submit"
          >
            Login
          </button>

        </form>


        {message && (

          <p>
            {message}
          </p>

        )}


        <div className="register-link">

          <span>
            Don't have an account?
          </span>

          <button
            type="button"
            onClick={() =>
              navigate("/register")
            }
          >
            Create Account
          </button>

        </div>

      </div>

    </div>

  );
}


// =====================================================
// APP
// =====================================================

function App() {

  return (

    <BrowserRouter>

      <Routes>

        {/* HOME */}

        <Route
          path="/"
          element={<Home />}
        />


        {/* LOGIN */}

        <Route
          path="/login"
          element={<Login />}
        />


        {/* REGISTER */}

        <Route
          path="/register"
          element={<Register />}
        />


        {/* RESET PASSWORD */}

        <Route
          path="/reset-password"
          element={<ResetPassword />}
        />


        {/* STUDENT */}

        <Route
          path="/student"
          element={<StudentDashboard />}
        />


        {/* ADMIN */}

        <Route
          path="/admin"
          element={<AdminDashboard />}
        />


        {/* GUARD */}

        <Route
          path="/guard"
          element={<GuardDashboard />}
        />

      </Routes>

    </BrowserRouter>

  );
}


export default App;