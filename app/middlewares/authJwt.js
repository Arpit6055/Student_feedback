const jwt = require("jsonwebtoken");
const config = require("../config/auth.config.js");
const db = require("../models");
const Student = require("../models/student.model.js");
const Teacher = require("../models/teacher.model.js");
const { extractToken } = require("../services/backgroundTask.services.js");
const User = db.user;
const Role = db.role;

let verifyToken = async(req, res, next) => {

  let token = req.session.token

  if (!token) {
    return res.status(403).send({ message: "No token provided!" });
  }

  jwt.verify(token, config.secret, (err, decoded) => {
    if (err) {
      return res.status(401).send({ message: "Unauthorized!" });
    }
    req.userId = decoded.id;
    req.username = decoded.username;
    next();
  });
};

let isAdmin = (req, res, next) => {
  User.findById(req.userId).exec((err, user) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }

    Role.find(
      {
        _id: { $in: user.roles },
      },
      (err, roles) => {
        if (err) {
          res.status(500).send({ message: err });
          return;
        }

        for (let i = 0; i < roles.length; i++) {
          if (roles[i].name === "ADMIN") {
            next();
            return;
          }
        }

        res.status(403).send({ message: "Require Admin Role!" });
        return;
      }
    );
  });
};

let isTeacher = (req, res, next) => {
  Teacher.findOne({username:req.username}).exec((err, user) => {
    if (err || !user) {
      res.status(403).send({ message: !user?"no such Teacher found" : err });
      return;
    }
    next();
  });
};

let isStudent = (req, res, next) => {
  Student.findOne({username:req.username}).exec((err, user) => {
    if (err || !user) {
      res.status(403).send({ message: !user?"no such Student found" : err });
      return;
    }
    next();
  });
};

const authJwt = {
  verifyToken,
  isAdmin,
  isTeacher,
  isStudent
};
module.exports = authJwt;
