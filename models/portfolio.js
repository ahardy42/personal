var mongoose = require("mongoose");

// reference to the schema constructor
var Schema = mongoose.Schema;

var PortfolioSchema = new Schema({
    title: String,
    description: String,
    gitUrl: String,
    projectUrl: String
});

// creating a model from the schema
var Portfolio = mongoose.model("Portfolio", PortfolioSchema);

module.exports = Portfolio;