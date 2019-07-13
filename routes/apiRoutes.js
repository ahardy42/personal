var db = require("../models");

module.exports = function(app) {
    // login route tbd

    // route for getting info from database 
    app.get("/api/portfolio", function(req, res) {
        db.Portfolio.find({}, function(err, docs) {
            if (err) {
                console.log(err);
            }
            res.json(docs);
        });
    });

    // route for posting info to the database
    app.post("/api/portfolio", function(req, res) {
        // work to do
    });

    // route for updating database info
    app.put("/api/portfolio/:id", function(req, res) {
        var id = req.params.id;
        // work to do
    })

    // route for deleting a database entry
    app.delete("/api/portfolio/:id", function(req, res) {
        var id = req.params.id;
        // work to do
    });
}