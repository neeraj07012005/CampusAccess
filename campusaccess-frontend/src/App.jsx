import { useState } from "react";

import {
  BrowserRouter,
  Routes,
  Route,
  useNavigate
} from "react-router-dom";

import StudentDashboard from "./pages/StudentDashboard";
import AdminDashboard from "./pages/AdminDashboard";
import GuardDashboard from "./pages/GuardDashboard";
import Register from "./pages/Register";
import ResetPassword from "./pages/ResetPassword";

import "./App.css";


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

      // =================================================
      // LOGIN
      // =================================================

      const response = await fetch(
        "http://localhost:8080/user/login",
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


      // =================================================
      // GET JWT
      // =================================================

      const token = await response.text();

      console.log(
        "JWT received"
      );


      // =================================================
      // SAVE JWT
      //
      // IMPORTANT:
      // sessionStorage is used instead of localStorage.
      // Each browser tab gets its own token.
      // =================================================

      sessionStorage.setItem(
        "token",
        token
      );


      // =================================================
      // GET CURRENT USER ROLE
      // =================================================

      const userResponse = await fetch(
        "http://localhost:8080/user/me",
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


      // =================================================
      // READ ROLE
      // =================================================

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


      // =================================================
      // REDIRECT BASED ON ROLE
      // =================================================

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

        // Unknown role

        sessionStorage.removeItem("token");

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


      // Remove invalid token

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


          {/* USERNAME */}

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



          {/* PASSWORD */}

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



          {/* LOGIN BUTTON */}

          <button
            type="submit"
          >
            Login
          </button>


        </form>



        {/* MESSAGE */}

        {message && (

          <p>
            {message}
          </p>

        )}



        {/* REGISTER */}

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


        {/* =================================================
            LOGIN
        ================================================= */}

        <Route
          path="/"
          element={<Login />}
        />



        {/* =================================================
            REGISTER
        ================================================= */}

        <Route
          path="/register"
          element={<Register />}
        />



        {/* =================================================
            RESET PASSWORD
        ================================================= */}

        <Route
          path="/reset-password"
          element={<ResetPassword />}
        />



        {/* =================================================
            STUDENT
        ================================================= */}

        <Route
          path="/student"
          element={<StudentDashboard />}
        />



        {/* =================================================
            ADMIN
        ================================================= */}

        <Route
          path="/admin"
          element={<AdminDashboard />}
        />



        {/* =================================================
            GUARD
        ================================================= */}

        <Route
          path="/guard"
          element={<GuardDashboard />}
        />


      </Routes>

    </BrowserRouter>

  );

}


export default App;