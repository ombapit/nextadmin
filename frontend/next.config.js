const withPlugins = require("next-compose-plugins");
const withImages = require("next-images");
const withSass = require("@zeit/next-sass");
const webpack = require("webpack");
const path = require("path");

const { parsed: localEnv } = require('dotenv').config()

module.exports = withPlugins([[withSass], [withImages]], {
  webpack(config, options) {
    config.plugins.push(new webpack.EnvironmentPlugin(localEnv))
    config.resolve.modules.push(path.resolve("./"));
    return config;
  }
});

// module.exports = {
//   env: {
//     api: 'http://localhost:8000/',
//   },
// }