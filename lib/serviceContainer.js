import {
  listModules,
  createContainer,
  Lifetime,
} from 'awilix';

/**
 * Configures a new container.
 *
 * @return {Object} The container.
 */
export default function getConfiguredContainer() {
  const container = createContainer();

  container.loadModules([
    '../app/services/*.js',
  ], {
    cwd: __dirname,
    formatName: 'camelCase',
    registrationOptions: {
      lifetime: Lifetime.SINGLETON,
    },
  });

  const models = listModules('../app/models/*.js', { cwd: __dirname });
  models.forEach(
    (m) => {
      const target = require(m.path).default;
      const name = m.name[0].toUpperCase() + m.name.slice(1);

      if (target.init) {
        container.registerFunction({ [name]: [target.init.bind(target),
          { lifetime: Lifetime.SINGLETON }] });
      } else {
        // container.registerClass({[name]:[target.constructor, { lifetime: Lifetime.SINGLETON }]});
        container.registerValue(name, [target, { lifetime: Lifetime.SINGLETON }]);
      }
    },
  );

  return container;
}
