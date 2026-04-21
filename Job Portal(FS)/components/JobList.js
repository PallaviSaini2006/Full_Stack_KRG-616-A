// ============================================================
// JobList.js — Job Listings Page with Filters + Apply Modal
// ============================================================

function ApplyModal({ job, user, onClose, onSuccess }) {
  const [form, setForm] = React.useState({ phone: "", coverLetter: "" });
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!user) { setError("Please login to apply."); return; }
    if (!form.phone) { setError("Phone number is required."); return; }
    setLoading(true);
    setTimeout(() => {
      const result = DB.apply(job.id, user.id, form.coverLetter, form.phone);
      setLoading(false);
      if (result.error) setError(result.error);
      else onSuccess(job);
    }, 700);
  };

  return (
    <div className="modal-overlay" onClick={e => { if (e.target === e.currentTarget) onClose(); }}>
      <div className="modal-box apply-modal">
        <button className="modal-close" onClick={onClose}>✕</button>
        <div className="apply-header">
          <span className="apply-logo">{job.logo}</span>
          <div>
            <h2 className="apply-title">Apply for {job.title}</h2>
            <p className="apply-company">{job.company} · {job.location}</p>
          </div>
        </div>
        {error && <div className="form-error"><i className="fa fa-exclamation-circle"></i> {error}</div>}
        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-group">
            <label>Full Name *</label>
            <div className="input-wrap">
              <i className="fa fa-user input-icon"></i>
              <input type="text" value={user ? user.name : ""} readOnly style={{background:"#f9f9f9"}} />
            </div>
          </div>
          <div className="form-group">
            <label>Email *</label>
            <div className="input-wrap">
              <i className="fa fa-envelope input-icon"></i>
              <input type="email" value={user ? user.email : ""} readOnly style={{background:"#f9f9f9"}} />
            </div>
          </div>
          <div className="form-group">
            <label>Phone Number *</label>
            <div className="input-wrap">
              <i className="fa fa-phone input-icon"></i>
              <input type="tel" placeholder="+91 XXXXX XXXXX" value={form.phone} onChange={e => setForm({...form, phone: e.target.value})} required />
            </div>
          </div>
          <div className="form-group">
            <label>Cover Letter (optional)</label>
            <textarea
              placeholder="Tell the employer why you're a great fit for this role..."
              value={form.coverLetter}
              onChange={e => setForm({...form, coverLetter: e.target.value})}
              rows="4"
              style={{width:"100%", padding:"10px 14px", borderRadius:"8px", border:"1.5px solid #e5e7eb", fontSize:"14px", resize:"vertical"}}
            />
          </div>
          <button type="submit" className={`btn btn-primary btn-full ${loading ? "btn-loading" : ""}`} disabled={loading}>
            {loading ? <span className="spinner"></span> : <><i className="fa fa-paper-plane"></i> Submit Application</>}
          </button>
        </form>
      </div>
    </div>
  );
}


function JobDetailModal({ job, user, onClose, onApply, bookmarks, onToggleBookmark }) {
  const isBookmarked = bookmarks && bookmarks.includes(job.id);
  const hasApplied = user ? DB.hasApplied(job.id, user.id) : false;

  return (
    <div className="modal-overlay" onClick={e => { if (e.target === e.currentTarget) onClose(); }}>
      <div className="modal-box detail-modal">
        <button className="modal-close" onClick={onClose}>✕</button>
        <div className="detail-header">
          <span className="detail-logo">{job.logo}</span>
          <div className="detail-title-wrap">
            <h2>{job.title}</h2>
            <p className="detail-company">{job.company}</p>
          </div>
          {user && (
            <button className={`bookmark-btn ${isBookmarked ? "bookmarked" : ""}`} onClick={() => onToggleBookmark(job.id)}>
              {isBookmarked ? "🔖 Saved" : "🔍 Save"}
            </button>
          )}
        </div>

        <div className="detail-tags">
          <span className="jc-tag"><i className="fa fa-map-marker-alt"></i> {job.location}</span>
          <span className="jc-tag">{job.type}</span>
          <span className="jc-tag"><i className="fa fa-briefcase"></i> {job.experience}</span>
          <span className="jc-tag"><i className="fa fa-users"></i> {job.applicants} Applicants</span>
          <span className="jc-tag"><i className="fa fa-calendar"></i> Deadline: {job.deadline}</span>
        </div>

        <div className="detail-salary-box">
          <i className="fa fa-money-bill-wave"></i>
          <span className="detail-salary">{job.salary}</span>
          <span className="salary-label">Per Annum</span>
        </div>

        <div className="detail-section">
          <h3>Job Description</h3>
          <p>{job.description}</p>
        </div>

        <div className="detail-section">
          <h3>Requirements</h3>
          <div className="jc-skills" style={{marginTop:"10px"}}>
            {job.requirements.map(r => <span key={r} className="skill-pill">{r}</span>)}
          </div>
        </div>

        <div className="detail-section">
          <h3>About the Company</h3>
          <p>
            <strong>{job.company}</strong> is a leading organisation in the {job.category} sector.
            We foster a culture of innovation, collaboration, and continuous growth.
            Join us and be part of a team that makes a difference every day.
          </p>
        </div>

        <div className="detail-actions">
          {hasApplied ? (
            <button className="btn btn-success btn-lg" disabled>✓ Already Applied</button>
          ) : (
            <button className="btn btn-primary btn-lg" onClick={() => onApply(job)}>
              <i className="fa fa-paper-plane"></i> Apply Now
            </button>
          )}
          <button className="btn btn-outline btn-lg" onClick={onClose}>Close</button>
        </div>
      </div>
    </div>
  );
}


function JobList({ user, onAuthOpen, initialFilters, onNavigate }) {
  const [jobs, setJobs] = React.useState([]);
  const [bookmarks, setBookmarks] = React.useState([]);
  const [search, setSearch] = React.useState(initialFilters?.query || "");
  const [location, setLocation] = React.useState(initialFilters?.location || "");
  const [category, setCategory] = React.useState(initialFilters?.category || "");
  const [jobType, setJobType] = React.useState("");
  const [experience, setExperience] = React.useState("");
  const [sortBy, setSortBy] = React.useState("recent");
  const [page, setPage] = React.useState(1);
  const [selectedJob, setSelectedJob] = React.useState(null);
  const [applyJob, setApplyJob] = React.useState(null);
  const [toast, setToast] = React.useState(null);
  const PER_PAGE = 6;

  React.useEffect(() => {
    setJobs(DB.getJobs());
    if (user) setBookmarks(DB.getBookmarks(user.id));
  }, [user]);

  React.useEffect(() => {
    if (initialFilters) {
      if (initialFilters.query) setSearch(initialFilters.query);
      if (initialFilters.category) setCategory(initialFilters.category);
      if (initialFilters.location) setLocation(initialFilters.location);
    }
  }, [initialFilters]);

  const showToast = (msg, type = "success") => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3000);
  };

  const handleApply = (job) => {
    if (!user) { onAuthOpen("login"); return; }
    setApplyJob(job);
    setSelectedJob(null);
  };

  const handleApplySuccess = (job) => {
    setApplyJob(null);
    showToast(`🎉 Application submitted for ${job.title}!`);
    setJobs(DB.getJobs());
  };

  const handleToggleBookmark = (jobId) => {
    if (!user) { onAuthOpen("login"); return; }
    const added = DB.toggleBookmark(jobId, user.id);
    setBookmarks(DB.getBookmarks(user.id));
    showToast(added ? "🔖 Job saved to bookmarks!" : "Bookmark removed.");
  };

  // Filter & Sort
  let filtered = jobs.filter(j => {
    const q = search.toLowerCase();
    const matchQ = !q || j.title.toLowerCase().includes(q) || j.company.toLowerCase().includes(q) ||
      j.requirements.some(r => r.toLowerCase().includes(q)) || j.category.toLowerCase().includes(q);
    const matchL = !location || j.location === location;
    const matchC = !category || j.category === category;
    const matchT = !jobType || j.type === jobType;
    const matchE = !experience || j.experience === experience;
    return matchQ && matchL && matchC && matchT && matchE;
  });

  if (sortBy === "recent") filtered.sort((a, b) => new Date(b.postedAt) - new Date(a.postedAt));
  else if (sortBy === "applicants") filtered.sort((a, b) => b.applicants - a.applicants);
  else if (sortBy === "featured") filtered.sort((a, b) => b.featured - a.featured);

  const totalPages = Math.ceil(filtered.length / PER_PAGE);
  const paginated = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE);

  const clearFilters = () => { setSearch(""); setLocation(""); setCategory(""); setJobType(""); setExperience(""); setPage(1); };

  return (
    <div className="joblist-page">
      {/* Toast */}
      {toast && <div className={`toast toast-${toast.type}`}>{toast.msg}</div>}

      {/* Modals */}
      {applyJob && <ApplyModal job={applyJob} user={user} onClose={() => setApplyJob(null)} onSuccess={handleApplySuccess} />}
      {selectedJob && (
        <JobDetailModal job={selectedJob} user={user} onClose={() => setSelectedJob(null)}
          onApply={handleApply} bookmarks={bookmarks} onToggleBookmark={handleToggleBookmark} />
      )}

      {/* Page Header */}
      <div className="joblist-header">
        <h1 className="joblist-title">Browse <span className="text-accent">All Jobs</span></h1>
        <p className="joblist-subtitle">Discover {jobs.length}+ opportunities matching your skills</p>
      </div>

      {/* Search Bar */}
      <div className="joblist-search">
        <div className="search-field">
          <i className="fa fa-search search-icon"></i>
          <input type="text" placeholder="Search jobs, skills, companies..." value={search}
            onChange={e => { setSearch(e.target.value); setPage(1); }} />
        </div>
        <div className="search-field">
          <i className="fa fa-map-marker-alt search-icon"></i>
          <select value={location} onChange={e => { setLocation(e.target.value); setPage(1); }}>
            <option value="">All Locations</option>
            {["Bangalore","Mumbai","Delhi","Hyderabad","Chennai","Pune","Remote"].map(l => <option key={l}>{l}</option>)}
          </select>
        </div>
        <button className="btn btn-primary" onClick={() => setPage(1)}>
          <i className="fa fa-search"></i> Search
        </button>
      </div>

      <div className="joblist-body">
        {/* Sidebar Filters */}
        <aside className="filter-sidebar">
          <div className="filter-header">
            <h3>Filters</h3>
            <button className="clear-btn" onClick={clearFilters}>Clear All</button>
          </div>

          <div className="filter-group">
            <label className="filter-label">Category</label>
            {["Technology","Data Science","Design","Marketing","Finance","Human Resources"].map(c => (
              <label key={c} className="filter-check">
                <input type="radio" name="category" checked={category === c} onChange={() => { setCategory(c); setPage(1); }} />
                <span>{c}</span>
              </label>
            ))}
            <label className="filter-check">
              <input type="radio" name="category" checked={category === ""} onChange={() => { setCategory(""); setPage(1); }} />
              <span>All Categories</span>
            </label>
          </div>

          <div className="filter-group">
            <label className="filter-label">Job Type</label>
            {["Full-time","Part-time","Remote","Internship"].map(t => (
              <label key={t} className="filter-check">
                <input type="radio" name="jobType" checked={jobType === t} onChange={() => { setJobType(t); setPage(1); }} />
                <span>{t}</span>
              </label>
            ))}
            <label className="filter-check">
              <input type="radio" name="jobType" checked={jobType === ""} onChange={() => { setJobType(""); setPage(1); }} />
              <span>All Types</span>
            </label>
          </div>

          <div className="filter-group">
            <label className="filter-label">Experience</label>
            {["Fresher","0–2 Years","1–3 Years","2–5 Years","3–6 Years","5+ Years"].map(e => (
              <label key={e} className="filter-check">
                <input type="radio" name="exp" checked={experience === e} onChange={() => { setExperience(e); setPage(1); }} />
                <span>{e}</span>
              </label>
            ))}
            <label className="filter-check">
              <input type="radio" name="exp" checked={experience === ""} onChange={() => { setExperience(""); setPage(1); }} />
              <span>Any Experience</span>
            </label>
          </div>
        </aside>

        {/* Job Cards */}
        <div className="jobs-main">
          {/* Sort + Result Count */}
          <div className="jobs-toolbar">
            <span className="results-count">Showing <strong>{filtered.length}</strong> jobs</span>
            <div className="sort-wrap">
              <label>Sort by:</label>
              <select value={sortBy} onChange={e => setSortBy(e.target.value)}>
                <option value="recent">Most Recent</option>
                <option value="applicants">Most Applied</option>
                <option value="featured">Featured First</option>
              </select>
            </div>
          </div>

          {paginated.length === 0 ? (
            <div className="empty-state">
              <span style={{fontSize:"3rem"}}>🔍</span>
              <h3>No jobs found</h3>
              <p>Try different keywords or clear filters.</p>
              <button className="btn btn-primary" onClick={clearFilters}>Clear Filters</button>
            </div>
          ) : (
            <div className="jobs-grid">
              {paginated.map(job => (
                <JobCard key={job.id} job={job} user={user}
                  onApply={handleApply} onViewDetail={setSelectedJob}
                  bookmarks={bookmarks} onToggleBookmark={handleToggleBookmark} />
              ))}
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="pagination">
              <button className="page-btn" onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1}>‹ Prev</button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(p => (
                <button key={p} className={`page-btn ${p === page ? "page-active" : ""}`} onClick={() => setPage(p)}>{p}</button>
              ))}
              <button className="page-btn" onClick={() => setPage(p => Math.min(totalPages, p + 1))} disabled={page === totalPages}>Next ›</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
