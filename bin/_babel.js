// We need the polyfill.
require('babel-polyfill');

// Sourcemaps are nice.
require('source-map-support/register');

// In dev-mode, we use babel-register.
// In prod-mode, the files have already been transpiled.
require("babel-core/register")({
      presets: ['es2017']
  });
