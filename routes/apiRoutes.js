var db = require("../models");

module.exports = function(app) {
    // login route tbd

    // route for getting info from database 
    app.get("/api/portfolio", function(req, res) {
        db.Portfolio.find({}, function(err, docs) {
            if (err) {
                console.log(err);
            } else {
                res.json(docs);
            }
        });
    });

    // route for posting portfolio info to the database
    app.post("/api/portfolio", function(req, res) {
        var doc = req.body;
        console.log("body", doc);
        db.Portfolio.create(req.body, function(err, docs) {
            if (err) {
                console.log(err);
            } else {
                res.json(docs);
            }
        });
    });

    // route for updating database info
    app.put("/api/portfolio/:id", function(req, res) {
        var id = req.params.id;
        db.Portfolio.updateOne({_id: id}, req.body, function(err, docs) {
            if (err) {
                console.log(err);
            } else {
                res.json(docs);
            }
        });
    });

    // route for deleting a database entry
    app.delete("/api/portfolio/:id", function(req, res) {
        var id = req.params.id;
        db.Portfolio.deleteOne({_id: id}, function(err, docs) {
            if (err) {
                console.log(err);
            } else {
                res.json(docs);
            }
        });
    });
}