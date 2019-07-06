var db = require("../models");

module.exports = function(app) {
    // route for posting info to the database
    app.post("/api/portfolio", function(req, res) {
        db.Portfolio.create(req.body).then(function(data) {
            res.json(data);
        }).catch(function(err) {
            console.log(err);
        });
    });

    // route for updating database info
    app.put("/api/portfolio/:id", function(req, res) {
        var id = req.params.id;
        db.Portfolio.update(req.body, {
            where: {
                id: id
            }
        }).then(function(data) {
            res.json(data);
        }).catch(function(err) {
            console.log(err);
        });
    })

    // route for deleting a database entry
    app.delete("/api/portfolio/:id", function(req, res) {
        var id = req.params.id;
        db.Portfolio.destroy({
            where: {
                id: id
            }
        }).then(function(data) {
            res.json(data);
        }).catch(function(err) {
            console.log(err);
        });
    });
}