const mongoose = require("mongoose");

const Student = mongoose.model(
  "Student",
  new mongoose.Schema({
    username: String,
    subjects : [String],
    likes : [String]
  })
);

module.exports = Student;