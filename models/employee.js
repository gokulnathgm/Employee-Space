var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var employeeSchema = new Schema({
	name: String,
	gender: String,
	email: String,
	password: String,
	age: Number,
	joinDate: Date,
	experience: Number,
	specialisation: String,
	skills: Array,
	age: Number
});

var Employee = mongoose.model('employee', employeeSchema);

module.exports = Employee;