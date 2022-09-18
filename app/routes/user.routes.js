const { authJwt } = require("../middlewares");
const controller = require("../controllers/user.controller");
const Joi = require("joi");
const validateRequest = require("../middlewares/validate-request");

function teacherLikeSchema(req, res, next) {
  const schema = Joi.object({
      teacher : Joi.string().min(1).required(),
  });
  validateRequest(req, res, next, schema,true);
};

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, Content-Type, Accept"
    );
    next();
  });

  //for ALL
  app.get("/api/test/all",[authJwt.verifyToken], controller.allAccess);
  app.get("/api/bestTeacher",[authJwt.verifyToken], controller.bestTeacher);

  //student's APIs
  app.get("/api/test/student", [authJwt.verifyToken, authJwt.isStudent], controller.studentBoard);
  app.get("/api/student/like/teacher", [authJwt.verifyToken, authJwt.isStudent,teacherLikeSchema], controller.addTeacherLike);
  app.get("/api/student/remove/like/teacher", [authJwt.verifyToken, authJwt.isStudent], controller.removeFavTeacher);

  //teacher's APIs
  app.get("/api/test/teacher",[authJwt.verifyToken, authJwt.isTeacher],controller.teacherBoard);

  //ADMIN APIs
  app.get("/api/test/admin",[authJwt.verifyToken, authJwt.isAdmin],controller.adminBoard);
};
