// JS to create carousel and load content. 
var M = require("materialize-css");

export var portfolio = {
    init: function (options) {
        var elements = document.querySelectorAll(".carousel");
        var instances = M.Carousel.init(elements, options);
        return instances;
    },
    addLinks: function(array) {
        var linkArray = [];
        array.forEach(function(element) {
            var link = document.createElement("a");
            var img = document.createElement("img");
            link.className = "carousel-item";
            link.href = element.href;
            img.src = element.imgUrl;
            link.appendChild(img);
            linkArray.push(link);
        });
        return linkArray;
    }
};
