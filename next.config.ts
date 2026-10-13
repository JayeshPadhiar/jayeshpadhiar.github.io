import type { NextConfig } from "next";

// No script-src: a script CSP needs per-request nonces, which would make every page dynamic.
// No object-src: it would break the browser's built-in PDF viewer for the resume.
const securityHeaders = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
  { key: "Content-Security-Policy", value: "frame-ancestors 'none'; base-uri 'self'; form-action 'self'" },
];

const nextConfig: NextConfig = {
  poweredByHeader: false,
  async headers() {
    return [{ source: "/:path*", headers: securityHeaders }];
  },
  async redirects() {
    return [
      { source: "/resume", destination: "/files/Jayesh_Padhiar_Resume.pdf", permanent: false },
      // Old filter URLs from before /posts/[type] existed.
      {
        source: "/posts",
        has: [{ type: "query", key: "type", value: "(?<type>blog|article)" }],
        destination: "/posts/:type",
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
