import { useEffect, useState } from "react";
import "./AdminDashboard.css";


// =====================================================
// API URL
// =====================================================

const API_URL =
  import.meta.env.VITE_API_URL || "http://localhost:8080";


// =====================================================
// ADMIN DASHBOARD
// =====================================================

function AdminDashboard() {

  const [visitors, setVisitors] = useState([]);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [actionLoading, setActionLoading] = useState(null);


  // =====================================================
  // GET ALL VISITORS
  // =====================================================

  const fetchVisitors = async () => {

    const token = sessionStorage.getItem("token");

    if (!token) {
      setMessage("Please login again.");
      return;
    }


    try {

      setLoading(true);

      const response = await fetch(
        `${API_URL}/visitor`,
        {
          method: "GET",

          headers: {
            "Authorization": `Bearer ${token}`
          }
        }
      );


      const responseText =
        await response.text();


      console.log(
        "ADMIN VISITORS STATUS:",
        response.status
      );

      console.log(
        "ADMIN VISITORS RESPONSE:",
        responseText
      );


      if (!response.ok) {

        if (response.status === 401) {

          setMessage(
            "Session expired. Please login again."
          );

        }

        else if (response.status === 403) {

          setMessage(
            "You are not authorized as ADMIN."
          );

        }

        else {

          setMessage(
            `Could not load visitors (${response.status})`
          );

        }

        return;
      }


      const data =
        responseText
          ? JSON.parse(responseText)
          : [];


      setVisitors(data);

      setMessage("");

    }


    catch (error) {

      console.error(
        "ADMIN FETCH ERROR:",
        error
      );

      setMessage(
        "Could not connect to server."
      );

    }


    finally {

      setLoading(false);

    }

  };


  // =====================================================
  // LOAD VISITORS
  // =====================================================

  useEffect(() => {

    fetchVisitors();

  }, []);


  // =====================================================
  // APPROVE VISITOR
  // =====================================================

  const handleApprove = async (id) => {

    const token =
      sessionStorage.getItem("token");


    if (!token) {

      setMessage(
        "Please login again."
      );

      return;
    }


    try {

      setActionLoading(id);

      setMessage("");


      const response = await fetch(
        `${API_URL}/visitor/${id}/approve`,
        {
          method: "PUT",

          headers: {
            "Authorization": `Bearer ${token}`
          }
        }
      );


      const responseText =
        await response.text();


      console.log(
        "APPROVE STATUS:",
        response.status
      );

      console.log(
        "APPROVE RESPONSE:",
        responseText
      );


      if (!response.ok) {

        if (response.status === 401) {

          setMessage(
            "Session expired. Please login again."
          );

        }

        else if (response.status === 403) {

          setMessage(
            "You are not authorized as ADMIN."
          );

        }

        else {

          setMessage(
            `Could not approve visitor (${response.status})`
          );

        }

        return;
      }


      setMessage(
        "Visitor approved successfully!"
      );


      await fetchVisitors();

    }


    catch (error) {

      console.error(
        "APPROVE ERROR:",
        error
      );

      setMessage(
        "Could not approve visitor."
      );

    }


    finally {

      setActionLoading(null);

    }

  };


  // =====================================================
  // REJECT VISITOR
  // =====================================================

  const handleReject = async (id) => {

    const token =
      sessionStorage.getItem("token");


    if (!token) {

      setMessage(
        "Please login again."
      );

      return;
    }


    try {

      setActionLoading(id);

      setMessage("");


      const response = await fetch(
        `${API_URL}/visitor/${id}/reject`,
        {
          method: "PUT",

          headers: {
            "Authorization": `Bearer ${token}`
          }
        }
      );


      const responseText =
        await response.text();


      console.log(
        "REJECT STATUS:",
        response.status
      );

      console.log(
        "REJECT RESPONSE:",
        responseText
      );


      if (!response.ok) {

        if (response.status === 401) {

          setMessage(
            "Session expired. Please login again."
          );

        }

        else if (response.status === 403) {

          setMessage(
            "You are not authorized as ADMIN."
          );

        }

        else {

          setMessage(
            `Could not reject visitor (${response.status})`
          );

        }

        return;
      }


      setMessage(
        "Visitor rejected successfully!"
      );


      await fetchVisitors();

    }


    catch (error) {

      console.error(
        "REJECT ERROR:",
        error
      );

      setMessage(
        "Could not reject visitor."
      );

    }


    finally {

      setActionLoading(null);

    }

  };


  // =====================================================
  // LOGOUT
  // =====================================================

  const handleLogout = () => {

    sessionStorage.removeItem("token");

    window.location.href = "/";

  };


  // =====================================================
  // UI
  // =====================================================

  return (

    <div className="admin-dashboard">


      {/* =================================================
          HEADER
      ================================================= */}

      <header className="admin-header">

        <div>

          <h1>
            CampusAccess
          </h1>

          <span>
            Admin Portal
          </span>

        </div>


        <div className="admin-header-right">

          <span className="admin-badge">
            ADMIN
          </span>


          <button
            className="admin-logout"
            onClick={handleLogout}
          >
            Logout
          </button>

        </div>

      </header>



      {/* =================================================
          MAIN
      ================================================= */}

      <main className="admin-content">


        {/* =================================================
            WELCOME
        ================================================= */}

        <section className="admin-welcome">

          <h2>
            Welcome back 👋
          </h2>

          <p>
            Manage campus visitor requests from here.
          </p>

        </section>



        {/* =================================================
            VISITOR CARD
        ================================================= */}

        <section className="admin-card">


          <div className="admin-card-header">

            <div>

              <h2>
                Visitor Requests
              </h2>

              <p>
                Review and manage visitor requests.
              </p>

            </div>


            <button
              className="admin-refresh"
              onClick={fetchVisitors}
              disabled={loading}
            >

              {loading
                ? "Refreshing..."
                : "Refresh"
              }

            </button>

          </div>



          {/* =================================================
              MESSAGE
          ================================================= */}

          {message && (

            <p className="admin-message">
              {message}
            </p>

          )}



          {/* =================================================
              EMPTY STATE
          ================================================= */}

          {!loading && visitors.length === 0 ? (

            <div className="admin-empty">

              <h3>
                No visitor requests
              </h3>

              <p>
                There are currently no visitor requests.
              </p>

            </div>

          ) : (


            /* =================================================
               VISITOR LIST
            ================================================= */

            <div className="admin-list">


              {visitors.map((visitor) => (

                <div
                  className="admin-visitor"
                  key={visitor.id}
                >


                  {/* =========================================
                      VISITOR INFORMATION
                  ========================================= */}

                  <div className="admin-visitor-info">

                    <h3>
                      {visitor.name}
                    </h3>


                    <p>
                      Purpose: {visitor.purpose}
                    </p>


                    <small>

                      Created by:{" "}

                      {visitor.createdBy || "Unknown"}

                    </small>


                    <br />


                    <small>

                      Created:{" "}

                      {visitor.createdAt
                        ? new Date(
                            visitor.createdAt
                          ).toLocaleString()
                        : "N/A"
                      }

                    </small>


                    {/* CHECKED IN */}

                    {visitor.checkedInAt && (

                      <>
                        <br />

                        <small>

                          Checked In:{" "}

                          {new Date(
                            visitor.checkedInAt
                          ).toLocaleString()}

                        </small>

                      </>

                    )}


                    {/* CHECKED OUT */}

                    {visitor.checkedOutAt && (

                      <>
                        <br />

                        <small>

                          Checked Out:{" "}

                          {new Date(
                            visitor.checkedOutAt
                          ).toLocaleString()}

                        </small>

                      </>

                    )}


                    {/* REGISTRATION NUMBER */}

                    {visitor.registrationNumber && (

                      <div className="admin-registration">

                        <span>
                          Registration Number
                        </span>

                        <strong>
                          {visitor.registrationNumber}
                        </strong>

                      </div>

                    )}

                  </div>



                  {/* =========================================
                      ACTIONS
                  ========================================= */}

                  <div className="admin-visitor-actions">


                    {/* STATUS */}

                    <span
                      className={`admin-status ${
                        visitor.status
                          ? visitor.status.toLowerCase()
                          : ""
                      }`}
                    >

                      {visitor.status}

                    </span>



                    {/* APPROVE / REJECT */}

                    {visitor.status === "PENDING" && (

                      <div className="admin-buttons">


                        <button
                          className="approve-button"
                          onClick={() =>
                            handleApprove(visitor.id)
                          }
                          disabled={
                            actionLoading === visitor.id
                          }
                        >

                          {actionLoading === visitor.id
                            ? "..."
                            : "Approve"
                          }

                        </button>


                        <button
                          className="reject-button"
                          onClick={() =>
                            handleReject(visitor.id)
                          }
                          disabled={
                            actionLoading === visitor.id
                          }
                        >

                          {actionLoading === visitor.id
                            ? "..."
                            : "Reject"
                          }

                        </button>

                      </div>

                    )}

                  </div>

                </div>

              ))}


            </div>

          )}

        </section>


      </main>

    </div>

  );

}


export default AdminDashboard;