const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const employeeSchema = new Schema({
  name: String,
  gender: String,
  email: String,
  password: String,
  age: Number,
  joinDate: Date,
  experience: Number,
  specialisation: String,
  skills: String,
  age: Number,
  grade: String,
  verified: {type: Boolean, default: false}
});

const Employee = mongoose.model('employee', employeeSchema);

module.exports = Employee;