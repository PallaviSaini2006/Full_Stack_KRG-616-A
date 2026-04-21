// JobCard.js - Individual Job Card Component
// Displays a single job listing with apply and view detail options

function JobCard({ job, user, onApply, onViewDetail }) {
  return (
    <div className="job-card">

      {/* Card Header: Logo + Title + Company */}
      <div className="job-card-header">
        <div className="company-logo">{job.logo}</div>
        <div>
          <div className="job-title" onClick={() => onViewDetail(job)}>
            {job.title}
          </div>
          <div className="company-name">{job.company}</div>
        </div>
      </div>

      {/* Job Meta Tags */}
      <div className="job-meta">
        <span className="meta-tag"><i className="fa fa-map-marker-alt"></i> {job.location}</span>
        <span className="meta-tag type-badge">{job.type}</span>
        <span className="meta-tag">{job.category}</span>
        <span className="meta-tag"><i className="fa fa-briefcase"></i> {job.experience}</span>
      </div>

      {/* Short Description */}
      <p className="job-desc">{job.description.slice(0, 120)}...</p>

      {/* Required Skills */}
      <div className="skills-wrap">
        {job.requirements.slice(0, 3).map(skill => (
          <span key={skill} className="skill-tag">{skill}</span>
        ))}
        {job.requirements.length > 3 && (
          <span className="skill-tag">+{job.requirements.length - 3} more</span>
        )}
      </div>

      {/* Footer: Salary + Buttons */}
      <div className="job-card-footer">
        <div>
          <div className="salary-text">{job.salary}</div>
          <div className="posted-date">Posted: {job.postedAt}</div>
        </div>
        <div style={{display: "flex", gap: "8px"}}>
          <button className="btn btn-secondary btn-sm" onClick={() => onViewDetail(job)}>
            View
          </button>
          <button className="btn btn-success btn-sm" onClick={() => onApply(job)}>
            Apply
          </button>
        </div>
      </div>

    </div>
  );
}
