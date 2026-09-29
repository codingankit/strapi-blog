import type { NextConfig } from "next";

const mediaUrl = new URL(
  process.env.PUBLIC_MEDIA_URL ?? "http://127.0.0.1:9000",
);

const isLocalMedia =
  mediaUrl.hostname === "127.0.0.1" ||
  mediaUrl.hostname === "localhost" ||
  mediaUrl.hostname === "::1";

const mediaPath =
  mediaUrl.pathname === "/"
    ? "/**"
    : `${mediaUrl.pathname.replace(/\/$/, "")}/**`;

const nextConfig: NextConfig = {
  images: {
    dangerouslyAllowLocalIP: isLocalMedia,
    remotePatterns: [
      {
        protocol: mediaUrl.protocol.replace(":", "") as "http" | "https",
        hostname: mediaUrl.hostname,
        ...(mediaUrl.port ? { port: mediaUrl.port } : {}),
        pathname: mediaPath,
      },
    ],
  },
  reactCompiler: true,
};

export default nextConfig;
