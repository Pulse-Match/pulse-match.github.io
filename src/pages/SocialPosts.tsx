import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { toPng } from "html-to-image";
import { useTheme } from "../hooks/useTheme";
import "./SocialPosts.css";

type Platform = "instagram-square" | "instagram-story" | "twitter" | "linkedin";
type Template = "announcement" | "feature" | "quote" | "stats" | "cta";

interface PostConfig {
  platform: Platform;
  template: Template;
  headline: string;
  subheadline: string;
  bodyText: string;
  ctaText: string;
  backgroundColor: "sand" | "field" | "dark" | "gradient";
  showLogo: boolean;
  showBadge: boolean;
}

const platformDimensions: Record<
  Platform,
  { width: number; height: number; label: string }
> = {
  "instagram-square": { width: 1080, height: 1080, label: "Instagram Square" },
  "instagram-story": { width: 1080, height: 1920, label: "Instagram Story" },
  twitter: { width: 1200, height: 675, label: "Twitter/X" },
  linkedin: { width: 1200, height: 627, label: "LinkedIn" },
};

const templateDefaults: Record<Template, Partial<PostConfig>> = {
  announcement: {
    headline: "Big News!",
    subheadline: "Glid is launching in 2026",
    bodyText: 'The app that turns "anyone free?" into game time.',
    ctaText: "Join the waitlist at glid-app.com",
  },
  feature: {
    headline: "Find Games Near You",
    subheadline: "Real-time sports sessions on your map",
    bodyText: "Tennis at the park. Basketball downtown. Pickleball at noon.",
    ctaText: "Coming soon",
  },
  quote: {
    headline: '"Stop Planning, Just Play"',
    subheadline: "",
    bodyText:
      "Finding people to play with shouldn't be harder than the game itself.",
    ctaText: "glid-app.com",
  },
  stats: {
    headline: "2 Ratings",
    subheadline: "Zero Guesswork",
    bodyText:
      "Match Score for skill. Vibes Score for reliability. Every game counts.",
    ctaText: "Learn more at glid-app.com",
  },
  cta: {
    headline: "Ready to Play?",
    subheadline: "Join the waitlist",
    bodyText: "Be first on the field when Glid launches in your city.",
    ctaText: "glid-app.com",
  },
};

export function SocialPosts() {
  useTheme();
  const postRef = useRef<HTMLDivElement>(null);
  const previewContainerRef = useRef<HTMLDivElement>(null);
  const [isExporting, setIsExporting] = useState(false);
  const [previewScale, setPreviewScale] = useState(0.5);

  const [config, setConfig] = useState<PostConfig>({
    platform: "instagram-square",
    template: "announcement",
    headline: templateDefaults.announcement.headline!,
    subheadline: templateDefaults.announcement.subheadline!,
    bodyText: templateDefaults.announcement.bodyText!,
    ctaText: templateDefaults.announcement.ctaText!,
    backgroundColor: "sand",
    showLogo: true,
    showBadge: true,
  });

  const dims = platformDimensions[config.platform];

  // Calculate scale to fit preview container
  useEffect(() => {
    const calculateScale = () => {
      if (!previewContainerRef.current) return;
      const containerWidth = previewContainerRef.current.offsetWidth;
      const maxPreviewWidth = Math.min(containerWidth - 40, 500); // padding and max width
      const scale = maxPreviewWidth / dims.width;
      setPreviewScale(Math.min(scale, 0.6)); // Cap at 60%
    };

    calculateScale();
    window.addEventListener("resize", calculateScale);
    return () => window.removeEventListener("resize", calculateScale);
  }, [dims.width, config.platform]);

  const updateConfig = (updates: Partial<PostConfig>) => {
    setConfig((prev) => ({ ...prev, ...updates }));
  };

  const applyTemplate = (template: Template) => {
    const defaults = templateDefaults[template];
    updateConfig({
      template,
      headline: defaults.headline!,
      subheadline: defaults.subheadline!,
      bodyText: defaults.bodyText!,
      ctaText: defaults.ctaText!,
    });
  };

  const handleDownload = async () => {
    if (!postRef.current) return;

    setIsExporting(true);
    try {
      const dataUrl = await toPng(postRef.current, {
        width: dims.width,
        height: dims.height,
        pixelRatio: 1,
        style: {
          transform: "scale(1)",
          transformOrigin: "top left",
          width: `${dims.width}px`,
          height: `${dims.height}px`,
        },
      });

      const link = document.createElement("a");
      link.download = `glid-${config.platform}-${config.template}-${Date.now()}.png`;
      link.href = dataUrl;
      link.click();
    } catch (err) {
      console.error("Failed to export:", err);
      alert("Failed to export image. Please try again.");
    } finally {
      setIsExporting(false);
    }
  };

  const isStory = config.platform === "instagram-story";

  return (
    <>
      <div className="grain" aria-hidden="true" />

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
            <Link to="/brand" className="btn-ghost">
              Brand Guidelines
            </Link>
            <Link to="/" className="btn-ghost">
              &larr; Home
            </Link>
          </div>
        </div>
      </nav>

      <main className="social-posts-page">
        <header className="social-header">
          <h1 className="display-large">Social Media Posts</h1>
          <p className="subhead">
            Create and download branded posts for social media
          </p>
        </header>

        <div className="social-workspace">
          {/* Controls Panel */}
          <aside className="controls-panel">
            <section className="control-section">
              <h3>Platform</h3>
              <div className="button-group">
                {(Object.keys(platformDimensions) as Platform[]).map(
                  (platform) => (
                    <button
                      key={platform}
                      className={`control-btn ${config.platform === platform ? "active" : ""}`}
                      onClick={() => updateConfig({ platform })}
                    >
                      {platformDimensions[platform].label}
                    </button>
                  ),
                )}
              </div>
              <p className="dimension-info">
                {dims.width} x {dims.height}px
              </p>
            </section>

            <section className="control-section">
              <h3>Template</h3>
              <div className="button-group">
                {(Object.keys(templateDefaults) as Template[]).map(
                  (template) => (
                    <button
                      key={template}
                      className={`control-btn ${config.template === template ? "active" : ""}`}
                      onClick={() => applyTemplate(template)}
                    >
                      {template.charAt(0).toUpperCase() + template.slice(1)}
                    </button>
                  ),
                )}
              </div>
            </section>

            <section className="control-section">
              <h3>Background</h3>
              <div className="color-buttons">
                <button
                  className={`color-btn color-sand ${config.backgroundColor === "sand" ? "active" : ""}`}
                  onClick={() => updateConfig({ backgroundColor: "sand" })}
                  title="Sand"
                />
                <button
                  className={`color-btn color-field ${config.backgroundColor === "field" ? "active" : ""}`}
                  onClick={() => updateConfig({ backgroundColor: "field" })}
                  title="Field"
                />
                <button
                  className={`color-btn color-dark ${config.backgroundColor === "dark" ? "active" : ""}`}
                  onClick={() => updateConfig({ backgroundColor: "dark" })}
                  title="Dark"
                />
                <button
                  className={`color-btn color-gradient ${config.backgroundColor === "gradient" ? "active" : ""}`}
                  onClick={() => updateConfig({ backgroundColor: "gradient" })}
                  title="Gradient"
                />
              </div>
            </section>

            <section className="control-section">
              <h3>Content</h3>
              <div className="input-group">
                <label>Headline</label>
                <input
                  type="text"
                  value={config.headline}
                  onChange={(e) => updateConfig({ headline: e.target.value })}
                  placeholder="Main headline"
                />
              </div>
              <div className="input-group">
                <label>Subheadline</label>
                <input
                  type="text"
                  value={config.subheadline}
                  onChange={(e) =>
                    updateConfig({ subheadline: e.target.value })
                  }
                  placeholder="Secondary text"
                />
              </div>
              <div className="input-group">
                <label>Body Text</label>
                <textarea
                  value={config.bodyText}
                  onChange={(e) => updateConfig({ bodyText: e.target.value })}
                  placeholder="Body content"
                  rows={3}
                />
              </div>
              <div className="input-group">
                <label>CTA Text</label>
                <input
                  type="text"
                  value={config.ctaText}
                  onChange={(e) => updateConfig({ ctaText: e.target.value })}
                  placeholder="Call to action"
                />
              </div>
            </section>

            <section className="control-section">
              <h3>Options</h3>
              <label className="checkbox-label">
                <input
                  type="checkbox"
                  checked={config.showLogo}
                  onChange={(e) => updateConfig({ showLogo: e.target.checked })}
                />
                Show Logo
              </label>
              <label className="checkbox-label">
                <input
                  type="checkbox"
                  checked={config.showBadge}
                  onChange={(e) =>
                    updateConfig({ showBadge: e.target.checked })
                  }
                />
                Show "Launching 2026" Badge
              </label>
            </section>

            <button
              className="btn-primary download-btn"
              onClick={handleDownload}
              disabled={isExporting}
            >
              {isExporting ? "Exporting..." : "Download PNG"}
            </button>
          </aside>

          {/* Preview Panel */}
          <div className="preview-panel" ref={previewContainerRef}>
            <div
              className={`preview-wrapper ${isStory ? "story-preview" : ""}`}
              style={{
                width: dims.width * previewScale,
                height: dims.height * previewScale,
              }}
            >
              <div
                ref={postRef}
                className={`post-canvas bg-${config.backgroundColor}`}
                style={{
                  width: dims.width,
                  height: dims.height,
                  transform: `scale(${previewScale})`,
                  transformOrigin: "top left",
                }}
              >
                {/* Logo */}
                {config.showLogo && (
                  <div className="post-logo">
                    <img
                      src={
                        config.backgroundColor === "sand"
                          ? "/glid-logo-black.png"
                          : "/glid-logo-white.png"
                      }
                      alt="Glid"
                    />
                  </div>
                )}

                {/* Badge */}
                {config.showBadge && (
                  <div
                    className={`post-badge ${config.backgroundColor === "sand" ? "badge-dark" : "badge-light"}`}
                  >
                    <span className="badge-dot"></span>
                    Launching 2026
                  </div>
                )}

                {/* Content */}
                <div
                  className={`post-content ${isStory ? "story-content" : ""}`}
                >
                  {config.headline && (
                    <h1
                      className={`post-headline ${config.backgroundColor === "sand" ? "text-dark" : "text-light"}`}
                    >
                      {config.headline}
                    </h1>
                  )}
                  {config.subheadline && (
                    <h2
                      className={`post-subheadline ${config.backgroundColor === "sand" ? "text-dark" : "text-light"}`}
                    >
                      {config.subheadline}
                    </h2>
                  )}
                  {config.bodyText && (
                    <p
                      className={`post-body ${config.backgroundColor === "sand" ? "text-dark-muted" : "text-light-muted"}`}
                    >
                      {config.bodyText}
                    </p>
                  )}
                </div>

                {/* CTA */}
                {config.ctaText && (
                  <div
                    className={`post-cta ${config.backgroundColor === "sand" ? "cta-dark" : "cta-light"}`}
                  >
                    {config.ctaText}
                  </div>
                )}

                {/* Decorative elements */}
                <div className="post-decoration">
                  <div className="deco-circle deco-1"></div>
                  <div className="deco-circle deco-2"></div>
                </div>
              </div>
            </div>
            <p className="preview-note">
              Preview scaled to fit. Download will be full resolution (
              {dims.width} x {dims.height}px).
            </p>
          </div>
        </div>
      </main>
    </>
  );
}
