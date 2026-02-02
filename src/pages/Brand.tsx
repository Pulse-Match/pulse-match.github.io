import { Link } from "react-router-dom";
import { useTheme } from "../hooks/useTheme";
import { useScrollReveal } from "../hooks/useScrollReveal";
import "./Brand.css";

export function Brand() {
  useTheme(); // Initialize theme
  const containerRef = useScrollReveal();

  return (
    <>
      {/* Grain overlay */}
      <div className="grain" aria-hidden="true" />

      {/* Navigation */}
      <nav>
        <div className="nav-inner">
          <Link to="/" className="logo">
            <img
              src="/glid-logo-white.png"
              alt="Glid"
              className="logo-svg logo-dark"
            />
            <img
              src="/glid-logo-black.png"
              alt="Glid"
              className="logo-svg logo-light"
            />
          </Link>
          <div className="nav-actions">
            <Link to="/social" className="btn-ghost">
              Social Posts
            </Link>
            <Link to="/" className="btn-ghost">
              &larr; Back to Home
            </Link>
          </div>
        </div>
      </nav>

      <main className="brand-page" ref={containerRef}>
        {/* Hero */}
        <section className="brand-hero">
          <div className="brand-hero-content">
            <p className="overline reveal">Brand Identity</p>
            <h1 className="display-hero reveal delay-1">
              Kinetic
              <br />
              <span className="text-gradient">Humanism</span>
            </h1>
            <p className="hero-subtitle reveal delay-2">
              Technology shouldn't look like a terminal. Glid is the bridge
              between the digital phone and the physical field. Sunny, organic,
              and energetic.
            </p>
          </div>
        </section>

        {/* Logo Section */}
        <section className="brand-section">
          <div className="section-header">
            <h2 className="display-large reveal">Logo</h2>
            <p className="subhead reveal delay-1">
              The Mark: A lowercase, geometric "g". Aerodynamic, resembling a
              running track loop. It stands freely, symbolizing openness and
              freedom of movement.
            </p>
          </div>

          <div className="logo-grid reveal delay-2">
            <div className="logo-card logo-card-dark">
              <img
                src="/glid-logo-white.png"
                alt="Glid"
                className="brand-logo-img"
              />
              <span className="logo-card-label">Dark Background</span>
            </div>
            <div className="logo-card logo-card-light">
              <img
                src="/glid-logo-black.png"
                alt="Glid"
                className="brand-logo-img"
              />
              <span className="logo-card-label logo-card-label-dark">
                Light Background
              </span>
            </div>
          </div>

          <div className="logo-rules reveal delay-3">
            <div className="rule-card">
              <div className="rule-icon">&#10003;</div>
              <h4>Floating</h4>
              <p>
                The logo should stand freely rather than being trapped inside a
                container.
              </p>
            </div>
            <div className="rule-card">
              <div className="rule-icon">&#10003;</div>
              <h4>Flat & Bold</h4>
              <p>
                No complex gradients or 3D effects. Distinct and aerodynamic.
              </p>
            </div>
            <div className="rule-card">
              <div className="rule-icon rule-icon-warn">&#10007;</div>
              <h4>Don't</h4>
              <p>Stretch, rotate, or trap the logo in a box.</p>
            </div>
          </div>
        </section>

        {/* Colors Section */}
        <div className="section-divider"></div>
        <section className="brand-section">
          <div className="section-header">
            <h2 className="display-large reveal">Colors</h2>
            <p className="subhead reveal delay-1">
              "Sand & Field". A Light Mode first identity. Organic, premium, and
              energetic. We move away from the "Dark Mode/Cyberpunk" tech
              cliche.
            </p>
          </div>

          <div className="color-section reveal delay-2">
            <h3 className="color-section-title">The Field (Primary)</h3>
            <div className="color-grid">
              <div className="color-card">
                <div
                  className="color-swatch"
                  style={{ background: "#059669" }}
                ></div>
                <div className="color-info">
                  <span className="color-name">Emerald Green</span>
                  <span className="color-hex">#059669</span>
                  <span className="color-desc">
                    Primary logo, CTAs, active icons.
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="color-section reveal delay-3">
            <h3 className="color-section-title">The Clay (Accent)</h3>
            <div className="color-grid">
              <div className="color-card">
                <div
                  className="color-swatch"
                  style={{ background: "#EA580C" }}
                ></div>
                <div className="color-info">
                  <span className="color-name">Burnt Orange</span>
                  <span className="color-hex">#EA580C</span>
                  <span className="color-desc">
                    Notifications, tags, high-energy.
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="color-section reveal delay-4">
            <h3 className="color-section-title">The Sand (Base)</h3>
            <div className="color-grid">
              <div className="color-card">
                <div
                  className="color-swatch"
                  style={{
                    background: "#FFFBEB",
                    border: "1px solid rgba(0,0,0,0.1)",
                  }}
                ></div>
                <div className="color-info">
                  <span className="color-name">Cream / Amber-50</span>
                  <span className="color-hex">#FFFBEB</span>
                  <span className="color-desc">
                    Main app background. Warm & organic.
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="color-section reveal delay-5">
            <h3 className="color-section-title">The Earth (Ink)</h3>
            <div className="color-grid">
              <div className="color-card">
                <div
                  className="color-swatch"
                  style={{ background: "#1C1917" }}
                ></div>
                <div className="color-info">
                  <span className="color-name">Dark Stone</span>
                  <span className="color-hex">#1C1917</span>
                  <span className="color-desc">
                    Primary text. Natural alternative to black.
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Typography Section */}
        <div className="section-divider"></div>
        <section className="brand-section">
          <div className="section-header">
            <h2 className="display-large reveal">Typography</h2>
            <p className="subhead reveal delay-1">
              Outfit. Geometric, friendly, and sporty.
            </p>
          </div>

          <div className="type-showcase reveal delay-2">
            <div className="type-card" style={{ gridColumn: "span 2" }}>
              <span className="type-label">Primary Typeface</span>
              <h3
                className="type-sample-display"
                style={{ fontFamily: "'Outfit', sans-serif" }}
              >
                Outfit
              </h3>
              <p className="type-description">
                Geometric sans-serif with a high x-height. Slightly rounded
                corners for a friendly, technical look. Trustworthy and active.
              </p>
              <div className="type-specimen">
                <span
                  style={{
                    fontFamily: "'Outfit', sans-serif",
                    fontWeight: 800,
                    fontSize: "3rem",
                  }}
                >
                  Aa
                </span>
                <span
                  style={{
                    fontFamily: "'Outfit', sans-serif",
                    fontWeight: 400,
                    fontSize: "3rem",
                  }}
                >
                  Aa
                </span>
              </div>
              <a
                href="https://fonts.google.com/specimen/Outfit"
                target="_blank"
                rel="noopener noreferrer"
                className="type-link"
              >
                Get from Google Fonts &rarr;
              </a>
            </div>
          </div>

          <div className="type-scale reveal delay-3">
            <h3 className="color-section-title">Hierarchy</h3>
            <div className="scale-list">
              <div className="scale-item">
                <span className="scale-name">Headlines</span>
                <span
                  className="scale-sample"
                  style={{
                    fontFamily: "'Outfit', sans-serif",
                    fontWeight: 800,
                    fontSize: "2.5rem",
                    letterSpacing: "-0.02em",
                  }}
                >
                  Stop Planning. Just Play.
                </span>
                <span className="scale-meta">
                  ExtraBold (800) / Tight Tracking
                </span>
              </div>
              <div className="scale-item">
                <span className="scale-name">Subhead</span>
                <span
                  className="scale-sample"
                  style={{
                    fontFamily: "'Outfit', sans-serif",
                    fontWeight: 500,
                    fontSize: "1.25rem",
                  }}
                >
                  The everyday athlete's best friend.
                </span>
                <span className="scale-meta">Medium (500)</span>
              </div>
              <div className="scale-item">
                <span className="scale-name">Body</span>
                <span
                  className="scale-sample"
                  style={{
                    fontFamily: "'Outfit', sans-serif",
                    fontWeight: 400,
                    fontSize: "1rem",
                  }}
                >
                  We don't just find you a slot; we get you back to the sport
                  you love.
                </span>
                <span className="scale-meta">
                  Regular (400) / Relaxed Spacing
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* Visual Style Section */}
        <div className="section-divider"></div>
        <section className="brand-section">
          <div className="section-header">
            <h2 className="display-large reveal">Visual Language</h2>
            <p className="subhead reveal delay-1">
              "The Stadium Shape" and Layering.
            </p>
          </div>

          <div className="voice-grid reveal delay-2">
            <div className="voice-card">
              <h4>Shape Language</h4>
              <p className="voice-example">Pill Shapes</p>
              <p className="voice-note">
                Deep rounded corners (16px-24px). No sharp 90-degree angles.
              </p>
            </div>
            <div className="voice-card">
              <h4>Layering</h4>
              <p className="voice-example">Physical Depth</p>
              <p className="voice-note">
                Pure White cards on Cream background. Subtle depth without heavy
                shadows.
              </p>
            </div>
            <div className="voice-card">
              <h4>Photography</h4>
              <p className="voice-example">Authentic Motion</p>
              <p className="voice-note">
                Candid, motion-blurred. Focus on the action, not staged smiles.
              </p>
            </div>
          </div>
        </section>

        {/* Voice Section */}
        <div className="section-divider"></div>
        <section className="brand-section">
          <div className="section-header">
            <h2 className="display-large reveal">Voice & Tone</h2>
            <p className="subhead reveal delay-1">
              The "Supportive Coach". Direct, encouraging, and active.
            </p>
          </div>

          <div className="voice-grid reveal delay-2">
            <div className="voice-card">
              <h4>Tagline</h4>
              <p className="voice-example">"Stop Planning. Just Play."</p>
            </div>
            <div className="voice-card">
              <h4>Do</h4>
              <p className="voice-example">Use Verbs</p>
              <p className="voice-note">Find, Play, Connect, Go. Be direct.</p>
            </div>
            <div className="voice-card">
              <h4>Don't</h4>
              <p className="voice-example">Use Jargon</p>
              <p className="voice-note">
                Avoid "Algorithm", "Optimization", "Ecosystem".
              </p>
            </div>
          </div>
        </section>

        {/* Download Section */}
        <div className="section-divider"></div>
        <section className="brand-section brand-section-cta">
          <div className="section-header">
            <h2 className="display-large reveal">Assets</h2>
            <p className="subhead reveal delay-1">
              Need brand assets for press, partnerships, or integrations?
            </p>
          </div>

          <div className="assets-note reveal delay-2">
            <p>
              Contact <a href="mailto:brand@glid.app">brand@glid.app</a> for
              logo files, brand guidelines PDF, and custom asset requests.
            </p>
          </div>
        </section>

        {/* Back to Home */}
        <div className="back-home">
          <Link to="/" className="btn-ghost">
            &larr; Back to Home
          </Link>
        </div>
      </main>
    </>
  );
}
