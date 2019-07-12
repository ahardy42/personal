$(document).ready(function() {
    import $ from "jquery";
    import main from './main';
    import login from './login';
    import portfolio from './portfolio';

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

