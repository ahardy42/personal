var portfolio = require("./portfolio");
// grab carousel information from the db and display it.

$.ajax({
    method: "GET",
    url: "/api/portfolio"
}).then(function (data) {
    console.log(data);
    var linkArray = portfolio.addLinks(data);
    linkArray.forEach(function(link) {
        $(".carousel").append(link);
    });
    // initialize the carousel
    var options = {
        numVisible: 3,
        dist: -50
    };
    var instances = portfolio.init(options);
});