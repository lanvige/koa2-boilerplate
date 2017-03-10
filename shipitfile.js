
module.exports = function (shipit) {
  require('shipit-deploy')(shipit);
  require('shipit-shared-copy')(shipit);

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
      servers: 'ares@h.d2labs.cn'
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
    return shipit.local('yarn run build', { cwd: '/tmp/app-koa2boilerplate' })
  });

  shipit.on('fetched', function () {
    console.log('itis npm build');
    shipit.start(['npm-install', 'npm-build']);
  });



  // Docker dislike soft link
  // So make a physical copy (deploy) instead of softlink (current)
  shipit.blTask('deploy-clean', function () {
    console.log('cp -R ' + shipit.releasePath + ' ' + shipit.config.deployTo + '/deploy');
    return shipit.remote('rm -rf ' + shipit.config.deployTo + '/deploy');
  });

  shipit.blTask('deploy-duplicate', function () {
    return shipit.remote('cp -R ' + shipit.releasePath + ' ' + shipit.config.deployTo + '/deploy');
  });

  shipit.on('published', function () {
    shipit.start(['deploy-clean', 'deploy-duplicate']);
  });



  // Docker build & run on Remote
  shipit.blTask('docker-up', function () {
    shipit.log('docker-compose up with build...');
    return shipit.remote('cd ' + shipit.config.deployTo + '/deploy; docker-compose up -d --build');
  });


  // // Docker build & run on Remote
  // shipit.blTask('docker-stop', function () {
  //   shipit.log('docker-compose stop...');
  //   // return shipit.remote('cd '+shipit.releasePath+'; pwd');
  //   return shipit.remote('cd /data/repos/app-koa2bp/current; docker-compose rm');
  // });

  // shipit.blTask('docker-run', function () {
  //   shipit.log('docker-compose up start...');
  //   return shipit.remote('cd /data/repos/app-koa2bp/current; docker-compose up -d --no-deps')
  // });

  // shipit.on('deployed1', function () {
  //   shipit.log('Docker deploy start');
  //   shipit.start(['docker-run']);
  // });
};