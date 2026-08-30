import { useState } from "react";
import "./Register.css";

function Register() {

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("STUDENT");

  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);


  const handleRegister = async (e) => {

    e.preventDefault();

    setMessage("");
    setLoading(true);

    try {

      const response = await fetch(
        "http://localhost:8080/user/register",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json"
          },

          body: JSON.stringify({
            username: username,
            password: password,
            role: role
          })
        }
      );


      if (!response.ok) {

        const errorText = await response.text();

        console.log(
          "REGISTER STATUS:",
          response.status
        );

        console.log(
          "REGISTER ERROR:",
          errorText
        );

        throw new Error("Registration failed");
      }


      const data = await response.json();

      console.log("REGISTERED USER:", data);

      setMessage(
        "Registration successful! You can now login."
      );

      setUsername("");
      setPassword("");
      setRole("STUDENT");


    } catch (error) {

      console.error(error);

      setMessage(
        "Registration failed. Username may already exist."
      );

    } finally {

      setLoading(false);

    }
  };


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


        {message && (

          <p className="register-message">
            {message}
          </p>

        )}


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