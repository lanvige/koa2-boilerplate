import {
  listModules,
  createContainer,
  Lifetime,
  asValue,
  asFunction
} from 'awilix'

import db from './database'
import environment from './environment'
import packagejson from '../package.json'

/**
 * Configures a new container.
 *
 * @return {Object} The container.
 */
export default function getConfiguredContainer () {
  const container = createContainer()

  // register the values
  container.register({ db: asValue(db) })
  container.register({ environment: asValue(environment) })
  container.register({ packagejson: asValue(packagejson) })

  const models = listModules('../app/models/*.js', { cwd: __dirname })
  models.forEach(
    (m) => {
      const target = require(m.path).default
      const name = m.name[0].toUpperCase() + m.name.slice(1)

      if (target.init) {
        container.register({ [name]: asFunction(target.init.bind(target)).singleton() })
      } else {
        container.register({ name, target })
      }
    }
  )

  container.loadModules([
    '../app/services/*.js'
  ], {
    cwd: __dirname,
    formatName: 'camelCase',
    registrationOptions: {
      lifetime: Lifetime.SINGLETON
    }
  })

  return container
}
