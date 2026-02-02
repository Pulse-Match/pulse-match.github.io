import { useState, useRef, useEffect, useCallback } from "react";
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
  const exportRef = useRef<HTMLDivElement>(null);
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
      const maxPreviewWidth = Math.min(containerWidth - 40, 500);
      const scale = maxPreviewWidth / dims.width;
      setPreviewScale(Math.min(scale, 0.55));
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

  const handleDownload = useCallback(async () => {
    if (!exportRef.current) return;

    setIsExporting(true);

    // Store original transform and temporarily reset for export
    const element = exportRef.current;
    const originalTransform = element.style.transform;

    try {
      // Reset transform for full-size capture
      element.style.transform = "scale(1)";

      const dataUrl = await toPng(element, {
        cacheBust: true,
        width: dims.width,
        height: dims.height,
        pixelRatio: 1,
        style: {
          transform: "scale(1)",
          transformOrigin: "top left",
        },
      });

      const link = document.createElement("a");
      link.download = `glid-${config.platform}-${config.template}-${Date.now()}.png`;
      link.href = dataUrl;
      link.click();
    } catch (err) {
      console.error("Failed to export with html-to-image:", err);
      // Try alternative approach with canvas
      try {
        await exportWithCanvas();
      } catch (canvasErr) {
        console.error("Canvas export also failed:", canvasErr);
        alert("Failed to export image. Please try again.");
      }
    } finally {
      // Restore original transform
      element.style.transform = originalTransform;
      setIsExporting(false);
    }
  }, [config.platform, config.template, dims, previewScale]);

  const exportWithCanvas = async () => {
    const canvas = document.createElement("canvas");
    canvas.width = dims.width;
    canvas.height = dims.height;
    const ctx = canvas.getContext("2d");
    if (!ctx) throw new Error("Could not get canvas context");

    // Draw background
    if (config.backgroundColor === "sand") {
      ctx.fillStyle = "#fffbeb";
    } else if (config.backgroundColor === "field") {
      ctx.fillStyle = "#059669";
    } else if (config.backgroundColor === "dark") {
      ctx.fillStyle = "#1c1917";
    } else {
      // Gradient
      const gradient = ctx.createLinearGradient(0, 0, dims.width, dims.height);
      gradient.addColorStop(0, "#059669");
      gradient.addColorStop(0.5, "#047857");
      gradient.addColorStop(1, "#ea580c");
      ctx.fillStyle = gradient;
    }
    ctx.fillRect(0, 0, dims.width, dims.height);

    // Draw decorative circles
    ctx.globalAlpha = 0.08;
    ctx.fillStyle = config.backgroundColor === "sand" ? "#059669" : "#ffffff";
    ctx.beginPath();
    ctx.arc(dims.width + 100, -100, 300, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.arc(-100, dims.height + 50, 200, 0, Math.PI * 2);
    ctx.fill();
    ctx.globalAlpha = 1;

    // Set text color
    const textColor = config.backgroundColor === "sand" ? "#1c1917" : "#ffffff";
    const mutedTextColor =
      config.backgroundColor === "sand" ? "#57534e" : "rgba(255,255,255,0.8)";

    // Draw headline
    if (config.headline) {
      ctx.fillStyle = textColor;
      ctx.font = "800 86px Outfit, sans-serif";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";

      const lines = wrapText(ctx, config.headline, dims.width - 160);
      const lineHeight = 90;
      const totalHeight = lines.length * lineHeight;
      let startY = dims.height / 2 - totalHeight / 2 - 40;

      lines.forEach((line, i) => {
        ctx.fillText(line, dims.width / 2, startY + i * lineHeight);
      });
    }

    // Draw subheadline
    if (config.subheadline) {
      ctx.fillStyle = textColor;
      ctx.font = "600 42px Outfit, sans-serif";
      ctx.fillText(config.subheadline, dims.width / 2, dims.height / 2 + 30);
    }

    // Draw body text
    if (config.bodyText) {
      ctx.fillStyle = mutedTextColor;
      ctx.font = "400 32px Outfit, sans-serif";
      const bodyLines = wrapText(ctx, config.bodyText, dims.width - 200);
      bodyLines.forEach((line, i) => {
        ctx.fillText(line, dims.width / 2, dims.height / 2 + 100 + i * 40);
      });
    }

    // Draw badge
    if (config.showBadge) {
      const badgeText = "Launching 2026";
      ctx.font = "600 24px Outfit, sans-serif";
      const badgeWidth = ctx.measureText(badgeText).width + 60;
      const badgeX = dims.width - 60 - badgeWidth;
      const badgeY = 60;

      ctx.fillStyle =
        config.backgroundColor === "sand"
          ? "rgba(5, 150, 105, 0.1)"
          : "rgba(255, 255, 255, 0.15)";
      ctx.beginPath();
      ctx.roundRect(badgeX, badgeY, badgeWidth, 48, 24);
      ctx.fill();

      ctx.strokeStyle =
        config.backgroundColor === "sand"
          ? "rgba(5, 150, 105, 0.3)"
          : "rgba(255, 255, 255, 0.3)";
      ctx.lineWidth = 2;
      ctx.stroke();

      // Badge dot
      ctx.fillStyle = config.backgroundColor === "sand" ? "#059669" : "#ffffff";
      ctx.beginPath();
      ctx.arc(badgeX + 24, badgeY + 24, 6, 0, Math.PI * 2);
      ctx.fill();

      // Badge text
      ctx.fillStyle = config.backgroundColor === "sand" ? "#059669" : "#ffffff";
      ctx.textAlign = "left";
      ctx.fillText(badgeText, badgeX + 42, badgeY + 32);
    }

    // Draw CTA
    if (config.ctaText) {
      ctx.font = "600 26px Outfit, sans-serif";
      const ctaWidth = ctx.measureText(config.ctaText).width + 80;
      const ctaX = (dims.width - ctaWidth) / 2;
      const ctaY = dims.height - 120;

      ctx.fillStyle = config.backgroundColor === "sand" ? "#1c1917" : "#ffffff";
      ctx.beginPath();
      ctx.roundRect(ctaX, ctaY, ctaWidth, 56, 28);
      ctx.fill();

      ctx.fillStyle = config.backgroundColor === "sand" ? "#ffffff" : "#1c1917";
      ctx.textAlign = "center";
      ctx.fillText(config.ctaText, dims.width / 2, ctaY + 36);
    }

    // Export
    const dataUrl = canvas.toDataURL("image/png");
    const link = document.createElement("a");
    link.download = `glid-${config.platform}-${config.template}-${Date.now()}.png`;
    link.href = dataUrl;
    link.click();
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
                ref={exportRef}
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
                    <svg
                      width="60"
                      height="60"
                      viewBox="0 0 100 100"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M50 5C25.2 5 5 25.2 5 50s20.2 45 45 45c12.4 0 23.7-5 31.8-13.2L50 50V5z"
                        fill={
                          config.backgroundColor === "sand"
                            ? "#1c1917"
                            : "#ffffff"
                        }
                      />
                      <circle
                        cx="50"
                        cy="50"
                        r="15"
                        fill={
                          config.backgroundColor === "sand"
                            ? "#fffbeb"
                            : config.backgroundColor === "field"
                              ? "#059669"
                              : config.backgroundColor === "dark"
                                ? "#1c1917"
                                : "#059669"
                        }
                      />
                    </svg>
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

// Helper function to wrap text
function wrapText(
  ctx: CanvasRenderingContext2D,
  text: string,
  maxWidth: number,
): string[] {
  const words = text.split(" ");
  const lines: string[] = [];
  let currentLine = "";

  words.forEach((word) => {
    const testLine = currentLine ? `${currentLine} ${word}` : word;
    const metrics = ctx.measureText(testLine);
    if (metrics.width > maxWidth && currentLine) {
      lines.push(currentLine);
      currentLine = word;
    } else {
      currentLine = testLine;
    }
  });

  if (currentLine) {
    lines.push(currentLine);
  }

  return lines;
}
