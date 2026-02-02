import { Link } from "react-router-dom";
import { useTheme } from "../hooks/useTheme";

interface LayoutProps {
  children: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {
  const { toggleTheme } = useTheme();

  const scrollToSection = (
    e: React.MouseEvent<HTMLAnchorElement>,
    id: string,
  ) => {
    e.preventDefault();
    const element = document.querySelector(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

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
          <div className="nav-links">
            <a
              href="#discover"
              className="nav-link"
              onClick={(e) => scrollToSection(e, "#discover")}
            >
              Discover
            </a>
            <a
              href="#play"
              className="nav-link"
              onClick={(e) => scrollToSection(e, "#play")}
            >
              Browse
            </a>
            <a
              href="#match"
              className="nav-link"
              onClick={(e) => scrollToSection(e, "#match")}
            >
              Match
            </a>
          </div>
          <div className="nav-actions">
            <button
              className="theme-toggle"
              onClick={toggleTheme}
              aria-label="Toggle theme"
            >
              <span className="theme-icon-dark">&#9790;</span>
              <span className="theme-icon-light">&#9728;</span>
            </button>
            <a
              href="#waitlist"
              className="btn-primary"
              onClick={(e) => scrollToSection(e, "#waitlist")}
            >
              Join Beta
            </a>
          </div>
        </div>
      </nav>

      {children}

      {/* Footer */}
      <footer className="site-footer">
        <div className="footer-inner">
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
          <div className="footer-links">
            <a
              href="#discover"
              className="footer-link"
              onClick={(e) => scrollToSection(e, "#discover")}
            >
              Discover
            </a>
            <a
              href="#play"
              className="footer-link"
              onClick={(e) => scrollToSection(e, "#play")}
            >
              Browse
            </a>
            <a
              href="#match"
              className="footer-link"
              onClick={(e) => scrollToSection(e, "#match")}
            >
              Match
            </a>
            <Link to="/privacy" className="footer-link">
              Privacy
            </Link>
          </div>
          <div className="footer-copy">
            &copy; 2026 Glid. All rights reserved.
          </div>
        </div>
      </footer>
    </>
  );
}
