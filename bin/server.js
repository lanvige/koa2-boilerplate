const path = require('path');

// Using babel here.
// Short the import path.
require('app-module-path').addPath(path.join(__dirname, '/../'));

const nodeEnv = process.env.NODE_ENV || 'development';

if (nodeEnv === 'development') {
  require('./_babel');
}

require('./serveres');
