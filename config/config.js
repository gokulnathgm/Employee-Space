
if(!process.env.NODE_ENV) {
  console.log('Environement not defined, loading using development configuration');
  process.env.NODE_ENV = 'development';
}

const config = require('./' + process.env.NODE_ENV);
module.exports = config;