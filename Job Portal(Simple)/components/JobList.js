// JobList.js - Browse Jobs Page
// Fetches jobs from our simulated Spring Boot API and allows filtering/searching

function JobList({ user, onOpenAuth, onNavigate }) {
  // State for jobs data
  const [jobs, setJobs] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  // Search & Filter state
  const [searchText, setSearchText] = React.useState("");
  const [filterType, setFilterType] = React.useState("All");
  const [filterCategory, setFilterCategory] = React.useState("All");
  const [filterLocation, setFilterLocation] = React.useState("All");

  // Modal state
  const [selectedJob, setSelectedJob] = React.useState(null);  // job detail popup
  const [applyingJob, setApplyingJob] = React.useState(null);  // apply popup
  const [applyNote, setApplyNote] = React.useState("");
  const [applyLoading, setApplyLoading] = React.useState(false);
  const [applyMsg, setApplyMsg] = React.useState("");

  // Fetch jobs from our API on component mount
  React.useEffect(() => {
    async function loadJobs() {
      setLoading(true);
      const data = await apiGetJobs();
      setJobs(data);
      setLoading(false);
    }
    loadJobs();
  }, []);

  // Get unique values for filter dropdowns
  const jobTypes = ["All", ...new Set(jobs.map(j => j.type))];
  const categories = ["All", ...new Set(jobs.map(j => j.category))];
  const locations = ["All", ...new Set(jobs.map(j => j.location))];

  // Filter jobs based on search and filter state
  const filteredJobs = jobs.filter(job => {
    const matchText = searchText === "" ||
      job.title.toLowerCase().includes(searchText.toLowerCase()) ||
      job.company.toLowerCase().includes(searchText.toLowerCase()) ||
      job.requirements.some(r => r.toLowerCase().includes(searchText.toLowerCase()));
    const matchType = filterType === "All" || job.type === filterType;
    const matchCat = filterCategory === "All" || job.category === filterCategory;
    const matchLoc = filterLocation === "All" || job.location === filterLocation;
    return matchText && matchType && matchCat && matchLoc;
  });

  // Clear all filters
  function clearFilters() {
    setSearchText("");
    setFilterType("All");
    setFilterCategory("All");
    setFilterLocation("All");
  }

  // Handle apply button click
  async function handleApply(job) {
    if (!user) {
      onOpenAuth("login");
      return;
    }
    if (user.role === "employer") {
      alert("Employers cannot apply for jobs.");
      return;
    }
    setApplyingJob(job);
    setApplyNote("");
    setApplyMsg("");
  }

  // Submit application
  async function submitApplication(e) {
    e.preventDefault();
    setApplyLoading(true);
    const result = await apiApplyJob(applyingJob.id, user.id, applyNote);
    if (result.success) {
      setApplyMsg("success");
    } else {
      setApplyMsg(result.error);
    }
    setApplyLoading(false);
  }

  return (
    <div className="joblist-page page-padding-top">
      <h1 className="page-title">Browse Jobs</h1>
      <p className="page-subtitle">Find jobs from top companies. Powered by Spring Boot API.</p>

      {/* Search Bar */}
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search by job title, company or skill..."
          value={searchText}
          onChange={e => setSearchText(e.target.value)}
        />
        <select value={filterLocation} onChange={e => setFilterLocation(e.target.value)}>
          {locations.map(l => <option key={l}>{l}</option>)}
        </select>
        <button className="btn btn-primary" onClick={() => {}}>
          <i className="fa fa-search"></i> Search
        </button>
      </div>

      <div className="joblist-body">
        {/* Filter Sidebar */}
        <div className="filter-panel">
          <div style={{display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px"}}>
            <h3 style={{margin: 0, borderBottom: "none", paddingBottom: 0}}>Filters</h3>
            <button className="clear-filters-btn" onClick={clearFilters}>Clear All</button>
          </div>

          {/* Job Type filter */}
          <div className="filter-section">
            <label className="filter-title">Job Type</label>
            {jobTypes.map(type => (
              <label key={type} className="filter-option">
                <input
                  type="radio"
                  name="typeFilter"
                  checked={filterType === type}
                  onChange={() => setFilterType(type)}
                />
                {type}
              </label>
            ))}
          </div>

          {/* Category filter */}
          <div className="filter-section">
            <label className="filter-title">Category</label>
            {categories.map(cat => (
              <label key={cat} className="filter-option">
                <input
                  type="radio"
                  name="catFilter"
                  checked={filterCategory === cat}
                  onChange={() => setFilterCategory(cat)}
                />
                {cat}
              </label>
            ))}
          </div>
        </div>

        {/* Jobs Results */}
        <div className="jobs-results">
          {loading ? (
            <div className="loading-state">
              <div className="spinner"></div>
              <p>Loading jobs from API...</p>
            </div>
          ) : (
            <>
              <p className="results-info">
                Showing <strong>{filteredJobs.length}</strong> of {jobs.length} jobs
              </p>

              {filteredJobs.length === 0 ? (
                <div className="no-results">
                  <i className="fa fa-search"></i>
                  <p>No jobs found matching your search.</p>
                  <button className="btn btn-secondary btn-sm" onClick={clearFilters}>Clear Filters</button>
                </div>
              ) : (
                <div style={{display: "flex", flexDirection: "column", gap: "16px"}}>
                  {filteredJobs.map(job => (
                    <JobCard
                      key={job.id}
                      job={job}
                      user={user}
                      onApply={handleApply}
                      onViewDetail={setSelectedJob}
                    />
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </div>

      {/* ============================ */}
      {/* Job Detail Modal */}
      {/* ============================ */}
      {selectedJob && (
        <div className="modal-overlay" onClick={e => { if (e.target === e.currentTarget) setSelectedJob(null); }}>
          <div className="modal-box job-detail-modal" style={{maxWidth: "600px"}}>
            <div className="modal-header">
              <span></span>
              <button className="modal-close" onClick={() => setSelectedJob(null)}>✕</button>
            </div>

            <div className="jd-header">
              <div className="jd-logo">{selectedJob.logo}</div>
              <div>
                <div className="jd-title">{selectedJob.title}</div>
                <div className="jd-company">{selectedJob.company} · {selectedJob.location}</div>
              </div>
            </div>

            <div className="jd-body">
              <div className="jd-info-row">
                <span className="meta-tag type-badge">{selectedJob.type}</span>
                <span className="meta-tag">{selectedJob.category}</span>
                <span className="meta-tag"><i className="fa fa-briefcase"></i> {selectedJob.experience}</span>
                <span className="meta-tag"><i className="fa fa-users"></i> {selectedJob.applicants} applicants</span>
              </div>

              <div className="jd-salary-box">
                <i className="fa fa-money-bill-wave" style={{color: "#34a853"}}></i>
                <span className="jd-salary">{selectedJob.salary}</span>
              </div>

              <div className="jd-section-title">Job Description</div>
              <p className="jd-desc">{selectedJob.description}</p>

              <div className="jd-section-title">Required Skills</div>
              <div className="skills-wrap" style={{marginTop: "8px"}}>
                {selectedJob.requirements.map(skill => (
                  <span key={skill} className="skill-tag">{skill}</span>
                ))}
              </div>

              <p style={{fontSize: "12px", color: "#999", marginTop: "16px"}}>
                <i className="fa fa-calendar"></i> Posted on: {selectedJob.postedAt}
              </p>
            </div>

            <div className="jd-footer">
              <button className="btn btn-success" onClick={() => { setSelectedJob(null); handleApply(selectedJob); }}>
                Apply Now
              </button>
              <button className="btn btn-secondary" onClick={() => setSelectedJob(null)}>
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ============================ */}
      {/* Apply Job Modal */}
      {/* ============================ */}
      {applyingJob && (
        <div className="modal-overlay" onClick={e => { if (e.target === e.currentTarget) { setApplyingJob(null); } }}>
          <div className="modal-box" style={{maxWidth: "440px"}}>
            <div className="modal-header">
              <h2>Apply for Job</h2>
              <button className="modal-close" onClick={() => setApplyingJob(null)}>✕</button>
            </div>
            <div className="modal-body">

              {/* Job Info */}
              <div className="apply-job-info">
                <div className="job-name">{applyingJob.title}</div>
                <div className="company">{applyingJob.company} · {applyingJob.location}</div>
              </div>

              {/* Success State */}
              {applyMsg === "success" ? (
                <div style={{textAlign: "center", padding: "20px 0"}}>
                  <div style={{fontSize: "3rem", marginBottom: "12px"}}>✅</div>
                  <h3 style={{marginBottom: "8px"}}>Application Submitted!</h3>
                  <p style={{color: "#666", fontSize: "14px"}}>
                    You have successfully applied for <strong>{applyingJob.title}</strong> at {applyingJob.company}.
                  </p>
                  <button className="btn btn-primary" style={{marginTop: "16px"}} onClick={() => setApplyingJob(null)}>
                    Done
                  </button>
                </div>
              ) : (
                <form onSubmit={submitApplication}>
                  {applyMsg && (
                    <div className="alert alert-error">
                      <i className="fa fa-exclamation-circle"></i> {applyMsg}
                    </div>
                  )}

                  <div className="form-group">
                    <label>Applicant Name</label>
                    <input type="text" value={user ? user.name : ""} readOnly style={{background: "#f5f5f5"}} />
                  </div>

                  <div className="form-group">
                    <label>Email</label>
                    <input type="text" value={user ? user.email : ""} readOnly style={{background: "#f5f5f5"}} />
                  </div>

                  <div className="form-group">
                    <label>Why should we hire you? (optional)</label>
                    <textarea
                      rows="3"
                      placeholder="Write a short note to the employer..."
                      value={applyNote}
                      onChange={e => setApplyNote(e.target.value)}
                    ></textarea>
                  </div>

                  <div style={{display: "flex", gap: "10px"}}>
                    <button type="submit" className="btn btn-success" disabled={applyLoading}>
                      {applyLoading ? "Submitting..." : "Submit Application"}
                    </button>
                    <button type="button" className="btn btn-secondary" onClick={() => setApplyingJob(null)}>
                      Cancel
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
