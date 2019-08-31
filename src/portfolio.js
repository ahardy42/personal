// JS to create carousel and load content. 
var M = require("materialize-css");

var portfolio = {
    init: function (options) {
        var elements = document.querySelectorAll(".carousel");
        var instances = M.Carousel.init(elements, options);
        return instances;
    },
    addLinks: function(array) {
        console.log(array);
        var cardArray = [];
        array.forEach(function(element) {
            // card wrapper
            var card = document.createElement("div");
            card.classList.add("card", "carousel-item");
            // card image wrapper
            var cardImage = document.createElement("div");
            cardImage.classList.add("card-image", "waves-effect", "waves-block", "waves-light");
            var img = document.createElement("img");
            img.src = element.fileName;
            img.classList.add("activator");
            cardImage.appendChild(img);
            // card content wrapper
            var content = document.createElement("div");
            content.classList.add("card-content");
            var title1 = document.createElement("span");
            title1.classList.add("card-title", "activator", "grey-text", "text-darken-4");
            title1.textContent = element.title;
            content.appendChild(title1);
            console.log(content);
            // reveal contents
            var reveal = document.createElement("div");
            reveal.classList.add("card-reveal");
            var title2 = document.createElement("span");
            title2.classList.add("card-title", "grey-text", "text-darken-4");
            title2.textContent = element.title;
            reveal.appendChild(title2);
            var description = document.createElement("p");
            description.setAttribute("style", "overflow: auto");
            description.textContent = element.description;
            reveal.appendChild(description);
            // build the links out
            var linkDiv = document.createElement("div");
            linkDiv.classList.add("link-div");
            var gitLink = document.createElement("a");
            gitLink.innerHTML = "<i class=\"fab fa-github\"></i>";
            gitLink.href = element.gitUrl;
            gitLink.target = "_blank";
            var projectLink = document.createElement("a");
            projectLink.innerText = "Project Page";
            projectLink.href = element.projectUrl;
            projectLink.target = "_blank";
            // attach links to card reveal
            linkDiv.appendChild(gitLink);
            linkDiv.appendChild(projectLink);
            reveal.appendChild(linkDiv);
            card.appendChild(cardImage);
            card.appendChild(content);
            card.appendChild(reveal);
            cardArray.push(card);
        });
        return cardArray;
    }
};

module.exports = portfolio;