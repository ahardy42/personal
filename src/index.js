$(document).ready(function() {
    var M = require("materialize-css");
    // var $ = require("jquery");
    var portfolio = require("./main");

    // initialize the carousel
    var options = {
        numVisible: 3
    };
    portfolio.init(options);
    
    // grab carousel information from the db and display it.

    $.ajax({
        method: "GET",
        url: "/api/profile"
    }).then(function(data) {
        portfolio.addLinks(data);
    });
});


