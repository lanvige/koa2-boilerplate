import { createContainer, Lifetime, asClass, asValue, asFuncation } from 'awilix';
import Page from '../app/models/page';

/**
 * Using Awilix, the following files and folders (glob patterns)
 * will be loaded.
 */
const servicesToLoad = [
  'app/services/*.js'
];

const modelsToLoad = [
  'app/models/*.js'
];

/**
 * Configures a new container.
 *
 * @return {Object} The container.
 */
export default function getConfiguredContainer() {
  const container = createContainer();

  container.loadModules(
    servicesToLoad,
    {
      cwd: `${__dirname}/..`,
      formatName: 'camelCase',
      registrationOptions: {
        lifetime: Lifetime.SINGLETON
      }
    }
  );

  // by manual????
  container.register({
    page: asValue(Page)
  });


  return container;
}
