// ============================================================
// JobCard.js — Individual Job Listing Card
// ============================================================

function JobCard({ job, user, onApply, onViewDetail, bookmarks, onToggleBookmark }) {
  const isBookmarked = bookmarks && bookmarks.includes(job.id);
  const hasApplied = user ? DB.hasApplied(job.id, user.id) : false;

  const typeColors = {
    "Full-time": "#10b981", "Part-time": "#f59e0b", "Remote": "#6366f1", "Internship": "#ec4899"
  };

  return (
    <div className={`job-card-new ${job.featured ? "job-featured" : ""}`}>
      {job.featured && <div className="featured-badge">⭐ Featured</div>}

      <div className="jc-header">
        <div className="jc-logo">{job.logo}</div>
        <div className="jc-title-wrap">
          <h3 className="jc-title" onClick={() => onViewDetail(job)}>{job.title}</h3>
          <span className="jc-company">{job.company}</span>
        </div>
        {user && (
          <button
            className={`bookmark-btn ${isBookmarked ? "bookmarked" : ""}`}
            onClick={() => onToggleBookmark(job.id)}
            title={isBookmarked ? "Remove bookmark" : "Save job"}
          >
            {isBookmarked ? "🔖" : "🔍"}
          </button>
        )}
      </div>

      <div className="jc-meta">
        <span className="jc-tag"><i className="fa fa-map-marker-alt"></i> {job.location}</span>
        <span className="jc-tag" style={{ color: typeColors[job.type] || "#6b7280", borderColor: typeColors[job.type] || "#6b7280" }}>
          {job.type}
        </span>
        <span className="jc-tag"><i className="fa fa-briefcase"></i> {job.experience}</span>
      </div>

      <p className="jc-desc">{job.description.slice(0, 110)}...</p>

      <div className="jc-skills">
        {job.requirements.slice(0, 3).map(r => (
          <span key={r} className="skill-pill">{r}</span>
        ))}
        {job.requirements.length > 3 && <span className="skill-pill skill-pill-more">+{job.requirements.length - 3}</span>}
      </div>

      <div className="jc-footer">
        <div className="jc-salary">
          <i className="fa fa-rupee-sign"></i>
          <span>{job.salary}</span>
        </div>
        <div className="jc-actions">
          <button className="btn btn-outline btn-sm" onClick={() => onViewDetail(job)}>Details</button>
          {hasApplied ? (
            <button className="btn btn-success btn-sm" disabled>✓ Applied</button>
          ) : (
            <button className="btn btn-primary btn-sm" onClick={() => onApply(job)}>Apply Now</button>
          )}
        </div>
      </div>

      <div className="jc-bottom-bar">
        <span className="jc-posted">📅 {job.postedAt}</span>
        <span className="jc-applicants">👤 {job.applicants} applicants</span>
      </div>
    </div>
  );
}
