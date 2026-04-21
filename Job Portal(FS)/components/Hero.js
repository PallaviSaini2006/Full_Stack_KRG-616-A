// ============================================================
// Hero.js — Landing Hero Section
// ============================================================

function Hero({ onNavigate, onAuthOpen, user }) {
  const [count, setCount] = React.useState({ jobs: 0, companies: 0, placed: 0 });
  const [searchQuery, setSearchQuery] = React.useState("");
  const [location, setLocation] = React.useState("");

  React.useEffect(() => {
    const targets = { jobs: 1200, companies: 350, placed: 8500 };
    const duration = 2000;
    const steps = 60;
    const interval = duration / steps;
    let step = 0;
    const timer = setInterval(() => {
      step++;
      const progress = step / steps;
      setCount({
        jobs: Math.floor(targets.jobs * progress),
        companies: Math.floor(targets.companies * progress),
        placed: Math.floor(targets.placed * progress),
      });
      if (step >= steps) clearInterval(timer);
    }, interval);
    return () => clearInterval(timer);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    onNavigate("jobs", { query: searchQuery, location });
  };

  const categories = [
    { icon: "💻", label: "Technology" },
    { icon: "📊", label: "Data Science" },
    { icon: "🎨", label: "Design" },
    { icon: "📢", label: "Marketing" },
    { icon: "💰", label: "Finance" },
    { icon: "👥", label: "Human Resources" },
  ];

  return (
    <section className="hero">
      <div className="hero-bg">
        <div className="hero-blob hero-blob-1"></div>
        <div className="hero-blob hero-blob-2"></div>
        <div className="hero-blob hero-blob-3"></div>
      </div>
      <div className="hero-content">
        <div className="hero-badge">
          <span className="badge-dot"></span>
          <span>🔥 1,200+ Active Job Listings</span>
        </div>
        <h1 className="hero-title">
          Find Your <span className="hero-highlight">Dream Career</span><br />
          With CareerHub
        </h1>
        <p className="hero-subtitle">
          India's fastest-growing job portal connecting talented professionals with top companies.
          Discover opportunities that match your ambition.
        </p>

        {/* Search Bar */}
        <form className="hero-search" onSubmit={handleSearch}>
          <div className="search-field">
            <i className="fa fa-search search-icon"></i>
            <input
              type="text"
              placeholder="Job title, skills, keywords..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="search-divider"></div>
          <div className="search-field">
            <i className="fa fa-map-marker-alt search-icon"></i>
            <select value={location} onChange={e => setLocation(e.target.value)}>
              <option value="">All Locations</option>
              {["Bangalore", "Mumbai", "Delhi", "Hyderabad", "Chennai", "Pune", "Remote"].map(l => (
                <option key={l} value={l}>{l}</option>
              ))}
            </select>
          </div>
          <button type="submit" className="btn btn-search">
            <i className="fa fa-search"></i> Search Jobs
          </button>
        </form>

        {/* Popular Searches */}
        <div className="hero-tags">
          <span className="tags-label">Trending:</span>
          {["React Developer", "Data Analyst", "UI/UX Design", "Remote Jobs", "Internship"].map(tag => (
            <button key={tag} className="tag-pill" onClick={() => onNavigate("jobs", { query: tag })}>
              {tag}
            </button>
          ))}
        </div>

        {/* Stats */}
        <div className="hero-stats">
          <div className="stat-item">
            <span className="stat-number">{count.jobs.toLocaleString()}+</span>
            <span className="stat-label">Open Jobs</span>
          </div>
          <div className="stat-divider"></div>
          <div className="stat-item">
            <span className="stat-number">{count.companies.toLocaleString()}+</span>
            <span className="stat-label">Companies</span>
          </div>
          <div className="stat-divider"></div>
          <div className="stat-item">
            <span className="stat-number">{count.placed.toLocaleString()}+</span>
            <span className="stat-label">Candidates Placed</span>
          </div>
        </div>
      </div>

      {/* Hero Visual */}
      <div className="hero-visual">
        <div className="hero-card floating">
          <div className="hcard-avatar">👨‍💻</div>
          <div className="hcard-info">
            <span className="hcard-title">Full Stack Developer</span>
            <span className="hcard-company">StartupNest • Remote</span>
            <span className="hcard-salary">₹10–16 LPA</span>
          </div>
          <button className="hcard-apply" onClick={() => onNavigate("jobs")}>Apply →</button>
        </div>
        <div className="hero-card floating-slow">
          <div className="hcard-avatar">🤖</div>
          <div className="hcard-info">
            <span className="hcard-title">ML Engineer</span>
            <span className="hcard-company">AI Forge Labs • Bangalore</span>
            <span className="hcard-salary">₹18–25 LPA</span>
          </div>
          <button className="hcard-apply" onClick={() => onNavigate("jobs")}>Apply →</button>
        </div>
        <div className="hero-floating-badge badge-green">✅ 240 hired this week</div>
        <div className="hero-floating-badge badge-blue" style={{top: "70%", left: "5%"}}>⚡ New jobs posted daily</div>
      </div>

      {/* Category Pills */}
      <div className="category-section">
        <p className="category-label">Browse by Category</p>
        <div className="category-pills">
          {categories.map(cat => (
            <button key={cat.label} className="category-pill" onClick={() => onNavigate("jobs", { category: cat.label })}>
              <span>{cat.icon}</span>
              <span>{cat.label}</span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
