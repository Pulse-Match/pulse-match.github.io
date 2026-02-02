import { useState, useRef, useCallback } from "react";
import { Link } from "react-router-dom";
import { toPng } from "html-to-image";
import { useTheme } from "../hooks/useTheme";
import "./MockupGenerator.css";

type DeviceType = "iphone-15-pro" | "iphone-15" | "pixel-8" | "samsung-s24";
type BackgroundType = "solid" | "gradient" | "blur" | "transparent";
type Platform = "instagram-square" | "instagram-story" | "twitter" | "linkedin" | "custom";

interface MockupConfig {
  device: DeviceType;
  background: BackgroundType;
  backgroundColor: string;
  gradientStart: string;
  gradientEnd: string;
  gradientAngle: number;
  platform: Platform;
  shadowIntensity: number;
  rotation: number;
  scale: number;
  showReflection: boolean;
}

const deviceInfo: Record<DeviceType, { name: string; width: number; height: number; radius: number; bezel: number }> = {
  "iphone-15-pro": { name: "iPhone 15 Pro", width: 393, height: 852, radius: 55, bezel: 12 },
  "iphone-15": { name: "iPhone 15", width: 393, height: 852, radius: 50, bezel: 14 },
  "pixel-8": { name: "Google Pixel 8", width: 412, height: 915, radius: 40, bezel: 10 },
  "samsung-s24": { name: "Samsung S24", width: 412, height: 915, radius: 35, bezel: 8 },
};

const platformDimensions: Record<Platform, { width: number; height: number; label: string }> = {
  "instagram-square": { width: 1080, height: 1080, label: "Instagram Square" },
  "instagram-story": { width: 1080, height: 1920, label: "Instagram Story" },
  twitter: { width: 1200, height: 675, label: "Twitter/X" },
  linkedin: { width: 1200, height: 627, label: "LinkedIn" },
  custom: { width: 1920, height: 1080, label: "Custom (1920x1080)" },
};

const presetBackgrounds = [
  { color: "#fffbeb", name: "Sand" },
  { color: "#059669", name: "Emerald" },
  { color: "#1c1917", name: "Stone" },
  { color: "#0ea5e9", name: "Sky" },
  { color: "#8b5cf6", name: "Violet" },
  { color: "#f43f5e", name: "Rose" },
];

const presetGradients = [
  { start: "#059669", end: "#0ea5e9", name: "Ocean" },
  { start: "#8b5cf6", end: "#ec4899", name: "Sunset" },
  { start: "#1c1917", end: "#44403c", name: "Dark" },
  { start: "#fffbeb", end: "#fef3c7", name: "Warm" },
  { start: "#059669", end: "#ea580c", name: "Glid" },
];

export function MockupGenerator() {
  useTheme();
  const exportRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [screenshot, setScreenshot] = useState<string | null>(null);
  const [isExporting, setIsExporting] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  const [config, setConfig] = useState<MockupConfig>({
    device: "iphone-15-pro",
    background: "gradient",
    backgroundColor: "#059669",
    gradientStart: "#059669",
    gradientEnd: "#0ea5e9",
    gradientAngle: 135,
    platform: "instagram-square",
    shadowIntensity: 50,
    rotation: 0,
    scale: 80,
    showReflection: true,
  });

  const dims = platformDimensions[config.platform];
  const device = deviceInfo[config.device];

  // Calculate preview scale
  const previewScale = Math.min(500 / dims.width, 500 / dims.height, 0.5);

  const updateConfig = (updates: Partial<MockupConfig>) => {
    setConfig((prev) => ({ ...prev, ...updates }));
  };

  const handleFileSelect = (file: File) => {
    if (!file.type.startsWith("image/")) {
      alert("Please upload an image file");
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      setScreenshot(e.target?.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) handleFileSelect(file);
  }, []);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleFileSelect(file);
  };

  const handleDownload = useCallback(async () => {
    if (!exportRef.current) return;

    setIsExporting(true);

    try {
      const dataUrl = await toPng(exportRef.current, {
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
      link.download = `mockup-${config.device}-${config.platform}-${Date.now()}.png`;
      link.href = dataUrl;
      link.click();
    } catch (err) {
      console.error("Failed to export:", err);
      alert("Failed to export image. Please try again.");
    } finally {
      setIsExporting(false);
    }
  }, [config.device, config.platform, dims]);

  const getBackgroundStyle = (): React.CSSProperties => {
    switch (config.background) {
      case "solid":
        return { backgroundColor: config.backgroundColor };
      case "gradient":
        return {
          background: `linear-gradient(${config.gradientAngle}deg, ${config.gradientStart}, ${config.gradientEnd})`,
        };
      case "blur":
        return {
          backgroundColor: config.backgroundColor,
          backdropFilter: "blur(100px)",
        };
      case "transparent":
        return {
          backgroundColor: "transparent",
          backgroundImage: `
            linear-gradient(45deg, #ccc 25%, transparent 25%),
            linear-gradient(-45deg, #ccc 25%, transparent 25%),
            linear-gradient(45deg, transparent 75%, #ccc 75%),
            linear-gradient(-45deg, transparent 75%, #ccc 75%)
          `,
          backgroundSize: "20px 20px",
          backgroundPosition: "0 0, 0 10px, 10px -10px, -10px 0px",
        };
      default:
        return {};
    }
  };

  const deviceScaleFactor = config.scale / 100;
  const deviceWidth = device.width * deviceScaleFactor * 0.7;
  const deviceHeight = device.height * deviceScaleFactor * 0.7;

  return (
    <>
      <div className="grain" aria-hidden="true" />

      <nav>
        <div className="nav-inner">
          <Link to="/" className="logo">
            <img src="/glid-logo-white.png" alt="Glid" className="logo-svg logo-dark" />
            <img src="/glid-logo-black.png" alt="Glid" className="logo-svg logo-light" />
          </Link>
          <div className="nav-actions">
            <Link to="/social" className="btn-ghost">Social Posts</Link>
            <Link to="/" className="btn-ghost">&larr; Home</Link>
          </div>
        </div>
      </nav>

      <main className="mockup-page">
        <header className="mockup-header">
          <h1 className="display-large">Screenshot Mockup Generator</h1>
          <p className="subhead">Upload a screenshot, pick a device, and download a social-ready mockup</p>
        </header>

        <div className="mockup-workspace">
          {/* Controls Panel */}
          <aside className="controls-panel">
            {/* Upload Section */}
            <section className="control-section">
              <h3>Screenshot</h3>
              <div
                className={`upload-zone ${isDragging ? "dragging" : ""} ${screenshot ? "has-image" : ""}`}
                onDrop={handleDrop}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onClick={() => fileInputRef.current?.click()}
              >
                {screenshot ? (
                  <div className="upload-preview">
                    <img src={screenshot} alt="Screenshot preview" />
                    <span className="change-text">Click to change</span>
                  </div>
                ) : (
                  <div className="upload-prompt">
                    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                      <polyline points="17 8 12 3 7 8" />
                      <line x1="12" y1="3" x2="12" y2="15" />
                    </svg>
                    <p>Drop screenshot here or click to upload</p>
                  </div>
                )}
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleInputChange}
                  style={{ display: "none" }}
                />
              </div>
            </section>

            {/* Device Selection */}
            <section className="control-section">
              <h3>Device</h3>
              <div className="button-group">
                {(Object.keys(deviceInfo) as DeviceType[]).map((deviceType) => (
                  <button
                    key={deviceType}
                    className={`control-btn ${config.device === deviceType ? "active" : ""}`}
                    onClick={() => updateConfig({ device: deviceType })}
                  >
                    {deviceInfo[deviceType].name}
                  </button>
                ))}
              </div>
            </section>

            {/* Platform Selection */}
            <section className="control-section">
              <h3>Export Size</h3>
              <div className="button-group">
                {(Object.keys(platformDimensions) as Platform[]).map((platform) => (
                  <button
                    key={platform}
                    className={`control-btn ${config.platform === platform ? "active" : ""}`}
                    onClick={() => updateConfig({ platform })}
                  >
                    {platformDimensions[platform].label}
                  </button>
                ))}
              </div>
              <p className="dimension-info">{dims.width} x {dims.height}px</p>
            </section>

            {/* Background */}
            <section className="control-section">
              <h3>Background</h3>
              <div className="button-group">
                <button
                  className={`control-btn ${config.background === "solid" ? "active" : ""}`}
                  onClick={() => updateConfig({ background: "solid" })}
                >
                  Solid
                </button>
                <button
                  className={`control-btn ${config.background === "gradient" ? "active" : ""}`}
                  onClick={() => updateConfig({ background: "gradient" })}
                >
                  Gradient
                </button>
                <button
                  className={`control-btn ${config.background === "transparent" ? "active" : ""}`}
                  onClick={() => updateConfig({ background: "transparent" })}
                >
                  Transparent
                </button>
              </div>

              {config.background === "solid" && (
                <div className="color-presets">
                  {presetBackgrounds.map((preset) => (
                    <button
                      key={preset.color}
                      className={`color-preset ${config.backgroundColor === preset.color ? "active" : ""}`}
                      style={{ backgroundColor: preset.color }}
                      onClick={() => updateConfig({ backgroundColor: preset.color })}
                      title={preset.name}
                    />
                  ))}
                  <input
                    type="color"
                    value={config.backgroundColor}
                    onChange={(e) => updateConfig({ backgroundColor: e.target.value })}
                    className="color-picker"
                  />
                </div>
              )}

              {config.background === "gradient" && (
                <>
                  <div className="gradient-presets">
                    {presetGradients.map((preset, i) => (
                      <button
                        key={i}
                        className={`gradient-preset ${config.gradientStart === preset.start && config.gradientEnd === preset.end ? "active" : ""}`}
                        style={{ background: `linear-gradient(135deg, ${preset.start}, ${preset.end})` }}
                        onClick={() => updateConfig({ gradientStart: preset.start, gradientEnd: preset.end })}
                        title={preset.name}
                      />
                    ))}
                  </div>
                  <div className="gradient-controls">
                    <div className="color-row">
                      <label>Start</label>
                      <input
                        type="color"
                        value={config.gradientStart}
                        onChange={(e) => updateConfig({ gradientStart: e.target.value })}
                      />
                    </div>
                    <div className="color-row">
                      <label>End</label>
                      <input
                        type="color"
                        value={config.gradientEnd}
                        onChange={(e) => updateConfig({ gradientEnd: e.target.value })}
                      />
                    </div>
                    <div className="slider-row">
                      <label>Angle: {config.gradientAngle}°</label>
                      <input
                        type="range"
                        min="0"
                        max="360"
                        value={config.gradientAngle}
                        onChange={(e) => updateConfig({ gradientAngle: parseInt(e.target.value) })}
                      />
                    </div>
                  </div>
                </>
              )}
            </section>

            {/* Device Adjustments */}
            <section className="control-section">
              <h3>Adjustments</h3>
              <div className="slider-row">
                <label>Scale: {config.scale}%</label>
                <input
                  type="range"
                  min="40"
                  max="120"
                  value={config.scale}
                  onChange={(e) => updateConfig({ scale: parseInt(e.target.value) })}
                />
              </div>
              <div className="slider-row">
                <label>Rotation: {config.rotation}°</label>
                <input
                  type="range"
                  min="-30"
                  max="30"
                  value={config.rotation}
                  onChange={(e) => updateConfig({ rotation: parseInt(e.target.value) })}
                />
              </div>
              <div className="slider-row">
                <label>Shadow: {config.shadowIntensity}%</label>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={config.shadowIntensity}
                  onChange={(e) => updateConfig({ shadowIntensity: parseInt(e.target.value) })}
                />
              </div>
              <label className="checkbox-label">
                <input
                  type="checkbox"
                  checked={config.showReflection}
                  onChange={(e) => updateConfig({ showReflection: e.target.checked })}
                />
                Show Reflection
              </label>
            </section>

            <button
              className="btn-primary download-btn"
              onClick={handleDownload}
              disabled={isExporting || !screenshot}
            >
              {isExporting ? "Exporting..." : "Download Mockup"}
            </button>
          </aside>

          {/* Preview Panel */}
          <div className="preview-panel">
            <div
              className="preview-wrapper"
              style={{
                width: dims.width * previewScale,
                height: dims.height * previewScale,
              }}
            >
              <div
                ref={exportRef}
                className="mockup-canvas"
                style={{
                  width: dims.width,
                  height: dims.height,
                  transform: `scale(${previewScale})`,
                  transformOrigin: "top left",
                  ...getBackgroundStyle(),
                }}
              >
                {screenshot ? (
                  <div
                    className="device-container"
                    style={{
                      transform: `rotate(${config.rotation}deg)`,
                    }}
                  >
                    {/* Device Frame */}
                    <div
                      className="device-frame"
                      style={{
                        width: deviceWidth,
                        height: deviceHeight,
                        borderRadius: device.radius * deviceScaleFactor * 0.7,
                        boxShadow: config.shadowIntensity > 0
                          ? `0 ${20 * deviceScaleFactor}px ${60 * deviceScaleFactor}px rgba(0,0,0,${config.shadowIntensity / 100 * 0.5}),
                             0 ${10 * deviceScaleFactor}px ${30 * deviceScaleFactor}px rgba(0,0,0,${config.shadowIntensity / 100 * 0.3})`
                          : "none",
                      }}
                    >
                      {/* Device Bezel */}
                      <div
                        className="device-bezel"
                        style={{
                          borderRadius: device.radius * deviceScaleFactor * 0.7,
                          padding: device.bezel * deviceScaleFactor * 0.7,
                        }}
                      >
                        {/* Dynamic Island / Notch */}
                        {(config.device === "iphone-15-pro" || config.device === "iphone-15") && (
                          <div className="dynamic-island" />
                        )}

                        {/* Screen */}
                        <div
                          className="device-screen"
                          style={{
                            borderRadius: (device.radius - device.bezel) * deviceScaleFactor * 0.7,
                          }}
                        >
                          <img
                            src={screenshot}
                            alt="Screenshot"
                            style={{
                              width: "100%",
                              height: "100%",
                              objectFit: "cover",
                            }}
                          />
                        </div>
                      </div>
                    </div>

                    {/* Reflection */}
                    {config.showReflection && (
                      <div
                        className="device-reflection"
                        style={{
                          width: deviceWidth,
                          height: deviceHeight * 0.3,
                          borderRadius: device.radius * deviceScaleFactor * 0.7,
                          transform: `scaleY(-1) translateY(${-20 * deviceScaleFactor}px)`,
                          opacity: 0.15,
                          maskImage: "linear-gradient(to bottom, rgba(0,0,0,0.3), transparent)",
                          WebkitMaskImage: "linear-gradient(to bottom, rgba(0,0,0,0.3), transparent)",
                        }}
                      >
                        <div
                          className="device-bezel"
                          style={{
                            borderRadius: device.radius * deviceScaleFactor * 0.7,
                            padding: device.bezel * deviceScaleFactor * 0.7,
                          }}
                        >
                          <div
                            className="device-screen"
                            style={{
                              borderRadius: (device.radius - device.bezel) * deviceScaleFactor * 0.7,
                            }}
                          >
                            <img
                              src={screenshot}
                              alt=""
                              style={{
                                width: "100%",
                                height: "100%",
                                objectFit: "cover",
                              }}
                            />
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="empty-state">
                    <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
                      <rect x="5" y="2" width="14" height="20" rx="3" />
                      <line x1="12" y1="18" x2="12" y2="18.01" strokeWidth="2" strokeLinecap="round" />
                    </svg>
                    <p>Upload a screenshot to preview</p>
                  </div>
                )}
              </div>
            </div>
            <p className="preview-note">
              Preview scaled to fit. Download will be full resolution ({dims.width} x {dims.height}px).
            </p>
          </div>
        </div>
      </main>
    </>
  );
}
