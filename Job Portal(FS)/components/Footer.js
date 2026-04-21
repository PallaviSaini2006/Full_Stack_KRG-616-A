// ============================================================
// Footer.js — Site Footer with Links & Newsletter
// ============================================================

function Footer({ onNavigate }) {
  const [email, setEmail] = React.useState("");
  const [subscribed, setSubscribed] = React.useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) { setSubscribed(true); setEmail(""); }
  };

  return (
    <footer className="footer-new">
      <div className="footer-top">
        <div className="footer-col footer-brand">
          <div className="footer-logo">💼 Career<span>Hub</span></div>
          <p className="footer-tagline">India's fastest-growing job portal connecting talent with top companies.</p>
          <div className="footer-socials">
            <a href="#" className="social-link" title="LinkedIn"><i className="fab fa-linkedin-in"></i></a>
            <a href="#" className="social-link" title="Twitter"><i className="fab fa-twitter"></i></a>
            <a href="#" className="social-link" title="Instagram"><i className="fab fa-instagram"></i></a>
            <a href="#" className="social-link" title="Facebook"><i className="fab fa-facebook-f"></i></a>
          </div>
        </div>

        <div className="footer-col">
          <h4 className="footer-heading">For Job Seekers</h4>
          <ul className="footer-links">
            <li><a href="#" onClick={e => { e.preventDefault(); onNavigate("jobs"); }}>Browse All Jobs</a></li>
            <li><a href="#" onClick={e => { e.preventDefault(); onNavigate("internships"); }}>Internships</a></li>
            <li><a href="#" onClick={e => { e.preventDefault(); onNavigate("companies"); }}>Top Companies</a></li>
            <li><a href="#">Career Advice</a></li>
            <li><a href="#">Resume Tips</a></li>
          </ul>
        </div>

        <div className="footer-col">
          <h4 className="footer-heading">For Employers</h4>
          <ul className="footer-links">
            <li><a href="#" onClick={e => { e.preventDefault(); onNavigate("postjob"); }}>Post a Job</a></li>
            <li><a href="#">Browse Candidates</a></li>
            <li><a href="#">Pricing Plans</a></li>
            <li><a href="#">Employer Dashboard</a></li>
            <li><a href="#">Success Stories</a></li>
          </ul>
        </div>

        <div className="footer-col">
          <h4 className="footer-heading">Stay Updated</h4>
          <p style={{color:"#9ca3af",fontSize:"14px",marginBottom:"16px"}}>Get the latest jobs delivered to your inbox.</p>
          <form className="footer-newsletter" onSubmit={handleSubscribe}>
            {subscribed ? (
              <div className="subscribe-success">✅ Subscribed! Thank you.</div>
            ) : (
              <>
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  required
                />
                <button type="submit" className="btn btn-primary">Subscribe</button>
              </>
            )}
          </form>
          <div className="footer-badges">
            <span className="footer-badge">🔒 Secure</span>
            <span className="footer-badge">✅ Verified Jobs</span>
            <span className="footer-badge">⚡ Fast Apply</span>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p>© 2026 CareerHub — All rights reserved. Built with ❤️ for the next generation of professionals.</p>
        <div className="footer-bottom-links">
          <a href="#">Privacy Policy</a>
          <a href="#">Terms of Service</a>
          <a href="#">Contact Us</a>
        </div>
      </div>
    </footer>
  );
}
