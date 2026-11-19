import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  cacheComponents: true,
  partialPrefetching: true,
  allowedDevOrigins: ["192.168.1.18", "netacad-com.tail13f3d5.ts.net"],
};

export default nextConfig;
