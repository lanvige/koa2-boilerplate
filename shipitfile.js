
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
      ignores: ['.git', 'node_modules'],
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


  shipit.blTask('build1', function () {
    // ... 
    shipit.log('yarn install.');
    shipit.local('pwd');
    return shipit.local('yarn install', { cwd: '/tmp/app-koa2boilerplate' })
  });

  shipit.blTask('build2', function () {
    // ... 
    shipit.log('npm installed and build start.');
    shipit.log('npm builed.');
    return shipit.local('npm run build', { cwd: '/tmp/app-koa2boilerplate' })
  });

  shipit.on('fetched', function () {
    console.log('itis npm build');
    shipit.start(['build1', 'build2']);
  });
};