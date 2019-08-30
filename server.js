// ==============================================================================
// DEPENDENCIES
// ==============================================================================
var mongoose = require("mongoose");
var express = require("express");
var session = require("express-session");
var passport = require("./config/passport");
// ==============================================================================
// EXPRESS CONFIGURATION
// This sets up the basic properties for our express server
// ==============================================================================

// Tells node that we are creating an "express" server
var app = express();

// Sets an initial port. heroku uses the process.env.PORT option
var PORT = process.env.PORT || 8080;
var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/personal";


// loads static files to style and handle JS functionality on the front end
app.use(express.static("public"));

// We need to use sessions to keep track of our user's login status
app.use(session({ secret: "ninja", resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


// ================================================================================
// ROUTER
// ================================================================================

// Requiring our routes
require("./routes/htmlRoutes.js")(app);
require("./routes/apiRoutes.js")(app);


// =============================================================================
// LISTENERS
// =============================================================================
mongoose.connect(MONGODB_URI, { useNewUrlParser: true });

app.listen(PORT, function () {
  console.log("==> 🌎  Listening on port %s. Visit http://localhost:%s/ in your browser.", PORT, PORT);
});

