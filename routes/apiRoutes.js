var db = require("../models");
var path = require("path");
var isAuthenticated = require("../config/middleware/isAuthenticated");
var passport = require("../config/passport");
var AWS = require("aws-sdk");
var multer = require("multer");
var multerS3 = require("multer-s3");
require("dotenv").config();

AWS.config.update({ region: "us-east-2" });
s3 = new AWS.S3({
    apiVersion: '2006-03-01',
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
});

var upload = multer({
    storage: multerS3({
        s3: s3,
        bucket: process.env.AWS_BUCKET,
        acl: 'public-read',
        metadata: function (req, file, cb) {
            cb(null, { fieldName: file.fieldname });
        },
        key: function (req, file, cb) {
            cb(null, file.originalname)
        }
    })
})

module.exports = function (app) {
    // login route tbd
    app.post("/api/login", passport.authenticate("local"), function (req, res) {
        console.log("login ran", req.user);
        res.json(req.user);
    });

    // Route for signing up a user. The user's password is automatically hashed and stored securely thanks to
    // how we configured our Sequelize User Model. If the user is created successfully, proceed to log the user in,
    // otherwise send back an error
    app.post("/api/signup", function (req, res) {
        console.log("signup req.body", req.body);
        db.User.create({
            username: req.body.username,
            password: req.body.password
        })
            .then(function () {
                res.redirect(307, "/api/login");
            })
            .catch(function (err) {
                res.status(401).json(err);
            });
    });

    // Route for logging user out
    app.get("/logout", function (req, res) {
        req.logout();
        res.redirect("/");
    });

    // route for getting info from database 
    app.get("/api/portfolio", function (req, res) {
        db.Portfolio.find({}, function (err, docs) {
            if (err) {
                console.log(err);
            } else {
                res.json(docs);
            }
        });
    });

    // route for posting portfolio info to the database
    app.post("/api/portfolio", function (req, res) {
        db.Portfolio.create(req.body, function (err, docs) {
            if (err) {
                console.log(err);
            } else {
                res.json(docs);
            }
        });
});

    // post route for uploading an image file to the public/images folder
    app.post("/api/image", isAuthenticated ,upload.any(), function (req, res) {
        // middleware handles the upload to AWS
        console.log("uploaded image successfully", req.file);
        res.end();
    });

    // route for updating database info
    app.put("/api/portfolio/:id", isAuthenticated, function (req, res) {
        var id = req.params.id;
        db.Portfolio.updateOne({ _id: id }, req.body, function (err, docs) {
            if (err) {
                console.log(err);
            } else {
                res.json(docs);
            }
        });
    });

    // route for deleting a database entry
    app.delete("/api/portfolio/:id", function (req, res) {
        if (!req.user) {
            res.redirect("/login");
        } else {
            var id = req.params.id;
            db.Portfolio.deleteOne({ _id: id }, function (err, docs) {
                if (err) {
                    console.log(err);
                } else {
                    res.json(docs);
                }
            });
        }
    });
}