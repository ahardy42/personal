var portfolio = require("./portfolio");
// grab carousel information from the db and display it.

if (navigator.platform === "iPhone") {
    var head = $("head");
    console.log(head.children("link:last"));
    head.children("link:last").after("<link rel='stylesheet' href='/style/iphone.css' type='text/css' />");
}

$.ajax({
    method: "GET",
    url: "/api/portfolio"
}).then(function (data) {
    var linkArray = portfolio.addLinks(data);
    linkArray.forEach(function(link) {
        $(".carousel").append(link);
    });
    // initialize the carousel
    var options = {
        numVisible: 3,
        dist: -50,
        indicators: true
    };
    var instances = portfolio.init(options);
});