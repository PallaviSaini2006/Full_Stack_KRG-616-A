// PostJob.js - Post a New Job (Employer only)
// Uses apiCreateJob() which simulates a Spring Boot POST /api/jobs request

function PostJob({ user, onNavigate, onOpenAuth }) {
  const [form, setForm] = React.useState({
    title: "",
    company: user ? (user.company || "") : "",
    location: "",
    type: "Full-time",
    category: "Technology",
    experience: "",
    salary: "",
    description: "",
    requirements: "",
    logo: "💼"
  });

  const [loading, setLoading] = React.useState(false);
  const [success, setSuccess] = React.useState(false);
  const [error, setError] = React.useState("");

  // If not logged in or not employer, show message
  if (!user) {
    return (
      <div className="postjob-page page-padding-top">
        <div className="empty-state">
          <i className="fa fa-lock"></i>
          <p>You need to be logged in as an Employer to post a job.</p>
          <button className="btn btn-primary" onClick={() => onOpenAuth("login")}>Login as Employer</button>
        </div>
      </div>
    );
  }

  if (user.role !== "employer") {
    return (
      <div className="postjob-page page-padding-top">
        <div className="empty-state">
          <i className="fa fa-info-circle"></i>
          <p>Only employers can post job listings.</p>
          <button className="btn btn-primary" onClick={() => onNavigate("jobs")}>Browse Jobs Instead</button>
        </div>
      </div>
    );
  }

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");

    // Simple validation
    if (!form.title.trim() || !form.company.trim() || !form.location.trim() || !form.description.trim()) {
      setError("Please fill in all required fields.");
      return;
    }

    setLoading(true);

    // Convert requirements from comma-separated string to array
    const jobData = {
      ...form,
      postedBy: user.id,
      requirements: form.requirements.split(",").map(r => r.trim()).filter(r => r !== "")
    };

    const newJob = await apiCreateJob(jobData);
    setLoading(false);
    setSuccess(true);
  }

  // Job type and category choices
  const jobTypes = ["Full-time", "Part-time", "Internship", "Remote", "Contract"];
  const categories = ["Technology", "Data Science", "Design", "Marketing", "Finance", "Human Resources", "Other"];
  const logos = ["💻", "📊", "⚙️", "🎨", "📢", "💰", "👥", "🚀", "🤖", "🖥️", "✍️", "☁️", "💼"];

  // Success screen
  if (success) {
    return (
      <div className="postjob-page page-padding-top">
        <div className="success-screen">
          <div className="checkmark">✅</div>
          <h2>Job Posted Successfully!</h2>
          <p>Your job listing for <strong>{form.title}</strong> at {form.company} has been published.</p>
          <p style={{color: "#999", fontSize: "13px"}}>API call: POST /api/jobs → 201 Created</p>
          <div style={{display: "flex", gap: "12px", justifyContent: "center", marginTop: "20px"}}>
            <button className="btn btn-primary" onClick={() => onNavigate("jobs")}>
              View All Jobs
            </button>
            <button className="btn btn-secondary" onClick={() => { setSuccess(false); setForm({...form, title: "", description: "", requirements: ""}); }}>
              Post Another Job
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="postjob-page page-padding-top">
      <h1>Post a New Job</h1>
      <p className="page-subtitle">Fill in the details below to publish a job listing.</p>

      <div className="postjob-form">

        {error && (
          <div className="alert alert-error" style={{marginBottom: "18px"}}>
            <i className="fa fa-exclamation-circle"></i> {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>

          {/* Job Title + Company */}
          <div className="form-row">
            <div className="form-group">
              <label>Job Title *</label>
              <input
                type="text"
                name="title"
                placeholder="e.g. Frontend Developer"
                value={form.title}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Company Name *</label>
              <input
                type="text"
                name="company"
                placeholder="Your company"
                value={form.company}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          {/* Location + Job Type */}
          <div className="form-row">
            <div className="form-group">
              <label>Location *</label>
              <input
                type="text"
                name="location"
                placeholder="e.g. Bangalore, Remote"
                value={form.location}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Job Type *</label>
              <select name="type" value={form.type} onChange={handleChange}>
                {jobTypes.map(t => <option key={t}>{t}</option>)}
              </select>
            </div>
          </div>

          {/* Category + Experience */}
          <div className="form-row">
            <div className="form-group">
              <label>Category *</label>
              <select name="category" value={form.category} onChange={handleChange}>
                {categories.map(c => <option key={c}>{c}</option>)}
              </select>
            </div>
            <div className="form-group">
              <label>Experience Required</label>
              <input
                type="text"
                name="experience"
                placeholder="e.g. 1-3 Years, Fresher"
                value={form.experience}
                onChange={handleChange}
              />
            </div>
          </div>

          {/* Salary */}
          <div className="form-group">
            <label>Salary / Stipend</label>
            <input
              type="text"
              name="salary"
              placeholder="e.g. ₹8–12 LPA or ₹15,000/month"
              value={form.salary}
              onChange={handleChange}
            />
          </div>

          {/* Description */}
          <div className="form-group">
            <label>Job Description *</label>
            <textarea
              name="description"
              rows="5"
              placeholder="Describe the role, responsibilities, and work environment..."
              value={form.description}
              onChange={handleChange}
              required
            ></textarea>
          </div>

          {/* Requirements / Skills */}
          <div className="form-group">
            <label>Required Skills (comma-separated)</label>
            <input
              type="text"
              name="requirements"
              placeholder="e.g. React, Java, MySQL, Git"
              value={form.requirements}
              onChange={handleChange}
            />
          </div>

          {/* Logo picker */}
          <div className="form-group">
            <label>Company Icon</label>
            <div style={{display: "flex", gap: "8px", flexWrap: "wrap", marginTop: "6px"}}>
              {logos.map(emoji => (
                <button
                  key={emoji}
                  type="button"
                  onClick={() => setForm({...form, logo: emoji})}
                  style={{
                    fontSize: "22px",
                    padding: "6px",
                    border: form.logo === emoji ? "2px solid #1a73e8" : "1px solid #ddd",
                    borderRadius: "4px",
                    background: form.logo === emoji ? "#e8f0fe" : "white",
                    cursor: "pointer"
                  }}
                >
                  {emoji}
                </button>
              ))}
            </div>
          </div>

          <div className="form-actions">
            <button type="submit" className="btn btn-success" disabled={loading}>
              {loading ? "Publishing Job..." : "Publish Job"}
            </button>
            <button type="button" className="btn btn-secondary" onClick={() => onNavigate("dashboard")}>
              Cancel
            </button>
          </div>

          <p style={{fontSize: "12px", color: "#999", marginTop: "12px"}}>
            * This will call POST {API_BASE_URL}/jobs (Spring Boot REST endpoint)
          </p>
        </form>

      </div>
    </div>
  );
}
