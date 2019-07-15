var path = require("path");

module.exports = function(app) {
    // route for main page 
    app.get("/", function (req, res) {
        res.sendFile(path.join(__dirname, "../dist/main.html"));
    });

    app.get("/login", function (req, res) {
        res.sendFile(path.join(__dirname, "../dist/login.html"));
    });

    // route for admin
    app.get("/admin", function (req, res) {
        if (!req.user) {
            res.redirect("/login");
        } else {
            res.sendFile(path.join(__dirname, "../dist/admin.html"));
        }
    });

    // route for portfolio page -- gets all db info and sends it!
    app.get("/portfolio", function (req, res) {
        // some stuff here
    });

    // route for specific portfolio piece
    app.get("/portfolio/:project", function (req, res) {
        // some more stuff here
        
    });

}