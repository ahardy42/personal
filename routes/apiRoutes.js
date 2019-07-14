var db = require("../models");
var path = require("path");

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
        db.Portfolio.create(req.body, function(err, docs) {
            if (err) {
                console.log(err);
            } else {
                res.json(docs);
            }
        });
    });

    // post route for uploading an image file to the public/images folder
    app.post("/api/image", function (req, res) {
        if (req.files.length == 0) {
            return res.status(400).send('No files were uploaded.');
        }

        // There will only be one file uploaded from the front end
        var imageFile = req.files.imageFile;
        var name = imageFile.name;

        // Use the mv() method to place the file somewhere on your server
        imageFile.mv(path.join(__dirname, "../public/images/"+name), function (err) {
            if (err)
                return res.status(500).send(err);

            console.log("success!");
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