// Navbar.js - Navigation Bar Component

function Navbar({ user, currentPage, onNavigate, onLogout, onOpenLogin, onOpenRegister }) {
  return (
    <nav className="navbar">
      <div className="nav-container">

        {/* Logo */}
        <div className="nav-logo" onClick={() => onNavigate("home")}>
          Job<span>Portal</span>
        </div>

        {/* Navigation Links */}
        <ul className="nav-links">
          <li>
            <span
              className={`nav-link ${currentPage === "home" ? "nav-link-active" : ""}`}
              onClick={() => onNavigate("home")}
            >
              Home
            </span>
          </li>
          <li>
            <span
              className={`nav-link ${currentPage === "jobs" ? "nav-link-active" : ""}`}
              onClick={() => onNavigate("jobs")}
            >
              Browse Jobs
            </span>
          </li>
          {user && user.role === "employer" && (
            <li>
              <span
                className={`nav-link ${currentPage === "postjob" ? "nav-link-active" : ""}`}
                onClick={() => onNavigate("postjob")}
              >
                Post a Job
              </span>
            </li>
          )}
          {user && (
            <li>
              <span
                className={`nav-link ${currentPage === "dashboard" ? "nav-link-active" : ""}`}
                onClick={() => onNavigate("dashboard")}
              >
                Dashboard
              </span>
            </li>
          )}
        </ul>

        {/* Auth buttons or logged in user */}
        <div className="nav-auth">
          {user ? (
            <div className="nav-user-menu">
              <div className="user-info">
                <div className="user-avatar">
                  {user.name.slice(0, 2).toUpperCase()}
                </div>
                <span>{user.name.split(" ")[0]}</span>
                <i className="fa fa-chevron-down" style={{fontSize: "11px"}}></i>
              </div>
              <div className="nav-dropdown">
                <div className="dropdown-user-info">
                  <strong>{user.name}</strong>
                  <span>{user.role === "employer" ? "Employer" : "Job Seeker"}</span>
                </div>
                <button className="dropdown-item" onClick={() => onNavigate("dashboard")}>
                  <i className="fa fa-tachometer-alt"></i> Dashboard
                </button>
                <button className="dropdown-item text-danger" onClick={onLogout}>
                  <i className="fa fa-sign-out-alt"></i> Logout
                </button>
              </div>
            </div>
          ) : (
            <>
              <button className="btn btn-outline btn-sm" onClick={onOpenLogin}>
                Login
              </button>
              <button className="btn btn-sm" style={{backgroundColor: "#ffd700", color: "#333"}} onClick={onOpenRegister}>
                Register
              </button>
            </>
          )}
        </div>

      </div>
    </nav>
  );
}
