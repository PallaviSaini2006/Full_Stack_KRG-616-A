// Auth.js - Login and Registration Modal
// Calls apiLogin() and apiRegister() which simulate Spring Boot REST API calls

function AuthModal({ defaultTab, onClose, onLogin }) {
  const [tab, setTab] = React.useState(defaultTab || "login"); // "login" or "register"
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState("");
  const [success, setSuccess] = React.useState("");

  // Form state for login
  const [loginForm, setLoginForm] = React.useState({ email: "", password: "" });

  // Form state for register
  const [registerForm, setRegisterForm] = React.useState({
    name: "", email: "", password: "", role: "seeker", company: "", skills: ""
  });

  // Close modal when clicking outside
  function handleOverlayClick(e) {
    if (e.target === e.currentTarget) {
      onClose();
    }
  }

  // Handle login form submit
  async function handleLogin(e) {
    e.preventDefault();
    setError("");
    setLoading(true);

    const result = await apiLogin(loginForm.email, loginForm.password);

    if (result.success) {
      setSession(result.user);
      onLogin(result.user);
    } else {
      setError(result.error || "Login failed. Please try again.");
    }
    setLoading(false);
  }

  // Handle register form submit
  async function handleRegister(e) {
    e.preventDefault();
    setError("");

    // Basic validation
    if (!registerForm.name.trim() || !registerForm.email.trim() || !registerForm.password.trim()) {
      setError("Please fill in all required fields.");
      return;
    }
    if (registerForm.password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }
    if (registerForm.role === "employer" && !registerForm.company.trim()) {
      setError("Company name is required for employer accounts.");
      return;
    }

    setLoading(true);
    const result = await apiRegister(registerForm);

    if (result.success) {
      setSuccess("Account created successfully! Logging you in...");
      setSession(result.user);
      setTimeout(() => {
        onLogin(result.user);
      }, 1200);
    } else {
      setError(result.error);
    }
    setLoading(false);
  }

  return (
    <div className="modal-overlay" onClick={handleOverlayClick}>
      <div className="modal-box">

        {/* Tab Switcher */}
        <div className="auth-tabs">
          <button
            className={`auth-tab-btn ${tab === "login" ? "active" : ""}`}
            onClick={() => { setTab("login"); setError(""); }}
          >
            Login
          </button>
          <button
            className={`auth-tab-btn ${tab === "register" ? "active" : ""}`}
            onClick={() => { setTab("register"); setError(""); }}
          >
            Register
          </button>
        </div>

        {/* LOGIN FORM */}
        {tab === "login" && (
          <form className="auth-form" onSubmit={handleLogin}>
            <h2 style={{marginBottom: "6px", fontSize: "18px"}}>Welcome Back</h2>
            <p style={{fontSize: "13px", color: "#666", marginBottom: "16px"}}>Sign in to your JobPortal account</p>

            {/* Demo credentials hint */}
            <div className="demo-note">
              <strong>Demo Login:</strong><br/>
              Seeker: arjun@gmail.com / user123<br/>
              Employer: ravi@technova.com / emp123
            </div>

            {error && (
              <div className="alert alert-error">
                <i className="fa fa-exclamation-circle"></i> {error}
              </div>
            )}

            <div className="form-group">
              <label>Email Address *</label>
              <input
                type="email"
                placeholder="your@email.com"
                value={loginForm.email}
                onChange={e => setLoginForm({...loginForm, email: e.target.value})}
                required
              />
            </div>

            <div className="form-group">
              <label>Password *</label>
              <input
                type="password"
                placeholder="Your password"
                value={loginForm.password}
                onChange={e => setLoginForm({...loginForm, password: e.target.value})}
                required
              />
            </div>

            <button type="submit" className="btn btn-primary btn-full" disabled={loading}>
              {loading ? "Signing in..." : "Sign In"}
            </button>

            <p style={{textAlign: "center", fontSize: "13px", marginTop: "14px", color: "#666"}}>
              Don't have an account?{" "}
              <span style={{color: "#1a73e8", cursor: "pointer"}} onClick={() => setTab("register")}>
                Register here
              </span>
            </p>
          </form>
        )}

        {/* REGISTER FORM */}
        {tab === "register" && (
          <form className="auth-form" onSubmit={handleRegister}>
            <h2 style={{marginBottom: "6px", fontSize: "18px"}}>Create Account</h2>
            <p style={{fontSize: "13px", color: "#666", marginBottom: "16px"}}>Join JobPortal and find your dream job</p>

            {error && (
              <div className="alert alert-error">
                <i className="fa fa-exclamation-circle"></i> {error}
              </div>
            )}
            {success && (
              <div className="alert alert-success">
                <i className="fa fa-check-circle"></i> {success}
              </div>
            )}

            {/* Role selection */}
            <div className="form-group">
              <label>I am a:</label>
              <div className="role-selector">
                <button
                  type="button"
                  className={`role-option ${registerForm.role === "seeker" ? "selected" : ""}`}
                  onClick={() => setRegisterForm({...registerForm, role: "seeker"})}
                >
                  👨‍💼 Job Seeker
                </button>
                <button
                  type="button"
                  className={`role-option ${registerForm.role === "employer" ? "selected" : ""}`}
                  onClick={() => setRegisterForm({...registerForm, role: "employer"})}
                >
                  🏢 Employer
                </button>
              </div>
            </div>

            <div className="form-group">
              <label>Full Name *</label>
              <input
                type="text"
                placeholder="Your full name"
                value={registerForm.name}
                onChange={e => setRegisterForm({...registerForm, name: e.target.value})}
                required
              />
            </div>

            <div className="form-group">
              <label>Email Address *</label>
              <input
                type="email"
                placeholder="your@email.com"
                value={registerForm.email}
                onChange={e => setRegisterForm({...registerForm, email: e.target.value})}
                required
              />
            </div>

            <div className="form-group">
              <label>Password * (min 6 characters)</label>
              <input
                type="password"
                placeholder="Choose a password"
                value={registerForm.password}
                onChange={e => setRegisterForm({...registerForm, password: e.target.value})}
                required
              />
            </div>

            {/* Employer: company name field */}
            {registerForm.role === "employer" && (
              <div className="form-group">
                <label>Company Name *</label>
                <input
                  type="text"
                  placeholder="Your company name"
                  value={registerForm.company}
                  onChange={e => setRegisterForm({...registerForm, company: e.target.value})}
                />
              </div>
            )}

            {/* Job seeker: skills field */}
            {registerForm.role === "seeker" && (
              <div className="form-group">
                <label>Skills (optional)</label>
                <input
                  type="text"
                  placeholder="e.g. React, Java, Python"
                  value={registerForm.skills}
                  onChange={e => setRegisterForm({...registerForm, skills: e.target.value})}
                />
              </div>
            )}

            <button type="submit" className="btn btn-primary btn-full" disabled={loading}>
              {loading ? "Creating Account..." : "Create Account"}
            </button>

            <p style={{textAlign: "center", fontSize: "13px", marginTop: "14px", color: "#666"}}>
              Already have an account?{" "}
              <span style={{color: "#1a73e8", cursor: "pointer"}} onClick={() => setTab("login")}>
                Sign in
              </span>
            </p>
          </form>
        )}

      </div>
    </div>
  );
}
