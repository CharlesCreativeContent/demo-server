// IMPORTS
const express = require("express");
const mongoose = require("mongoose");
const passport = require("passport");
const flash = require("connect-flash");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const path = require("path");
const configDB = require("./app/config/database.js");

// INSTANCE
const app = express();

// FIELDS
const port = process.env.PORT || 8100;

// DATABASE
mongoose.connect(
  process.env.DATABASE_URL || configDB.url,
  { useNewUrlParser: true, useUnifiedTopology: true },
  (err, database) => {
    if (err) return console.error(err);

    const db = database;

    require("./app/config/passport")(passport); // passport configuration

    // RENDER ENGINE
    app.set("views", __dirname + "/views");
    console.log("");
    app.set("view engine", "ejs"); // set up ejs for templating

    // MIDDLEWARE
    //app.use(morgan("dev"));                     // log every request to the console
    app.use(cookieParser()); // read cookies (needed for auth)
    app.use(express.json()); // get information from html forms
    app.use(express.urlencoded({ extended: true }));
    app.use(express.static("public")); // access public resources
    app.use(
      session({
        // passport sessions
        secret: "new Venture LLC", // session secret...DONT TELL ANYONE
        resave: true,
        saveUninitialized: true,
      })
    );
    app.use(passport.initialize());
    app.use(passport.session());
    app.use(flash()); //  for flash messages in session


    app.get("/", function (req, res) {
      res.render("index.ejs");
    });
    // CRUD ACCESS ROUTES
    require("./app/routes/main.js")(app, passport, db);

  }
);

app.listen(port);
console.log("The magic happens on port " + port);
