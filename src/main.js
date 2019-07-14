// initialize the carousel
var options = {
    numVisible: 3
};
portfolio.init(options);

// grab carousel information from the db and display it.

$.ajax({
    method: "GET",
    url: "/api/portfolio"
}).then(function(data) {
    portfolio.addLinks(data);
});