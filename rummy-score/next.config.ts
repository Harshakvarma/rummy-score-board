import withPWA from "next-pwa";

const nextConfig = withPWA({
  pwa: {
    dest: "public",
    register: true,
    skipWaiting: true,
  },
  // ...other next.js config options
});

export default nextConfig;
