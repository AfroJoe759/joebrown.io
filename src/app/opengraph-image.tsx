import { ImageResponse } from "next/og";

import { site } from "@/content/site";

export const alt = `${site.name} — ${site.title}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    <div
      style={{
        alignItems: "center",
        background: "#0a0a0c",
        color: "#fafafa",
        display: "flex",
        height: "100%",
        justifyContent: "center",
        padding: "72px",
        width: "100%",
      }}
    >
      <div style={{ display: "flex", flexDirection: "column", maxWidth: 980 }}>
        <div
          style={{
            color: "#8ca4ff",
            display: "flex",
            fontSize: 28,
            letterSpacing: 6,
          }}
        >
          {site.name.toUpperCase()}
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 76,
            fontWeight: 700,
            marginTop: 28,
          }}
        >
          Building software that helps people do their best work.
        </div>
        <div
          style={{
            color: "#b8b8c2",
            display: "flex",
            fontSize: 30,
            marginTop: 36,
          }}
        >
          {site.title} · Products · Platforms · Developer Experience
        </div>
      </div>
    </div>,
    size,
  );
}
