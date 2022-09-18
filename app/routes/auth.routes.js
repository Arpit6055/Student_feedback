const { verifySignUp } = require("../middlewares");
const controller = require("../controllers/auth.controller");
const Joi = require("joi");
const validateRequest = require("../middlewares/validate-request");

function student_signupSchema(req, res, next) {
  const schema = Joi.object({
      username : Joi.string().min(1).required(),
      email : Joi.string().email().required(),
      password : Joi.string().min(4).max(25).required(),
      roles : Joi.array().default(["STUDENT"]),
      subject : Joi.array().items(Joi.string().min(1)).min(1).required()
  });
  validateRequest(req, res, next, schema);
};
function teacher_signupSchema(req, res, next) {
  const schema = Joi.object({
      username : Joi.string().min(1).required(),
      email : Joi.string().email().required(),
      password : Joi.string().min(4).max(25).required(),
      roles : Joi.array().default(["TEACHER"]),
      subject : Joi.string().min(1).required()
  });
  validateRequest(req, res, next, schema);
};

function signInSchema(req, res, next) {
  const schema = Joi.object({
      username : Joi.string().min(1).required(),
      password : Joi.string().min(4).max(25).required(),
  });
  validateRequest(req, res, next, schema);
};

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, Content-Type, Accept"
    );
    next();
  });


  /////////////////////ROUTES//////////////////////
  app.post("/api/auth/student_signup",
  [
    student_signupSchema,
    verifySignUp.checkDuplicateUsernameOrEmail,
    verifySignUp.checkRolesExisted,
    verifySignUp.checkSubjectExisted
  ],
    controller.signup
  );

  app.post("/api/auth/teacher_signup",
  [
    teacher_signupSchema
    ,verifySignUp.checkDuplicateUsernameOrEmail
    ,verifySignUp.checkRolesExisted,
    verifySignUp.checkSubjectExisted
  ],
    controller.signup
  );

  app.post("/api/auth/signin",signInSchema, controller.signin);

  app.post("/api/auth/signout", controller.signout);
};
