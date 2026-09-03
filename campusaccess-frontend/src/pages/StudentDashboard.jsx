import { useEffect, useState } from "react";
import "./StudentDashboard.css";

const API_URL =
  import.meta.env.VITE_API_URL || "http://localhost:8080";

function StudentDashboard() {

  const [visitors, setVisitors] = useState([]);

  const [name, setName] = useState("");
  const [purpose, setPurpose] = useState("");

  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);


  // =====================================================
  // GET TOKEN
  // =====================================================

  const getToken = () => {
    return sessionStorage.getItem("token");
  };


  // =====================================================
  // GET MY VISITORS
  // =====================================================

  const fetchVisitors = async () => {

    const token = getToken();

    if (!token) {
      setMessage("Please login again.");
      return;
    }

    try {

      const response = await fetch(
        `${API_URL}/visitor/my`,
        {
          method: "GET",

          headers: {
            "Authorization": `Bearer ${token}`
          }
        }
      );


      const responseText = await response.text();


      console.log(
        "GET VISITORS STATUS:",
        response.status
      );


      console.log(
        "GET VISITORS RESPONSE:",
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
            "You are not authorized to view visitors."
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

    }

    catch (error) {

      console.error(
        "GET VISITORS ERROR:",
        error
      );


      setMessage(
        "Could not connect to server."
      );

    }
  };


  // =====================================================
  // LOAD VISITORS
  // =====================================================

  useEffect(() => {

    fetchVisitors();

  }, []);


  // =====================================================
  // CREATE VISITOR
  // =====================================================

  const handleCreateVisitor = async (e) => {

    e.preventDefault();

    setMessage("");
    setLoading(true);


    const token = getToken();


    console.log(
      "STUDENT TOKEN EXISTS:",
      !!token
    );


    if (!token) {

      setMessage(
        "No login session found. Please login again."
      );

      setLoading(false);

      return;
    }


    try {

      const response = await fetch(
        `${API_URL}/visitor`,
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",

            "Authorization": `Bearer ${token}`
          },

          body: JSON.stringify({
            name: name,
            purpose: purpose
          })
        }
      );


      const responseText =
        await response.text();


      console.log(
        "CREATE VISITOR STATUS:",
        response.status
      );


      console.log(
        "CREATE VISITOR RESPONSE:",
        responseText
      );


      if (!response.ok) {

        if (response.status === 401) {

          setMessage(
            "Your login session has expired. Please login again."
          );

        }

        else if (response.status === 403) {

          setMessage(
            "You are logged in, but you are not authorized as a STUDENT."
          );

        }

        else {

          setMessage(
            `Could not create visitor (${response.status})`
          );

        }

        return;
      }


      const visitor =
        JSON.parse(responseText);


      console.log(
        "CREATED VISITOR:",
        visitor
      );


      setMessage(
        "Visitor request created successfully!"
      );


      // Clear form

      setName("");
      setPurpose("");


      // Refresh visitor list

      await fetchVisitors();

    }


    catch (error) {

      console.error(
        "CREATE VISITOR ERROR:",
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

    <div className="student-dashboard">


      {/* =================================================
          HEADER
      ================================================= */}

      <header className="dashboard-header">

        <div>

          <h1>
            CampusAccess
          </h1>

          <span>
            Student Portal
          </span>

        </div>


        <div className="header-right">

          <span className="role-badge">
            STUDENT
          </span>


          <button
            className="logout-button"
            onClick={handleLogout}
          >
            Logout
          </button>

        </div>

      </header>



      {/* =================================================
          MAIN
      ================================================= */}

      <main className="dashboard-content">


        {/* =================================================
            WELCOME
        ================================================= */}

        <section className="welcome-section">

          <h2>
            Welcome back 👋
          </h2>

          <p>
            Manage your campus visitor requests from here.
          </p>

        </section>



        {/* =================================================
            CREATE VISITOR
        ================================================= */}

        <section className="dashboard-card">

          <div className="card-header">

            <div>

              <h2>
                Create Visitor Request
              </h2>

              <p>
                Submit a request for a visitor to enter campus.
              </p>

            </div>

          </div>


          <form
            className="visitor-form"
            onSubmit={handleCreateVisitor}
          >


            {/* VISITOR NAME */}

            <div className="form-group">

              <label>
                Visitor Name
              </label>


              <input
                type="text"
                value={name}
                onChange={(e) =>
                  setName(e.target.value)
                }
                placeholder="Enter visitor name"
                required
              />

            </div>



            {/* PURPOSE */}

            <div className="form-group">

              <label>
                Purpose of Visit
              </label>


              <input
                type="text"
                value={purpose}
                onChange={(e) =>
                  setPurpose(e.target.value)
                }
                placeholder="e.g. Meeting, Event, Personal"
                required
              />

            </div>



            {/* CREATE BUTTON */}

            <button
              type="submit"
              className="create-button"
              disabled={loading}
            >

              {loading
                ? "Creating..."
                : "Create Visitor Request"
              }

            </button>

          </form>


          {/* MESSAGE */}

          {message && (

            <p className="message">
              {message}
            </p>

          )}

        </section>



        {/* =================================================
            MY VISITORS
        ================================================= */}

        <section className="dashboard-card">


          <div className="card-header">

            <div>

              <h2>
                My Visitors
              </h2>

              <p>
                Track the status of your visitor requests.
              </p>

            </div>


            <button
              className="refresh-button"
              onClick={fetchVisitors}
            >
              Refresh
            </button>

          </div>



          {/* =================================================
              EMPTY STATE
          ================================================= */}

          {visitors.length === 0 ? (

            <div className="empty-state">

              <h3>
                No visitors yet
              </h3>

              <p>
                Create your first visitor request above.
              </p>

            </div>

          ) : (


            /* =================================================
               VISITOR LIST
            ================================================= */

            <div className="visitor-list">


              {visitors.map((visitor) => (

                <div
                  className="visitor-item"
                  key={visitor.id}
                >


                  {/* VISITOR INFORMATION */}

                  <div className="visitor-info">

                    <h3>
                      {visitor.name}
                    </h3>


                    <p>
                      {visitor.purpose}
                    </p>


                    {/* CREATED */}

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

                      <small>

                        Checked In:{" "}

                        {new Date(
                          visitor.checkedInAt
                        ).toLocaleString()}

                      </small>

                    )}


                    {/* CHECKED OUT */}

                    {visitor.checkedOutAt && (

                      <small>

                        Checked Out:{" "}

                        {new Date(
                          visitor.checkedOutAt
                        ).toLocaleString()}

                      </small>

                    )}

                  </div>



                  {/* STATUS */}

                  <div className="visitor-status">

                    <span
                      className={`status ${
                        visitor.status
                          ? visitor.status.toLowerCase()
                          : ""
                      }`}
                    >

                      {visitor.status}

                    </span>



                    {/* REGISTRATION NUMBER */}

                    {visitor.registrationNumber && (

                      <div className="registration">

                        <span>
                          Registration Number
                        </span>


                        <strong>
                          {visitor.registrationNumber}
                        </strong>

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


export default StudentDashboard;