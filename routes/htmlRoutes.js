var db = require("../models");
var path = require("path");

module.exports = function(app) {
    // route for main page 
    app.get("/", function (req, res) {
        res.sendFile(path.join(__dirname, "../public/main.html"));
    });

    // route for portfolio page -- gets all db info and sends it!
    app.get("/portfolio", function (req, res) {
        db.Portfolio.findAll().then(function (data) {
            res.render("portfolio",data);
        }).catch(function(err) {
            res.json(err);
        });
    });

    // route for specific portfolio piece
    app.get("/portfolio/:project", function (req, res) {
        var project = req.params.name;
        db.Portfolio.findOne({
            where: {
                project: project
            }
        }).then(function(data) {
            res.render("project", data);
        }).catch(function(err) {
            res.json(err);
        });
    });

    // route for admin page

}