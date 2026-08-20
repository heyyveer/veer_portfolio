import { ImageResponse } from "next/og";

export const dynamic = "force-static";
export const alt = "Soumyaranjan Rout - Full Stack and AI Engineer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/**
 * Static OpenGraph image (wordmark + headline) generated at build time.
 * Uses system fonts via next/og; dark, on-brand.
 */
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#0A0B0D",
          color: "#F4F5F7",
          padding: "80px",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16, fontSize: 26, letterSpacing: 4, color: "#868C99" }}>
          <div style={{ width: 44, height: 44, borderRadius: 10, border: "1px solid #23262D", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20 }}>
            SR
          </div>
          @Soumya7681
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <div style={{ fontSize: 68, fontWeight: 600, lineHeight: 1.05, letterSpacing: -2, maxWidth: 980 }}>
            Building AI-powered products and scalable software systems.
          </div>
          <div style={{ fontSize: 30, color: "#868C99" }}>
            Soumyaranjan Rout · Full Stack and AI Engineer
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
