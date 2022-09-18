const mongoose = require("mongoose");

const Teacher = mongoose.model(
  "Teacher",
  new mongoose.Schema({
    username: String,
    subject : String,
    likes : Number
  })
);

module.exports = Teacher;