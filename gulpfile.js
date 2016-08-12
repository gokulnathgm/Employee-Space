const gulp = require('gulp');
const nodemon = require('gulp-nodemon');
const env = require('gulp-env');
const fs = require('fs');
const exec = require('child_process').exec;

gulp.task('set-env', function () {
  if(fs.existsSync('./env.json')) {
    env({
      file: 'env.json', 
      vars: {}
    }); 
  }
  else {
    console.log('Please create an env.json file');
  }
});

gulp.task('dev-server', function() {
  nodemon({
    script: 'server.js',
    ext: 'js'
  });
});

gulp.task('dev-space', [
  'set-env',
  'dev-server'
  ]);

gulp.task('deploy', function(cb) {
  exec('shipit staging deploy', function(err, stdout, stderr) {
    console.log(stdout);
    console.log(stderr);
    cb(err);
  });
});