const { student, teacher } = require("../models");

function signupBGtask(url, body) {
  const myArray = url.split("/");
  let path = myArray[myArray.length - 1];
  if (path === "student_signup") {
    new student({
      username: body.username,
      subjects: body.subject,
      likes: [],
    }).save((err) => {
      if (err) {
        console.log("error", err);
      }

      console.log("added 1 'USER' to students collection");
    });
  } else if (path === "teacher_signup") {
    new teacher({
      username: body.username,
      subject: body.subject,
      likes: 0,
    }).save((err) => {
      if (err) {
        console.log("error", err);
      }

      console.log("added 1 'USER' to teachers collection");
    });
  }
}

module.exports = { signupBGtask };
