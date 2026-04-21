// ============================================================
// PostJob.js — Employer Post a Job Form
// ============================================================

function PostJob({ user, onNavigate, onAuthOpen }) {
  const [form, setForm] = React.useState({
    title: "", company: user?.company || "", location: "", type: "Full-time",
    category: "Technology", salary: "", experience: "0–2 Years",
    description: "", requirements: "", deadline: "", logo: "💼"
  });
  const [success, setSuccess] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState("");

  if (!user || user.role !== "employer") {
    return (
      <div className="empty-state" style={{ minHeight: "60vh" }}>
        <span style={{ fontSize: "3rem" }}>🔒</span>
        <h3>Employer Access Only</h3>
        <p>Please log in or register as an employer to post jobs.</p>
        <button className="btn btn-primary" onClick={() => onAuthOpen("login")}>Login as Employer</button>
      </div>
    );
  }

  const logoOptions = ["💼", "💻", "📊", "🎨", "📢", "💰", "👥", "🚀", "⚙️", "🤖", "☁️", "✍️"];

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.title || !form.description || !form.salary || !form.deadline) {
      setError("Please fill all required fields.");
      return;
    }
    setLoading(true);
    setTimeout(() => {
      const jobData = {
        ...form,
        requirements: form.requirements.split(",").map(r => r.trim()).filter(Boolean),
        postedBy: user.id,
      };
      DB.addJob(jobData);
      setLoading(false);
      setSuccess(true);
    }, 800);
  };

  if (success) {
    return (
      <div className="postjob-success">
        <div className="success-circle">✅</div>
        <h2>Job Posted Successfully!</h2>
        <p>Your job listing is now live and candidates can apply.</p>
        <div style={{ display: "flex", gap: "16px", marginTop: "24px" }}>
          <button className="btn btn-primary" onClick={() => onNavigate("dashboard")}>View My Jobs</button>
          <button className="btn btn-outline" onClick={() => { setSuccess(false); setForm({ title: "", company: user.company || "", location: "", type: "Full-time", category: "Technology", salary: "", experience: "0–2 Years", description: "", requirements: "", deadline: "", logo: "💼" }); }}>
            Post Another
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="postjob-page">
      <div className="postjob-header">
        <h1>Post a <span className="text-accent">New Job</span></h1>
        <p>Fill in the details below to attract the right candidates</p>
      </div>

      <div className="postjob-container">
        <form className="postjob-form" onSubmit={handleSubmit}>
          {error && <div className="form-error"><i className="fa fa-exclamation-circle"></i> {error}</div>}

          {/* Logo Picker */}
          <div className="form-group">
            <label>Job Logo / Icon</label>
            <div className="logo-picker">
              {logoOptions.map(l => (
                <button key={l} type="button"
                  className={`logo-option ${form.logo === l ? "logo-selected" : ""}`}
                  onClick={() => setForm({ ...form, logo: l })}>
                  {l}
                </button>
              ))}
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Job Title *</label>
              <div className="input-wrap">
                <i className="fa fa-briefcase input-icon"></i>
                <input name="title" type="text" placeholder="e.g. Frontend Developer" value={form.title} onChange={handleChange} required />
              </div>
            </div>
            <div className="form-group">
              <label>Company Name *</label>
              <div className="input-wrap">
                <i className="fa fa-building input-icon"></i>
                <input name="company" type="text" placeholder="Your company" value={form.company} onChange={handleChange} required />
              </div>
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Location *</label>
              <div className="input-wrap">
                <i className="fa fa-map-marker-alt input-icon"></i>
                <select name="location" value={form.location} onChange={handleChange} required>
                  <option value="">Select location</option>
                  {["Bangalore","Mumbai","Delhi","Hyderabad","Chennai","Pune","Remote"].map(l => <option key={l}>{l}</option>)}
                </select>
              </div>
            </div>
            <div className="form-group">
              <label>Job Type *</label>
              <div className="input-wrap">
                <i className="fa fa-clock input-icon"></i>
                <select name="type" value={form.type} onChange={handleChange}>
                  {["Full-time","Part-time","Remote","Internship"].map(t => <option key={t}>{t}</option>)}
                </select>
              </div>
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Category *</label>
              <div className="input-wrap">
                <i className="fa fa-tag input-icon"></i>
                <select name="category" value={form.category} onChange={handleChange}>
                  {["Technology","Data Science","Design","Marketing","Finance","Human Resources"].map(c => <option key={c}>{c}</option>)}
                </select>
              </div>
            </div>
            <div className="form-group">
              <label>Experience Level *</label>
              <div className="input-wrap">
                <i className="fa fa-chart-line input-icon"></i>
                <select name="experience" value={form.experience} onChange={handleChange}>
                  {["Fresher","0–2 Years","1–3 Years","2–5 Years","3–6 Years","5+ Years"].map(e => <option key={e}>{e}</option>)}
                </select>
              </div>
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Salary / Stipend *</label>
              <div className="input-wrap">
                <i className="fa fa-rupee-sign input-icon"></i>
                <input name="salary" type="text" placeholder="e.g. ₹8–12 LPA or ₹15,000/month" value={form.salary} onChange={handleChange} required />
              </div>
            </div>
            <div className="form-group">
              <label>Application Deadline *</label>
              <div className="input-wrap">
                <i className="fa fa-calendar input-icon"></i>
                <input name="deadline" type="date" value={form.deadline} onChange={handleChange} required min={new Date().toISOString().split("T")[0]} />
              </div>
            </div>
          </div>

          <div className="form-group">
            <label>Job Description *</label>
            <textarea name="description" placeholder="Describe the role, responsibilities, and what you're looking for in a candidate..."
              value={form.description} onChange={handleChange} rows="5"
              style={{ width: "100%", padding: "12px 14px", borderRadius: "8px", border: "1.5px solid #e5e7eb", fontSize: "14px", resize: "vertical", fontFamily: "inherit" }}
              required />
          </div>

          <div className="form-group">
            <label>Required Skills / Requirements (comma-separated)</label>
            <div className="input-wrap">
              <i className="fa fa-list input-icon"></i>
              <input name="requirements" type="text" placeholder="React, JavaScript, Node.js, SQL..." value={form.requirements} onChange={handleChange} />
            </div>
            {form.requirements && (
              <div className="jc-skills" style={{ marginTop: "10px" }}>
                {form.requirements.split(",").map((r, i) => r.trim() && <span key={i} className="skill-pill">{r.trim()}</span>)}
              </div>
            )}
          </div>

          <button type="submit" className={`btn btn-primary btn-full ${loading ? "btn-loading" : ""}`} disabled={loading} style={{ marginTop: "8px", padding: "14px" }}>
            {loading ? <span className="spinner"></span> : <><i className="fa fa-paper-plane"></i> Publish Job Listing</>}
          </button>
        </form>

        {/* Live Preview */}
        <div className="postjob-preview">
          <h3 className="preview-title">Live Preview</h3>
          <div className="job-card-new" style={{ maxWidth: "100%" }}>
            <div className="jc-header">
              <div className="jc-logo">{form.logo}</div>
              <div className="jc-title-wrap">
                <h3 className="jc-title">{form.title || "Job Title"}</h3>
                <span className="jc-company">{form.company || "Company Name"}</span>
              </div>
            </div>
            <div className="jc-meta">
              <span className="jc-tag">{form.location || "Location"}</span>
              <span className="jc-tag">{form.type}</span>
              <span className="jc-tag">{form.experience}</span>
            </div>
            <p className="jc-desc">{(form.description || "Your job description will appear here...").slice(0, 110)}{form.description.length > 110 ? "..." : ""}</p>
            {form.requirements && (
              <div className="jc-skills">
                {form.requirements.split(",").slice(0, 4).map((r, i) => r.trim() && <span key={i} className="skill-pill">{r.trim()}</span>)}
              </div>
            )}
            <div className="jc-footer">
              <span className="jc-salary">{form.salary || "Salary"}</span>
              <button className="btn btn-primary btn-sm" disabled>Apply Now</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
