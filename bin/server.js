
const environment = require('../lib/environment');


if ( !environment.prod ) {
  console.log("dev or prod");
  require('./_babel');
}

// Short the import path.
require('app-module-path').addPath(__dirname + '/../');

const createServer = require('lib/createServer').default;
const PORT = environment.port;

// Startup the server.
createServer().then(app => {
  app.listen(PORT, () => {
    const mode = environment.env;
    console.log('Server listening on', PORT, 'in', mode, 'mode');
  });
}, err => {
  console.error(err.stack);
  process.exit(1);
});
