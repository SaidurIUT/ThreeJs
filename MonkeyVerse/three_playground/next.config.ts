import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: true,
};

export default nextConfig;


const withTM = require("next-transpile-modules")(["@react-three/fiber"]);
module.exports = withTM();
