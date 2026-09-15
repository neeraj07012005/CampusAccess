import { useNavigate } from "react-router-dom";
import "./Home.css";

function Home() {

  const navigate = useNavigate();

  return (
    <div className="home-page">

      {/* ================= NAVBAR ================= */}

      <nav className="home-navbar">

        <div
          className="home-logo"
          onClick={() => navigate("/")}
        >
          Campus<span>Access</span>
        </div>

        <div className="nav-buttons">

          <button
            className="nav-login"
            onClick={() => navigate("/login")}
          >
            Login
          </button>

          <button
            className="nav-register"
            onClick={() => navigate("/register")}
          >
            Create Account
          </button>

        </div>

      </nav>


      {/* ================= HERO ================= */}

      <section className="hero-section">

        <div className="hero-content">

          <div className="hero-badge">
            UNIVERSITY VISITOR MANAGEMENT
          </div>

          <h1>
            Smart Visitor
            <br />
            <span>Management System</span>
          </h1>

          <p>
            CampusAccess provides a secure and streamlined way
            to manage university visitors — from request creation
            to approval, entry, and exit tracking.
          </p>

          <div className="hero-buttons">

            <button
              className="primary-button"
              onClick={() => navigate("/login")}
            >
              Try Live Demo →
            </button>

            <button
              className="secondary-button"
              onClick={() =>
                document
                  .getElementById("workflow")
                  .scrollIntoView({ behavior: "smooth" })
              }
            >
              How It Works
            </button>

          </div>

        </div>


        {/* ================= HERO CARD ================= */}

        <div className="hero-card">

          <div className="card-header">
            <span className="status-dot"></span>
            CampusAccess Workflow
          </div>

          <div className="workflow-mini">

            <div className="mini-step">
              <div className="mini-number">01</div>
              <div>
                <strong>Student</strong>
                <p>Create Request</p>
              </div>
            </div>

            <div className="mini-line"></div>

            <div className="mini-step">
              <div className="mini-number">02</div>
              <div>
                <strong>Admin</strong>
                <p>Approve / Reject</p>
              </div>
            </div>

            <div className="mini-line"></div>

            <div className="mini-step">
              <div className="mini-number">03</div>
              <div>
                <strong>Security</strong>
                <p>Entry / Exit</p>
              </div>
            </div>

          </div>

        </div>

      </section>


      {/* ================= WORKFLOW ================= */}

      <section
        className="workflow-section"
        id="workflow"
      >

        <div className="section-heading">

          <div className="section-label">
            HOW IT WORKS
          </div>

          <h2>
            Complete visitor lifecycle
          </h2>

          <p>
            Every visitor moves through a controlled workflow
            with role-based access at each stage.
          </p>

        </div>


        <div className="workflow-grid">

          {/* STUDENT */}

          <div className="workflow-card">

            <div className="workflow-icon student-icon">
              01
            </div>

            <h3>Student</h3>

            <p>
              Create a visitor request and track its status
              from your dashboard.
            </p>

            <div className="workflow-status">
              PENDING
            </div>

          </div>


          <div className="workflow-arrow">
            →
          </div>


          {/* ADMIN */}

          <div className="workflow-card">

            <div className="workflow-icon admin-icon">
              02
            </div>

            <h3>Admin</h3>

            <p>
              Review visitor requests and approve or reject
              them through the administration dashboard.
            </p>

            <div className="workflow-status">
              APPROVED
            </div>

          </div>


          <div className="workflow-arrow">
            →
          </div>


          {/* GUARD */}

          <div className="workflow-card">

            <div className="workflow-icon guard-icon">
              03
            </div>

            <h3>Security Guard</h3>

            <p>
              Verify approved visitors and record their
              campus entry and exit.
            </p>

            <div className="workflow-status">
              ENTERED → EXITED
            </div>

          </div>

        </div>

      </section>


      {/* ================= DEMO ================= */}

      <section className="demo-section">

        <div className="section-heading">

          <div className="section-label">
            LIVE DEMO
          </div>

          <h2>
            Try CampusAccess
          </h2>

          <p>
            Use one of the demo accounts below to explore
            the different role-based dashboards.
          </p>

        </div>


        <div className="credentials-grid">

          {/* STUDENT */}

          <div className="credential-card">

            <div className="credential-role">
              <span className="role-icon">S</span>
              Student
            </div>

            <div className="credential-row">
              <span>Username</span>
              <strong>neerajkashyap</strong>
            </div>

            <div className="credential-row">
              <span>Password</span>
              <strong>ninsugoku</strong>
            </div>

            <button
              onClick={() => navigate("/login")}
              className="credential-button"
            >
              Login as Student
            </button>

          </div>


          {/* ADMIN */}

          <div className="credential-card">

            <div className="credential-role">
              <span className="role-icon">A</span>
              Administrator
            </div>

            <div className="credential-row">
              <span>Username</span>
              <strong>admin12344444</strong>
            </div>

            <div className="credential-row">
              <span>Password</span>
              <strong>admin123</strong>
            </div>

            <button
              onClick={() => navigate("/login")}
              className="credential-button"
            >
              Login as Admin
            </button>

          </div>


          {/* GUARD */}

          <div className="credential-card">

            <div className="credential-role">
              <span className="role-icon">G</span>
              Security Guard
            </div>

            <div className="credential-row">
              <span>Username</span>
              <strong>gurd</strong>
            </div>

            <div className="credential-row">
              <span>Password</span>
              <strong>gurd123</strong>
            </div>

            <button
              onClick={() => navigate("/login")}
              className="credential-button"
            >
              Login as Guard
            </button>

          </div>

        </div>

      </section>


      {/* ================= TECH STACK ================= */}

      <section className="tech-section">

        <div className="section-label">
          TECHNOLOGY
        </div>

        <h2>
          Built with modern technologies
        </h2>

        <div className="tech-list">

          <span>React</span>
          <span>SpringBoot</span>
          <span>PostgreSQL</span>
          <span>JWT</span>
          <span>REST APIs</span>

        </div>

      </section>


      {/* ================= FOOTER ================= */}

      <footer className="home-footer">

        <div>
          <strong>CampusAccess</strong>
          <span>
            University Visitor Management System
          </span>
        </div>

        <div>
          Built by <strong>Neeraj Kashyap</strong>
        </div>

      </footer>

    </div>
  );
}

export default Home;