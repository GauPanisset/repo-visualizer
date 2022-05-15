/**
 * @type {import('@remix-run/dev').AppConfig}
 */
module.exports = {
  ignoredRouteFiles: ['**/.*'],
  serverDependenciesToBundle: [
    'd3-array',
    'd3-color',
    'd3-dispatch',
    'd3-quadtree',
    'd3-force',
    'd3-format',
    'd3-interpolate',
    'd3-hierarchy',
    'd3-scale',
    'd3-time',
    'd3-time-format',
    'd3-timer',
    'internmap',
  ],
  // appDirectory: "app",
  // assetsBuildDirectory: "public/build",
  // serverBuildPath: "build/index.js",
  // publicPath: "/build/",
}
