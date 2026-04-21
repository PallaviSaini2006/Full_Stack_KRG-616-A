// ============================================================
// Dashboard.js — Job Seeker + Employer + Admin Dashboards
// ============================================================

// ---- JOB SEEKER DASHBOARD ----
function SeekerDashboard({ user, onNavigate, onAuthOpen }) {
  const [tab, setTab] = React.useState("applied");
  const [applications, setApplications] = React.useState([]);
  const [bookmarkedJobs, setBookmarkedJobs] = React.useState([]);
  const [profile, setProfile] = React.useState({ ...user });
  const [editMode, setEditMode] = React.useState(false);
  const [toast, setToast] = React.useState("");

  React.useEffect(() => {
    const apps = DB.getApplicationsByUser(user.id);
    const jobs = DB.getJobs();
    const appWithJobs = apps.map(a => ({ ...a, job: jobs.find(j => j.id === a.jobId) }));
    setApplications(appWithJobs);

    const bookmarkIds = DB.getBookmarks(user.id);
    const bookmarkJobs = jobs.filter(j => bookmarkIds.includes(j.id));
    setBookmarkedJobs(bookmarkJobs);
  }, [user]);

  const showToast = (msg) => { setToast(msg); setTimeout(() => setToast(""), 3000); };

  const handleSaveProfile = () => {
    DB.updateUser(user.id, profile);
    setEditMode(false);
    showToast("✅ Profile updated successfully!");
  };

  const statusColor = { "Under Review": "#f59e0b", "Shortlisted": "#10b981", "Rejected": "#ef4444", "Hired": "#6366f1" };

  return (
    <div className="dashboard-page">
      {toast && <div className="toast toast-success">{toast}</div>}

      {/* Dashboard Header */}
      <div className="dashboard-hero">
        <div className="dash-avatar">{user.avatar}</div>
        <div className="dash-info">
          <h1>Welcome, {user.name}! 👋</h1>
          <p>{user.email} · Job Seeker</p>
          {user.skills && <p className="dash-skills">Skills: {user.skills}</p>}
        </div>
        <div className="dash-stats">
          <div className="dash-stat"><span>{applications.length}</span><label>Applied</label></div>
          <div className="dash-stat"><span>{bookmarkedJobs.length}</span><label>Saved</label></div>
          <div className="dash-stat"><span>{applications.filter(a => a.status === "Shortlisted").length}</span><label>Shortlisted</label></div>
        </div>
      </div>

      {/* Tabs */}
      <div className="dash-tabs">
        {[["applied","Applications"],["saved","Saved Jobs"],["profile","My Profile"]].map(([key, label]) => (
          <button key={key} className={`dash-tab ${tab === key ? "dash-tab-active" : ""}`} onClick={() => setTab(key)}>
            {label}
          </button>
        ))}
      </div>

      {/* Applications Tab */}
      {tab === "applied" && (
        <div className="dash-content">
          {applications.length === 0 ? (
            <div className="empty-state">
              <span style={{fontSize:"3rem"}}>📋</span>
              <h3>No applications yet</h3>
              <p>Start exploring jobs and apply today!</p>
              <button className="btn btn-primary" onClick={() => onNavigate("jobs")}>Browse Jobs</button>
            </div>
          ) : (
            <div className="applications-list">
              {applications.map(app => app.job && (
                <div key={app.id} className="app-card">
                  <div className="app-logo">{app.job.logo}</div>
                  <div className="app-info">
                    <h4 className="app-title">{app.job.title}</h4>
                    <span className="app-company">{app.job.company} · {app.job.location}</span>
                    <span className="app-date">Applied: {app.appliedAt}</span>
                  </div>
                  <div className="app-right">
                    <span className="app-status" style={{background: statusColor[app.status] + "20", color: statusColor[app.status]}}>
                      {app.status}
                    </span>
                    <span className="app-salary">{app.job.salary}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Saved Jobs Tab */}
      {tab === "saved" && (
        <div className="dash-content">
          {bookmarkedJobs.length === 0 ? (
            <div className="empty-state">
              <span style={{fontSize:"3rem"}}>🔖</span>
              <h3>No saved jobs</h3>
              <p>Bookmark jobs you like to review later.</p>
              <button className="btn btn-primary" onClick={() => onNavigate("jobs")}>Explore Jobs</button>
            </div>
          ) : (
            <div className="jobs-grid">
              {bookmarkedJobs.map(job => (
                <div key={job.id} className="job-card-new">
                  <div className="jc-header">
                    <div className="jc-logo">{job.logo}</div>
                    <div className="jc-title-wrap">
                      <h3 className="jc-title">{job.title}</h3>
                      <span className="jc-company">{job.company}</span>
                    </div>
                  </div>
                  <div className="jc-meta">
                    <span className="jc-tag">{job.location}</span>
                    <span className="jc-tag">{job.type}</span>
                  </div>
                  <div className="jc-footer">
                    <span className="jc-salary">{job.salary}</span>
                    <button className="btn btn-primary btn-sm" onClick={() => onNavigate("jobs")}>Apply</button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Profile Tab */}
      {tab === "profile" && (
        <div className="dash-content">
          <div className="profile-card">
            <div className="profile-avatar-big">{user.avatar}</div>
            {editMode ? (
              <div className="profile-form">
                <div className="form-group">
                  <label>Full Name</label>
                  <input type="text" value={profile.name} onChange={e => setProfile({...profile, name: e.target.value})} className="profile-input" />
                </div>
                <div className="form-group">
                  <label>Email</label>
                  <input type="email" value={profile.email} readOnly className="profile-input" style={{background:"#f3f4f6"}} />
                </div>
                <div className="form-group">
                  <label>Skills (comma separated)</label>
                  <input type="text" value={profile.skills || ""} onChange={e => setProfile({...profile, skills: e.target.value})} className="profile-input" placeholder="React, Python, SQL..." />
                </div>
                <div className="form-group">
                  <label>New Password</label>
                  <input type="password" value={profile.password} onChange={e => setProfile({...profile, password: e.target.value})} className="profile-input" />
                </div>
                <div style={{display:"flex",gap:"12px"}}>
                  <button className="btn btn-primary" onClick={handleSaveProfile}>Save Changes</button>
                  <button className="btn btn-outline" onClick={() => setEditMode(false)}>Cancel</button>
                </div>
              </div>
            ) : (
              <div className="profile-display">
                <h2>{user.name}</h2>
                <p className="profile-email">{user.email}</p>
                <p className="profile-role">Role: Job Seeker</p>
                {user.skills && <p className="profile-skills">Skills: <strong>{user.skills}</strong></p>}
                <button className="btn btn-primary" style={{marginTop:"20px"}} onClick={() => setEditMode(true)}>
                  <i className="fa fa-edit"></i> Edit Profile
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}


// ---- EMPLOYER DASHBOARD ----
function EmployerDashboard({ user, onNavigate }) {
  const [tab, setTab] = React.useState("myjobs");
  const [myJobs, setMyJobs] = React.useState([]);
  const [selectedJobApps, setSelectedJobApps] = React.useState(null);
  const [toast, setToast] = React.useState("");

  React.useEffect(() => {
    const jobs = DB.getJobs().filter(j => j.postedBy === user.id);
    setMyJobs(jobs);
  }, [user]);

  const showToast = (msg) => { setToast(msg); setTimeout(() => setToast(""), 3000); };

  const handleDelete = (jobId) => {
    if (window.confirm("Delete this job posting?")) {
      DB.deleteJob(jobId);
      setMyJobs(DB.getJobs().filter(j => j.postedBy === user.id));
      showToast("Job deleted.");
    }
  };

  const viewApplicants = (job) => {
    const apps = DB.getApplicationsByJob(job.id);
    const users = DB.getUsers();
    const withUsers = apps.map(a => ({ ...a, applicant: users.find(u => u.id === a.userId) }));
    setSelectedJobApps({ job, apps: withUsers });
  };

  const totalApplicants = myJobs.reduce((sum, j) => sum + (j.applicants || 0), 0);

  return (
    <div className="dashboard-page">
      {toast && <div className="toast toast-success">{toast}</div>}

      <div className="dashboard-hero employer-hero">
        <div className="dash-avatar employer-avatar">{user.avatar}</div>
        <div className="dash-info">
          <h1>Welcome, {user.name}! 🏢</h1>
          <p>{user.company} · Employer Account</p>
        </div>
        <div className="dash-stats">
          <div className="dash-stat"><span>{myJobs.length}</span><label>Jobs Posted</label></div>
          <div className="dash-stat"><span>{totalApplicants}</span><label>Total Applicants</label></div>
          <div className="dash-stat"><span>{myJobs.filter(j => j.featured).length}</span><label>Featured</label></div>
        </div>
      </div>

      <div className="dash-tabs">
        <button className={`dash-tab ${tab === "myjobs" ? "dash-tab-active" : ""}`} onClick={() => setTab("myjobs")}>My Job Posts</button>
        <button className={`dash-tab ${tab === "postjob" ? "dash-tab-active" : ""}`} onClick={() => onNavigate("postjob")}>+ Post New Job</button>
      </div>

      {tab === "myjobs" && (
        <div className="dash-content">
          {selectedJobApps ? (
            <div>
              <button className="btn btn-outline" style={{marginBottom:"20px"}} onClick={() => setSelectedJobApps(null)}>← Back to Jobs</button>
              <h3>Applicants for: {selectedJobApps.job.title}</h3>
              {selectedJobApps.apps.length === 0 ? (
                <div className="empty-state"><span>👤</span><h3>No applicants yet</h3></div>
              ) : (
                <div className="applicants-table-wrap">
                  <table className="applicants-table">
                    <thead><tr><th>Name</th><th>Email</th><th>Applied On</th><th>Status</th><th>Cover Letter</th></tr></thead>
                    <tbody>
                      {selectedJobApps.apps.map(app => (
                        <tr key={app.id}>
                          <td><strong>{app.applicant?.name || "Unknown"}</strong></td>
                          <td>{app.applicant?.email || "—"}</td>
                          <td>{app.appliedAt}</td>
                          <td><span className="app-status" style={{background:"#d1fae5",color:"#065f46"}}>{app.status}</span></td>
                          <td><span style={{fontSize:"12px",color:"#6b7280"}}>{(app.coverLetter || "").slice(0, 60) || "—"}</span></td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          ) : myJobs.length === 0 ? (
            <div className="empty-state">
              <span style={{fontSize:"3rem"}}>📝</span>
              <h3>No jobs posted yet</h3>
              <p>Start hiring by posting your first job listing!</p>
              <button className="btn btn-primary" onClick={() => onNavigate("postjob")}>Post a Job</button>
            </div>
          ) : (
            <div className="employer-jobs-list">
              {myJobs.map(job => (
                <div key={job.id} className="employer-job-card">
                  <div className="ejc-left">
                    <span className="ejc-logo">{job.logo}</span>
                    <div>
                      <h4 className="ejc-title">{job.title}</h4>
                      <span className="ejc-meta">{job.type} · {job.location} · {job.salary}</span>
                      <span className="ejc-date">Posted: {job.postedAt} · Deadline: {job.deadline}</span>
                    </div>
                  </div>
                  <div className="ejc-right">
                    <span className="ejc-applicants">{job.applicants} Applicants</span>
                    <button className="btn btn-outline btn-sm" onClick={() => viewApplicants(job)}>View Applicants</button>
                    <button className="btn btn-danger btn-sm" onClick={() => handleDelete(job.id)}>Delete</button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}


// ---- MAIN DASHBOARD ROUTER ----
function Dashboard({ user, onNavigate, onAuthOpen }) {
  if (!user) {
    return (
      <div className="empty-state" style={{minHeight:"60vh"}}>
        <span style={{fontSize:"3rem"}}>🔐</span>
        <h3>Please log in to view your dashboard</h3>
        <button className="btn btn-primary" onClick={() => onAuthOpen("login")}>Login</button>
      </div>
    );
  }
  if (user.role === "employer") return <EmployerDashboard user={user} onNavigate={onNavigate} />;
  return <SeekerDashboard user={user} onNavigate={onNavigate} onAuthOpen={onAuthOpen} />;
}
