const connectDB = require("./app/config/db.config");
connectDB();
const express = require("express");
const cors = require("cors");
const cookieSession = require("cookie-session");

const app = express();

const corsOptions = {
  origin: process.env.ALLOWED_CLIENTS.split(',')
  // ['http://localhost:3000', 'http://localhost:5000', 'http://localhost:3300']
}

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

app.use(
  cookieSession({
    name: "secret-session",
    secret: "COOKIE_SECRET", // should use as secret environment variable
    httpOnly: true
  })
);



// simple route health-check
app.get("/", (req, res) => {
  res.json({ message: "Welcome to secret application." });
});

// routes
require("./app/routes/auth.routes")(app);
require("./app/routes/user.routes")(app);

// set port, listen for requests
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

