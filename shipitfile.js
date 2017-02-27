var chalk = require('chalk');

module.exports = function (shipit) {
  require('shipit-deploy')(shipit);
  require('shipit-shared')(shipit);

  shipit.initConfig({
    default: {
      workspace: '/tmp/app-koa2boilerplate',
      dirToCopy: '/tmp/app-koa2boilerplate/dist',
      deployTo: '/data/repos/app-koa2bp',
      repositoryUrl: 'git@github.com:lanvige/koa2-boilerplate.git',
      branch: 'master',
      ignores: ['.DS_Store', '.git', 'node_modules'],
      rsync: ['--del'],
      keepReleases: 2,
      // key: '/Users/lanvige/.ssh/id_rsa.pub',
      shallowClone: false,
      shared: {
        overwrite: true,
        files: [
          'config/application.yml',
          'config/database.yml'
        ],
      }
    },
    staging: {
      servers: 'root@h.d2labs.cn'
    }
  });

  shipit.task('pwd', function () {
    return shipit.remote('pwd');
  });

  // npm install & build
  shipit.blTask('npm-install', function () {
    shipit.log('yarn install.');
    return shipit.local('yarn install', { cwd: '/tmp/app-koa2boilerplate' })
  });

  shipit.blTask('npm-build', function () {
    shipit.log('npm build start.');
    return shipit.local('npm run build', { cwd: '/tmp/app-koa2boilerplate' })
  });

  shipit.on('fetched', function () {
    console.log('itis npm build');
    shipit.start(['npm-install', 'npm-build']);
  });

  // Docker build & run on Remote
  shipit.blTask('docker-build', function () {
    shipit.log(chalk.green('docker-compose build...'));
    // return shipit.remote('cd '+shipit.releasePath+'; pwd');
    return shipit.remote('cd /data/repos/app-koa2bp/current; docker-compose build');
  });

  shipit.blTask('docker-run', function () {
    shipit.log(chalk.green('docker-compose up start...'));
    return shipit.remote('cd /data/repos/app-koa2bp/current; docker-compose up')
  });

  shipit.on('deployed', function() {
    shipit.log(chalk.green('Docker deploy start'));
    shipit.start(['docker-build', 'docker-run']);
  })
};