import type { NextConfig } from "next";
import withPWA from "next-pwa";

const nextConfig: NextConfig = {
  basePath: "/rummy-score-board",
  output: "export",
};

export default withPWA({
  dest: "public",
  register: true,
  skipWaiting: true,
})(nextConfig as any);
