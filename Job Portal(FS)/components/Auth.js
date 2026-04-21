// ============================================================
// Auth.js — Login & Register Modals
// ============================================================

function AuthModal({ mode, onClose, onLogin }) {
  const [view, setView] = React.useState(mode); // "login" | "register"
  const [form, setForm] = React.useState({ name: "", email: "", password: "", role: "seeker", company: "", skills: "" });
  const [error, setError] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [success, setSuccess] = React.useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
  };

  const handleLogin = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      const user = DB.login(form.email, form.password);
      setLoading(false);
      if (user) {
        DB.setSession(user);
        onLogin(user);
      } else {
        setError("Invalid email or password. Try: arjun@gmail.com / user123");
      }
    }, 600);
  };

  const handleRegister = (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.password) { setError("Please fill all required fields."); return; }
    if (form.password.length < 6) { setError("Password must be at least 6 characters."); return; }
    if (form.role === "employer" && !form.company) { setError("Company name is required for employers."); return; }
    setLoading(true);
    setTimeout(() => {
      const result = DB.register(form);
      setLoading(false);
      if (result.error) { setError(result.error); }
      else {
        setSuccess("Account created! Logging you in...");
        setTimeout(() => { DB.setSession(result); onLogin(result); }, 1000);
      }
    }, 700);
  };

  return (
    <div className="modal-overlay" onClick={e => { if (e.target === e.currentTarget) onClose(); }}>
      <div className="modal-box auth-modal">
        <button className="modal-close" onClick={onClose}>✕</button>

        {/* Tabs */}
        <div className="auth-tabs">
          <button className={`auth-tab ${view === "login" ? "auth-tab-active" : ""}`} onClick={() => { setView("login"); setError(""); }}>Login</button>
          <button className={`auth-tab ${view === "register" ? "auth-tab-active" : ""}`} onClick={() => { setView("register"); setError(""); }}>Register</button>
        </div>

        {view === "login" ? (
          <form className="auth-form" onSubmit={handleLogin}>
            <div className="auth-logo">💼 CareerHub</div>
            <p className="auth-subtitle">Welcome back! Sign in to continue.</p>

            <div className="demo-hint">
              <strong>Demo:</strong> arjun@gmail.com / user123 &nbsp;|&nbsp; ravi@technova.com / emp123
            </div>

            {error && <div className="form-error"><i className="fa fa-exclamation-circle"></i> {error}</div>}

            <div className="form-group">
              <label>Email Address</label>
              <div className="input-wrap">
                <i className="fa fa-envelope input-icon"></i>
                <input name="email" type="email" placeholder="your@email.com" value={form.email} onChange={handleChange} required />
              </div>
            </div>
            <div className="form-group">
              <label>Password</label>
              <div className="input-wrap">
                <i className="fa fa-lock input-icon"></i>
                <input name="password" type="password" placeholder="Your password" value={form.password} onChange={handleChange} required />
              </div>
            </div>
            <button type="submit" className={`btn btn-primary btn-full ${loading ? "btn-loading" : ""}`} disabled={loading}>
              {loading ? <span className="spinner"></span> : "Sign In"}
            </button>
            <p className="auth-switch">Don't have an account? <span onClick={() => setView("register")}>Register here</span></p>
          </form>
        ) : (
          <form className="auth-form" onSubmit={handleRegister}>
            <div className="auth-logo">💼 CareerHub</div>
            <p className="auth-subtitle">Create your free account.</p>

            {error && <div className="form-error"><i className="fa fa-exclamation-circle"></i> {error}</div>}
            {success && <div className="form-success"><i className="fa fa-check-circle"></i> {success}</div>}

            {/* Role Selector */}
            <div className="role-selector">
              <button type="button" className={`role-btn ${form.role === "seeker" ? "role-active" : ""}`} onClick={() => setForm({ ...form, role: "seeker" })}>
                <span>👨‍💼</span> Job Seeker
              </button>
              <button type="button" className={`role-btn ${form.role === "employer" ? "role-active" : ""}`} onClick={() => setForm({ ...form, role: "employer" })}>
                <span>🏢</span> Employer
              </button>
            </div>

            <div className="form-group">
              <label>Full Name *</label>
              <div className="input-wrap">
                <i className="fa fa-user input-icon"></i>
                <input name="name" type="text" placeholder="Your full name" value={form.name} onChange={handleChange} required />
              </div>
            </div>
            <div className="form-group">
              <label>Email Address *</label>
              <div className="input-wrap">
                <i className="fa fa-envelope input-icon"></i>
                <input name="email" type="email" placeholder="your@email.com" value={form.email} onChange={handleChange} required />
              </div>
            </div>
            <div className="form-group">
              <label>Password *</label>
              <div className="input-wrap">
                <i className="fa fa-lock input-icon"></i>
                <input name="password" type="password" placeholder="Min. 6 characters" value={form.password} onChange={handleChange} required />
              </div>
            </div>
            {form.role === "employer" ? (
              <div className="form-group">
                <label>Company Name *</label>
                <div className="input-wrap">
                  <i className="fa fa-building input-icon"></i>
                  <input name="company" type="text" placeholder="Your company name" value={form.company} onChange={handleChange} />
                </div>
              </div>
            ) : (
              <div className="form-group">
                <label>Skills (optional)</label>
                <div className="input-wrap">
                  <i className="fa fa-code input-icon"></i>
                  <input name="skills" type="text" placeholder="e.g. React, Python, SQL" value={form.skills} onChange={handleChange} />
                </div>
              </div>
            )}
            <button type="submit" className={`btn btn-primary btn-full ${loading ? "btn-loading" : ""}`} disabled={loading}>
              {loading ? <span className="spinner"></span> : "Create Account"}
            </button>
            <p className="auth-switch">Already have an account? <span onClick={() => setView("login")}>Sign in</span></p>
          </form>
        )}
      </div>
    </div>
  );
}
