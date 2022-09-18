require("dotenv").config();
const URI = process.env.MONGO_CONNECTION_URL || "";
const db = require("../models/index");
const Subject = require("../models/subject.model");
const Role = db.role;

function connectDB() {
  db.mongoose
    .connect(URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(async() => {
      console.log("Connected successfully to database 😁😁😁");
      await initialDB_Setup();
      return;
    })
    .catch((error) => {
      console.log("Connection with DB failed ☹️☹️☹️☹️");
      if (connection) connection.close();
      throw error;
    });
}

function initialDB_Setup() {
  Role.estimatedDocumentCount((err, count) => {
    if (!err && count === 0) {
      new Role({
        name: "STUDENT",
      }).save((err) => {
        if (err) {
          console.log("error", err);
        }

        console.log("added 'STUDENT' to subjects collection");
      });

      new Role({
        name: "TEACHER",
      }).save((err) => {
        if (err) {
          console.log("error", err);
        }

        console.log("added 'TEACHER' to subjects collection");
      });

      new Role({
        name: "ADMIN",
      }).save((err) => {
        if (err) {
          console.log("error", err);
        }

        console.log("added 'ADMIN' to subjects collection");
      });
    }
  });

  Subject.estimatedDocumentCount((err, count) => {
    if (!err && count === 0) {
      new Subject({
        name: "HINDI",
      }).save((err) => {
        if (err) {
          console.log("error", err);
        }

        console.log("added 'HINDI' to subjects collection");
      });

      new Subject({
        name: "MATH",
      }).save((err) => {
        if (err) {
          console.log("error", err);
        }

        console.log("added 'MATH' to subjects collection");
      });

      new Subject({
        name: "ENGLISH",
      }).save((err) => {
        if (err) {
          console.log("error", err);
        }

        console.log("added 'ENGLISH' to subjects collection");
      });

      new Subject({
        name: "SCIENCE",
      }).save((err) => {
        if (err) {
          console.log("error", err);
        }

        console.log("added 'SCIENCE' to subjects collection");
      });
    }
  });
}

// mIAY0a6u1ByJsWWZ

module.exports = connectDB;
