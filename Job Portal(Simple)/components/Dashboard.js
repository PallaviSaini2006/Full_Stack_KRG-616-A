// Dashboard.js - User Dashboard Page
// Shows different views depending on user role (seeker or employer)
// Uses React useEffect to fetch data from our simulated Spring Boot API

function Dashboard({ user, onNavigate, onOpenAuth }) {
  const [activeTab, setActiveTab] = React.useState("applications");
  const [applications, setApplications] = React.useState([]);
  const [jobs, setJobs] = React.useState([]);   // for all jobs (to lookup job titles)
  const [myJobs, setMyJobs] = React.useState([]); // for employer's posted jobs
  const [loading, setLoading] = React.useState(true);

  // Profile edit state
  const [profileName, setProfileName] = React.useState(user ? user.name : "");
  const [profileSkills, setProfileSkills] = React.useState(user ? user.skills || "" : "");
  const [profileSaved, setProfileSaved] = React.useState(false);
  const [profileLoading, setProfileLoading] = React.useState(false);

  // If user is not logged in
  if (!user) {
    return (
      <div className="dashboard-page page-padding-top">
        <div className="empty-state">
          <i className="fa fa-lock"></i>
          <p>You need to be logged in to view your dashboard.</p>
          <button className="btn btn-primary" onClick={() => onOpenAuth("login")}>Login</button>
        </div>
      </div>
    );
  }

  // Fetch data when component loads
  React.useEffect(() => {
    async function loadData() {
      setLoading(true);

      if (user.role === "seeker") {
        // Fetch applications for this user
        const apps = await apiGetMyApplications(user.id);
        setApplications(apps);
        // Also fetch all jobs to get job details
        const allJobs = await apiGetJobs();
        setJobs(allJobs);
      } else if (user.role === "employer") {
        // Fetch jobs posted by this employer
        const empJobs = await apiGetEmployerJobs(user.id);
        setMyJobs(empJobs);
        // Also get all applications to count per job
        const allJobs = await apiGetJobs();
        setJobs(allJobs);
      }

      setLoading(false);
    }

    loadData();
  }, [user]);

  // Helper: find job details by id
  function getJobById(id) {
    return jobs.find(j => j.id === id);
  }

  // Status badge color
  function getStatusClass(status) {
    if (status === "Shortlisted") return "status-badge status-shortlisted";
    if (status === "Rejected") return "status-badge status-rejected";
    return "status-badge status-review";
  }

  // Save profile
  async function saveProfile(e) {
    e.preventDefault();
    setProfileLoading(true);
    const updated = await apiUpdateUser(user.id, { name: profileName, skills: profileSkills });
    // Update session with new info
    setSession(updated);
    setProfileSaved(true);
    setProfileLoading(false);
    setTimeout(() => setProfileSaved(false), 3000);
  }

  // Delete employer job
  async function deleteJob(jobId) {
    if (!window.confirm("Are you sure you want to delete this job posting?")) return;
    await apiDeleteJob(jobId);
    setMyJobs(myJobs.filter(j => j.id !== jobId));
  }

  return (
    <div className="dashboard-page page-padding-top">

      {/* Welcome Banner */}
      <div className={`dashboard-welcome ${user.role === "employer" ? "employer-card" : ""}`}>
        <div className="welcome-avatar">
          {user.name.slice(0, 2).toUpperCase()}
        </div>
        <div className="welcome-info">
          <h2>Hello, {user.name}!</h2>
          <p>
            {user.role === "seeker"
              ? `Logged in as Job Seeker · ${applications.length} application(s) submitted`
              : `Logged in as Employer at ${user.company || "your company"} · ${myJobs.length} job(s) posted`
            }
          </p>
        </div>
      </div>

      {/* ============ JOB SEEKER DASHBOARD ============ */}
      {user.role === "seeker" && (
        <>
          {/* Tabs */}
          <div className="dash-tabs">
            <button className={`dash-tab ${activeTab === "applications" ? "active" : ""}`} onClick={() => setActiveTab("applications")}>
              My Applications ({applications.length})
            </button>
            <button className={`dash-tab ${activeTab === "profile" ? "active" : ""}`} onClick={() => setActiveTab("profile")}>
              Edit Profile
            </button>
          </div>

          {/* Applications Tab */}
          {activeTab === "applications" && (
            loading ? (
              <div className="loading-state">
                <div className="spinner"></div>
                <p>Fetching applications from API...</p>
              </div>
            ) : applications.length === 0 ? (
              <div className="empty-state">
                <i className="fa fa-file-alt"></i>
                <p>You haven't applied to any jobs yet.</p>
                <button className="btn btn-primary" onClick={() => onNavigate("jobs")}>
                  Browse Jobs
                </button>
              </div>
            ) : (
              <div className="table-wrapper">
                <table className="data-table">
                  <thead>
                    <tr>
                      <th>Job Title</th>
                      <th>Company</th>
                      <th>Applied On</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {applications.map(app => {
                      const job = getJobById(app.jobId);
                      return (
                        <tr key={app.id}>
                          <td>{job ? job.title : "Job #" + app.jobId}</td>
                          <td>{job ? job.company : "-"}</td>
                          <td>{app.appliedAt}</td>
                          <td>
                            <span className={getStatusClass(app.status)}>{app.status}</span>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )
          )}

          {/* Profile Tab */}
          {activeTab === "profile" && (
            <div className="profile-section">
              <h3>Edit Your Profile</h3>
              <form onSubmit={saveProfile}>
                {profileSaved && (
                  <div className="alert alert-success">
                    <i className="fa fa-check-circle"></i> Profile saved successfully!
                  </div>
                )}
                <div className="form-group">
                  <label>Full Name</label>
                  <input
                    type="text"
                    value={profileName}
                    onChange={e => setProfileName(e.target.value)}
                    placeholder="Your name"
                  />
                </div>
                <div className="form-group">
                  <label>Email (cannot be changed)</label>
                  <input type="text" value={user.email} readOnly style={{background: "#f5f5f5"}} />
                </div>
                <div className="form-group">
                  <label>Skills (comma-separated)</label>
                  <input
                    type="text"
                    value={profileSkills}
                    onChange={e => setProfileSkills(e.target.value)}
                    placeholder="e.g. React, Java, SQL"
                  />
                </div>
                <button type="submit" className="btn btn-primary" disabled={profileLoading}>
                  {profileLoading ? "Saving..." : "Save Profile"}
                </button>
              </form>
            </div>
          )}
        </>
      )}

      {/* ============ EMPLOYER DASHBOARD ============ */}
      {user.role === "employer" && (
        <>
          {/* Tabs */}
          <div className="dash-tabs">
            <button className={`dash-tab ${activeTab === "jobs" ? "active" : ""}`} onClick={() => setActiveTab("jobs")}>
              My Job Postings ({myJobs.length})
            </button>
            <button className={`dash-tab ${activeTab === "profile" ? "active" : ""}`} onClick={() => setActiveTab("profile")}>
              Company Profile
            </button>
          </div>

          {/* My Jobs Tab */}
          {activeTab === "jobs" && (
            loading ? (
              <div className="loading-state">
                <div className="spinner"></div>
                <p>Loading your jobs from API...</p>
              </div>
            ) : myJobs.length === 0 ? (
              <div className="empty-state">
                <i className="fa fa-plus-circle"></i>
                <p>You haven't posted any jobs yet.</p>
                <button className="btn btn-primary" onClick={() => onNavigate("postjob")}>
                  Post a Job
                </button>
              </div>
            ) : (
              <div className="table-wrapper">
                <table className="data-table">
                  <thead>
                    <tr>
                      <th>Job Title</th>
                      <th>Type</th>
                      <th>Location</th>
                      <th>Applicants</th>
                      <th>Posted On</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {myJobs.map(job => (
                      <tr key={job.id}>
                        <td><strong>{job.title}</strong></td>
                        <td>{job.type}</td>
                        <td>{job.location}</td>
                        <td>{job.applicants}</td>
                        <td>{job.postedAt}</td>
                        <td>
                          <button
                            className="btn btn-danger btn-sm"
                            onClick={() => deleteJob(job.id)}
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )
          )}

          {/* Profile Tab */}
          {activeTab === "profile" && (
            <div className="profile-section">
              <h3>Company Profile</h3>
              <form onSubmit={saveProfile}>
                {profileSaved && (
                  <div className="alert alert-success">
                    <i className="fa fa-check-circle"></i> Profile updated!
                  </div>
                )}
                <div className="form-group">
                  <label>Your Name</label>
                  <input type="text" value={profileName} onChange={e => setProfileName(e.target.value)} />
                </div>
                <div className="form-group">
                  <label>Email</label>
                  <input type="text" value={user.email} readOnly style={{background: "#f5f5f5"}} />
                </div>
                <div className="form-group">
                  <label>Company Name</label>
                  <input type="text" value={user.company || ""} readOnly style={{background: "#f5f5f5"}} />
                </div>
                <button type="submit" className="btn btn-primary" disabled={profileLoading}>
                  {profileLoading ? "Saving..." : "Save Changes"}
                </button>
              </form>
            </div>
          )}
        </>
      )}

    </div>
  );
}
