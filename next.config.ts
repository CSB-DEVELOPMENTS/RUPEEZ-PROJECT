import type { NextConfig } from "next";
import createNextPWA from "@ducanh2912/next-pwa";

const isPwaDisabled =
  process.env.NODE_ENV === "development" || process.env.NEXT_DISABLE_PWA === "1";

const withPWA = createNextPWA({
  dest: "public", // SW files go into /public
  register: true, // auto-register SW
  disable: isPwaDisabled,
});

const nextConfig: NextConfig = {
  /* config options here */
};

export default withPWA(nextConfig);
