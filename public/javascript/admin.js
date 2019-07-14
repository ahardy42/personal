$(document).ready(function() {

    // build a table w/ contents from the database
    $.ajax({
        method: "GET",
        url: "/api/portfolio"
    }).then(function(data) {
        buildTable(data);
    });

    $("form").on("submit", function(event) {
        event.preventDefault();

        var doc = {
            title: $("#title").val().trim(),
            description: $("#description").val().trim(),
            gitUrl: $("#gitUrl").val().trim(),
            projectUrl: $("#projectUrl").val().trim()
        };

        insertDocument(doc);
    });

    function insertDocument(docObject) {
        $.ajax({
            method: "POST",
            url: "/api/portfolio",
            data: docObject
        }).then(function(response) {
            console.log(response);
        }).catch(function(err) {
            console.log(err);
        });
    }

    function buildTable(data) {
        var tBody = $("#tableBody");
        data.forEach(function(datum) {
            var row = $("<tr>");
            var id = $("<td>").text(datum._id);
            var title = $("<td>").text(datum.title);
            var description = $("<td>").text(datum.description);
            var gitUrl = $("<td>").text(datum.gitUrl);
            var projectUrl = $("<td>").text(datum.projectUrl);
            row.append(id, title, description, gitUrl, projectUrl);
            tBody.append(row);
        });
    }

})