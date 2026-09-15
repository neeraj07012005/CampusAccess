import { useState } from "react";
import "./Register.css";

// =====================================================
// API URL
// =====================================================

const API_URL =
  import.meta.env.VITE_API_URL || "http://localhost:8080";


function Register() {

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("STUDENT");

  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);


  // =====================================================
  // REGISTER
  // =====================================================

  const handleRegister = async (e) => {

    e.preventDefault();

    setMessage("");
    setLoading(true);

    try {

      const response = await fetch(
        `${API_URL}/user/register`,
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json"
          },

          body: JSON.stringify({
            username: username,
            email: email,
            password: password,
            role: role
          })
        }
      );


      const responseText =
        await response.text();


      console.log(
        "REGISTER STATUS:",
        response.status
      );

      console.log(
        "REGISTER RESPONSE:",
        responseText
      );


      // =================================================
      // HANDLE ERROR
      // =================================================

      if (!response.ok) {

        let errorMessage =
          `Registration failed (${response.status})`;


        if (responseText) {

          try {

            const errorData =
              JSON.parse(responseText);

            errorMessage =
              errorData.message ||
              errorData.error ||
              errorData.detail ||
              responseText;

          } catch {

            errorMessage =
              responseText;

          }

        }

        throw new Error(errorMessage);
      }


      // =================================================
      // SUCCESS
      // =================================================

      let data = null;


      if (responseText) {

        try {

          data = JSON.parse(responseText);

        } catch {

          data = responseText;

        }

      }


      console.log(
        "REGISTERED USER:",
        data
      );


      setMessage(
        "Registration successful! You can now login."
      );


      setUsername("");
      setEmail("");
      setPassword("");
      setRole("STUDENT");

    }


    // ===================================================
    // ERROR
    // ===================================================

    catch (error) {

      console.error(
        "REGISTER ERROR:",
        error
      );


      setMessage(
        error.message ||
        "Registration failed. Please try again."
      );

    }


    finally {

      setLoading(false);

    }

  };


  // =====================================================
  // UI
  // =====================================================

  return (

    <div className="register-container">

      <div className="register-box">

        <h1>
          CampusAccess
        </h1>

        <p className="register-subtitle">
          Create your account
        </p>


        <form onSubmit={handleRegister}>


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
            minLength="3"
            maxLength="20"
            required
          />


          {/* EMAIL */}

          <label>
            Email
          </label>

          <input
            type="email"
            value={email}
            onChange={(e) =>
              setEmail(e.target.value)
            }
            placeholder="Enter email"
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
            minLength="6"
            required
          />


          {/* ROLE */}

          <label>
            Role
          </label>

          <select
            value={role}
            onChange={(e) =>
              setRole(e.target.value)
            }
          >

            <option value="STUDENT">
              Student
            </option>

            <option value="GURD">
              Guard
            </option>

            <option value="ADMIN">
              Admin
            </option>

          </select>


          {/* REGISTER */}

          <button
            type="submit"
            disabled={loading}
          >

            {loading
              ? "Creating Account..."
              : "Create Account"
            }

          </button>


        </form>


        {/* MESSAGE */}

        {message && (

          <p className="register-message">
            {message}
          </p>

        )}


        {/* BACK TO LOGIN */}

        <button
          className="back-login"
          onClick={() =>
            window.location.href = "/"
          }
        >
          Back to Login
        </button>


      </div>

    </div>

  );
}


export default Register;