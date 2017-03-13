// Short the import path.
// import { addPath } from 'app-module-path';
// // https://libraries.io/npm/app-module-path
// addPath(__dirname + '/../');


import environment from '../lib/environment';
import createServer from '../lib/createServer';


const NODE_ENV = environment.nodeEnv;
const PORT = environment.port;


// Startup the server.
createServer().then(app => {
  app.listen(PORT, () => {
    console.log('Server listening on', PORT, 'in', NODE_ENV, 'mode');
  });
}, err => {
  console.error(err.stack);
  process.exit(1);
});
