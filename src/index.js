$(document).ready(function() {
    import $ from "jquery";
    import login from './login';
    import portfolio from './main';

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

