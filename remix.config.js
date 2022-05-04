/**
 * @type {import("@remix-run/dev").AppConfig}
 */
module.exports = {
  serverBuildTarget: "vercel",
  ignoredRouteFiles: [".*"],
  appDirectory: "app",
  browserBuildDirectory: "public/build",
  publicPath: "/build/",
  server: process.env.NODE_ENV === "development" ? undefined : "./server.js",
  // assetsBuildDirectory: "public/build",
  // serverBuildPath: "build/index.js",
  // devServerPort: 8002
};
