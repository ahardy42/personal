// ==============================================================================
// DEPENDENCIES
// ==============================================================================

var express = require("express");
// requiring models so we can sync
var db = require("./models");
// ==============================================================================
// EXPRESS CONFIGURATION
// This sets up the basic properties for our express server
// ==============================================================================

// Tells node that we are creating an "express" server
var app = express();

// Sets an initial port. heroku uses the process.env.PORT option
var PORT = process.env.PORT || 8080;

// Requiring our models for syncing
var db = require("./models");

// loads static files to style and handle JS functionality on the front end
app.use(express.static("public"));

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
// LISTENER
// =============================================================================

db.sequelize.sync({force: false}).then(function() {
  app.listen(PORT, function() {
    console.log("==> 🌎  Listening on port %s. Visit http://localhost:%s/ in your browser.", PORT, PORT);
  });
});
