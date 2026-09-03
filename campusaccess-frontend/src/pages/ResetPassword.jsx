import { useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import "./ResetPassword.css";


// =====================================================
// API URL
// =====================================================

const API_URL =
  import.meta.env.VITE_API_URL || "http://localhost:8080";


function ResetPassword() {

  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const token = searchParams.get("token");

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);


  // =====================================================
  // RESET PASSWORD
  // =====================================================

  const handleReset = async (e) => {

    e.preventDefault();

    setMessage("");


    if (!token) {

      setMessage(
        "Invalid or missing reset link."
      );

      return;
    }


    if (newPassword !== confirmPassword) {

      setMessage(
        "Passwords do not match."
      );

      return;
    }


    if (newPassword.length < 6) {

      setMessage(
        "Password must be at least 6 characters."
      );

      return;
    }


    setLoading(true);


    try {

      const response = await fetch(
        `${API_URL}/user/reset-password`,
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json"
          },

          body: JSON.stringify({
            token: token,
            newPassword: newPassword
          })
        }
      );


      const data =
        await response.text();


      if (!response.ok) {

        throw new Error(
          data || "Password reset failed"
        );

      }


      setMessage(
        "Password reset successfully! Redirecting to login..."
      );


      setNewPassword("");
      setConfirmPassword("");


      setTimeout(() => {

        navigate("/");

      }, 2000);

    }


    catch (error) {

      console.error(
        error
      );


      setMessage(
        error.message ||
        "Invalid or expired reset link."
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

    <div className="reset-container">

      <div className="reset-box">

        <h1>
          CampusAccess
        </h1>

        <p className="reset-subtitle">
          Reset your password
        </p>


        <form
          onSubmit={handleReset}
        >

          <label>
            New Password
          </label>

          <input
            type="password"
            value={newPassword}
            onChange={(e) =>
              setNewPassword(e.target.value)
            }
            placeholder="Enter new password"
            required
          />


          <label>
            Confirm Password
          </label>

          <input
            type="password"
            value={confirmPassword}
            onChange={(e) =>
              setConfirmPassword(e.target.value)
            }
            placeholder="Confirm new password"
            required
          />


          <button
            type="submit"
            disabled={loading}
          >

            {loading
              ? "Resetting..."
              : "Reset Password"
            }

          </button>

        </form>


        {message && (

          <p className="reset-message">
            {message}
          </p>

        )}

      </div>

    </div>

  );

}


export default ResetPassword;