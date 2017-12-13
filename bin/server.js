import environment from '../lib/environment'
import createServer from '../lib/createServer'

const NODE_ENV = environment.nodeEnv
const PORT = environment.port

async function startup () {
  // Startup the server.
  try {
    const app = await createServer()
    app.listen(PORT, () => {
      console.log('Server listening on', PORT, 'in', NODE_ENV, 'mode')
    })
  } catch (err) {
    console.error(err.stack)
    process.exit(1)
  }
}

startup()
