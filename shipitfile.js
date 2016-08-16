module.exports = function(shipit) {
  require('shipit-deploy')(shipit);

  shipit.initConfig({
    default: {
      workspace: '/home/Gokul/space-workspace', 
      deployTo: '/home/Gokul/space-deploy', 
      repositoryUrl: 'git@codebase.qburst.com:gokulnath/employee-space.git', 
      branch: 'master',
      ignores: ['.git', 'node_modules', 'bower_components'],
      rsync: ['--del'],
      keepReleases: 2,
      key: '~/.ssh/id_rsa',
      shallowClone: true
    }, 
    staging: {
      servers: 'Gokul@localhost'
    }
  });

  shipit.blTask('npm-install', function() {
    return shipit.remote("cd " + shipit.currentPath + " && npm install");
  });

  shipit.blTask('bower-install', function() {
    return shipit.remote("cd " + shipit.currentPath + " && npm install bower");
  });

  shipit.blTask('start-server', function() {
    return shipit.remote("cd " + shipit.currentPath + " && pm2 start pm2/pm2-stag.json");
  });

  shipit.on('deployed', function () {
    shipit.start('npm-install', 'bower-install', 'start-server');
  });
};