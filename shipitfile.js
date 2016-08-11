module.exports = function(shipit) {
  require('shipit-deploy')(shipit);

  shipit.initConfig({
    default: {
      workspace: '/home/Gokul/space-workspace', 
      deployTo: '/home/Gokul/space-deploy', 
      repositoryUrl: 'https://github.com/gokulnathgm/Employee-Space', 
      ignores: ['.git', 'node_modules'],
      rsync: ['--del'],
      keepReleases: 2,
      key: '~/.ssh/id_rsa',
      shallowClone: true
    }, 
    staging: {
      servers: 'Gokul@localhost'
    }
  });
};