const employeeAPI = require('./employee.router');
const adminAPI = require('./admin.router');

module.exports = function (app) {
	app.use('/employee/', employeeAPI);
	app.use('/admin/', adminAPI);
};
