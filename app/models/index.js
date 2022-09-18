const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const db = {};

db.mongoose = mongoose;

db.user = require("./user.model");
db.role = require("./role.model");
db.student = require("./student.model");
db.teacher = require("./teacher.model");

db.ROLES = ["STUDENT", "TEACHER", "ADMIN"];
db.SUBJECTS = ["HINDI", "ENGLISH", "MATH","SCIENCE"];

module.exports = db;