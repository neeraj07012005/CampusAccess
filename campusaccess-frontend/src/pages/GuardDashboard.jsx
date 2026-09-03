import { useEffect, useState } from "react";
import "./GuardDashboard.css";


// =====================================================
// API URL
// =====================================================

const API_URL =
  import.meta.env.VITE_API_URL || "http://localhost:8080";


// =====================================================
// GUARD DASHBOARD
// =====================================================

function GuardDashboard() {

  const [registrationNumber, setRegistrationNumber] = useState("");
  const [visitor, setVisitor] = useState(null);
  const [enteredVisitors, setEnteredVisitors] = useState([]);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [exitLoading, setExitLoading] = useState(null);


  // =====================================================
  // GET TOKEN
  // =====================================================

  const getToken = () => {
    return sessionStorage.getItem("token");
  };


  // =====================================================
  // GET ENTERED VISITORS
  // =====================================================

  const fetchEnteredVisitors = async () => {

    const token = getToken();

    if (!token) {

      setMessage(
        "No login session found. Please login again."
      );

      return;
    }


    try {

      const response = await fetch(
        `${API_URL}/visitor/entered`,
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
        "ENTERED VISITORS STATUS:",
        response.status
      );

      console.log(
        "ENTERED VISITORS RESPONSE:",
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
            "You are not authorized as GURD."
          );

        }

        else {

          setMessage(
            `Could not fetch entered visitors (${response.status})`
          );

        }

        return;
      }


      const data =
        responseText
          ? JSON.parse(responseText)
          : [];


      setEnteredVisitors(data);

    }


    catch (error) {

      console.error(
        "FETCH ENTERED VISITORS ERROR:",
        error
      );

      setMessage(
        "Could not connect to server."
      );

    }

  };


  // =====================================================
  // LOAD ENTERED VISITORS
  // =====================================================

  useEffect(() => {

    fetchEnteredVisitors();

  }, []);


  // =====================================================
  // CHECK IN
  // =====================================================

  const handleCheckIn = async (e) => {

    e.preventDefault();

    setMessage("");
    setVisitor(null);
    setLoading(true);


    const token = getToken();


    if (!token) {

      setMessage(
        "No login session found. Please login again."
      );

      setLoading(false);

      return;
    }


    try {

      const response = await fetch(
        `${API_URL}/visitor/${registrationNumber}/enter`,
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
        "CHECK-IN STATUS:",
        response.status
      );

      console.log(
        "CHECK-IN RESPONSE:",
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
            "You are not authorized as GURD."
          );

        }

        else {

          setMessage(
            "Invalid registration number or visitor is not approved."
          );

        }

        return;
      }


      const data =
        JSON.parse(responseText);


      console.log(
        "CHECK-IN SUCCESS:",
        data
      );


      setVisitor(data);

      setMessage(
        "Visitor checked in successfully!"
      );

      setRegistrationNumber("");


      // Refresh entered visitors

      await fetchEnteredVisitors();

    }


    catch (error) {

      console.error(
        "CHECK-IN ERROR:",
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
  // EXIT VISITOR
  // =====================================================

  const handleExit = async (id) => {

    setMessage("");

    const token = getToken();


    if (!token) {

      setMessage(
        "No login session found. Please login again."
      );

      return;
    }


    try {

      setExitLoading(id);


      const response = await fetch(
        `${API_URL}/visitor/${id}/exit`,
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
        "EXIT STATUS:",
        response.status
      );

      console.log(
        "EXIT RESPONSE:",
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
            "You are not authorized as GURD."
          );

        }

        else {

          setMessage(
            `Could not check out visitor (${response.status})`
          );

        }

        return;
      }


      const data =
        JSON.parse(responseText);


      console.log(
        "EXIT SUCCESS:",
        data
      );


      setMessage(
        `${data.name} has exited the campus.`
      );


      // Refresh currently inside list

      await fetchEnteredVisitors();

    }


    catch (error) {

      console.error(
        "EXIT ERROR:",
        error
      );

      setMessage(
        "Could not check out visitor."
      );

    }


    finally {

      setExitLoading(null);

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

    <div className="guard-dashboard">


      {/* =================================================
          HEADER
      ================================================= */}

      <header className="guard-header">

        <div>

          <h1>
            CampusAccess
          </h1>

          <span>
            Security Portal
          </span>

        </div>


        <div className="guard-header-right">

          <span className="guard-badge">
            GURD
          </span>


          <button
            className="guard-logout"
            onClick={handleLogout}
          >
            Logout
          </button>

        </div>

      </header>



      {/* =================================================
          MAIN
      ================================================= */}

      <main className="guard-content">


        {/* =================================================
            WELCOME
        ================================================= */}

        <section className="guard-welcome">

          <h2>
            Security Dashboard
          </h2>

          <p>
            Manage visitor entry and exit at the campus gate.
          </p>

        </section>



        {/* =================================================
            CHECK IN
        ================================================= */}

        <section className="guard-card">

          <h2>
            Visitor Check-In
          </h2>

          <p>
            Enter the visitor's registration number.
          </p>


          <form
            className="checkin-form"
            onSubmit={handleCheckIn}
          >

            <label>
              Registration Number
            </label>


            <input
              type="text"
              value={registrationNumber}
              onChange={(e) =>
                setRegistrationNumber(e.target.value)
              }
              placeholder="e.g. VIS-4RAZNJ"
              required
            />


            <button
              type="submit"
              disabled={loading}
            >

              {loading
                ? "Checking..."
                : "Check In Visitor"
              }

            </button>

          </form>


          {/* MESSAGE */}

          {message && (

            <p className="guard-message">
              {message}
            </p>

          )}



          {/* =================================================
              CHECK-IN SUCCESS
          ================================================= */}

          {visitor && (

            <div className="checked-in">

              <h3>
                Visitor Checked In
              </h3>


              <p>
                <strong>Name:</strong>{" "}
                {visitor.name}
              </p>


              <p>
                <strong>Purpose:</strong>{" "}
                {visitor.purpose}
              </p>


              <p>
                <strong>Registration:</strong>{" "}
                {visitor.registrationNumber}
              </p>


              <p>
                <strong>Checked In:</strong>{" "}

                {visitor.checkedInAt
                  ? new Date(
                      visitor.checkedInAt
                    ).toLocaleString()
                  : "N/A"
                }

              </p>


              <span className="entered-status">
                ENTERED
              </span>

            </div>

          )}

        </section>



        {/* =================================================
            CURRENTLY INSIDE
        ================================================= */}

        <section className="guard-card">

          <div className="guard-card-header">

            <div>

              <h2>
                Currently Inside
              </h2>

              <p>
                Visitors who have entered campus.
              </p>

            </div>


            <button
              className="refresh-button"
              onClick={fetchEnteredVisitors}
            >
              Refresh
            </button>

          </div>



          {/* =================================================
              EMPTY STATE
          ================================================= */}

          {enteredVisitors.length === 0 ? (

            <div className="empty-state">

              <h3>
                No visitors inside
              </h3>

              <p>
                There are currently no visitors inside campus.
              </p>

            </div>

          ) : (


            /* =================================================
               ENTERED VISITOR LIST
            ================================================= */

            <div className="entered-list">

              {enteredVisitors.map((visitor) => (

                <div
                  className="entered-visitor"
                  key={visitor.id}
                >


                  {/* VISITOR INFO */}

                  <div className="entered-info">

                    <h3>
                      {visitor.name}
                    </h3>


                    <p>
                      {visitor.purpose}
                    </p>


                    <small>
                      Registration:{" "}
                      {visitor.registrationNumber}
                    </small>


                    <small>
                      Entered:{" "}

                      {visitor.checkedInAt
                        ? new Date(
                            visitor.checkedInAt
                          ).toLocaleString()
                        : "N/A"
                      }

                    </small>

                  </div>



                  {/* EXIT */}

                  <div className="exit-section">

                    <span className="entered-status">
                      ENTERED
                    </span>


                    <button
                      className="exit-button"
                      onClick={() =>
                        handleExit(visitor.id)
                      }
                      disabled={
                        exitLoading === visitor.id
                      }
                    >

                      {exitLoading === visitor.id
                        ? "Checking Out..."
                        : "Mark Exit"
                      }

                    </button>

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


export default GuardDashboard;