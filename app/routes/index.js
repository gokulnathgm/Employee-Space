const employeeAPI = require('./employee.router');
const adminAPI = require('./admin.router');

/*const loginAPI = require('./login.router');
const signupAPI = require('./signup.router');
const updateAPI = require('./update.router');
const logoutAPI = require('./logout.router');
const employeesAPI = require('./employees.router');
const employeeAPI = require('./employee.router');
const adminLoginAPI = require('./adminLogin.router');
const adminLogoutAPI = require('./adminLogout.router');
const checkAuthenticationAPI = require('./checkAuthentication.router')*/;

module.exports = function (app) {
  app.use('/employee/', employeeAPI);
  app.use('/admin/', adminAPI);


/*	app.use('/login', loginAPI); 
	app.use('/signup', signupAPI);
	app.use('/update/', updateAPI);
	app.use('/logout', logoutAPI);
	app.use('/employees', employeesAPI);
  app.use('/employee', employeeAPI);
  app.use('/adminLogin', adminLoginAPI);
  app.use('/adminLogout', adminLogoutAPI);
  app.use('/checkAuthentication', checkAuthenticationAPI);*/
};
