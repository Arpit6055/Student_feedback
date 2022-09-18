const { isTeacher } = require("../middlewares/authJwt");
const Student = require("../models/student.model");
const Teacher = require("../models/teacher.model");

let exp = {};
exp.allAccess = (req, res) => {
  res.status(200).send("Public Content.");
};
exp.bestTeacher = async (req, res) => {
  try {
    let pipeline = [
      {$sort:{"likes":-1}},
      {$limit:1}
    ]
    let teacher = await Teacher.aggregate(pipeline);
    return res.status(200).json({teacher});
  } catch (error) {
    console.log({error});
    return res.status(500).json({error})
  }
};

exp.studentBoard = (req, res) => {
  res.status(200).send("Student Content.");
};

exp.adminBoard = (req, res) => {
  res.status(200).send("Admin Content.");
};

exp.teacherBoard = (req, res) => {
  res.status(200).send("Teacher Content.");
};

exp.addTeacherLike = async (req, res) => {
  try {
    let teacher = req.query.teacher;
    Teacher.findOneAndUpdate(
      { username: teacher },
      { $inc: { likes: 1 } }
    ).exec((err, teacher) => {
      if (err || !teacher)
        return res.status(403).send({
          success: false,
          message: !teacher ? "no such Teacher found" : err,
        });
      Student.updateOne(
        { username: req.username },
        { $addToSet: { likes: teacher.username } },
        () => {
          return res.status(200).json({
            success: true,
            message: "Teacher added to favorite teachers list",
          });
        }
      );
    });
  } catch (error) {
    res.status(500).json({ error, success: false });
  }
};

exp.removeFavTeacher = async (req, res) => {
  try {
    let teacher = req.query.teacher;
    Student.updateOne(
      { username: req.username },
      { $pull: { likes: teacher } },
      function (err, numberAffected) {
        if (err) {
          return callback({
            error: err,
          });
        }
        if (numberAffected.n > 0) {
          Teacher.updateOne(
            { username: teacher },
            { $inc: { likes: -1 } },
            (err, numberAffected) => {
              if (err) {
                return callback({
                  error: err,
                });
              }
              if (numberAffected.n > 0)
                return res
                  .status(200)
                  .json({
                    success: true,
                    message: "Teacher removed from favorite teachers list",
                  });
              else throw "Some thing went wrong";
            }
          );
        } else
          return res.status(200).json({
            success: false,
            message: "Teacher not present in your favorite teachers list",
          });
      }
    );
  } catch (error) {
    res.status(500).json({ error, success: false });
  }
};

module.exports = exp;
