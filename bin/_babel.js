// Polyfill to translate the new API syntax.
// Sourcemaps are nice.
require('source-map-support/register');

// In dev-mode, we use babel-register.
// In prod-mode, the files have already been transpiled.
require('babel-core/register')({
  plugins: ['transform-es2015-modules-commonjs']
});
