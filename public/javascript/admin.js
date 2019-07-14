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

    $("body").on("click", ".delete", function() {
        var id = $(this).data("id");

        $.ajax({
            method: "DELETE",
            url: "/api/portfolio/" + id
        }).then(function(data) {
            location.reload();
        }).catch(function(err) { 
            console.log(err);
        });
    });

    $("body").on("click", ".edit", function() {
        var id = $(this).data("id");
        var row = $(`tr[data-id=${id}]`);
        var children = row.children();
        var data = {};
        children.each(function(i, element) {
            if (element.tagName === "INPUT") {
                var key = element.getAttribute("data-col");
                var val = element.value;
                data[key] = val;
            }
        });
        console.log(data);
        $.ajax({
            method: "PUT",
            url: "/api/portfolio/" + id,
            data: data
        }).then(function(data) {
            location.reload();
        }).catch(function(err) { 
            console.log(err);
        });
    });

    $("body").on("click", "td", function() {
        // change the td to input with initial value = textContent
        var textContent = $(this).text();
        var column = $(this).data("col");
        var input = $("<input>").attr({"type": "text", "data-col": column}).val(textContent);
        $(this).after(input);
        $(this).remove();
    });

    function insertDocument(docObject) {
        $.ajax({
            method: "POST",
            url: "/api/portfolio",
            data: docObject
        }).then(function(response) {
            location.reload();
        }).catch(function(err) {
            console.log(err);
        });
    }

    function buildTable(data) {
        var tBody = $("#tableBody");
        data.forEach(function(datum) {
            var row = $("<tr>").attr("data-id", datum._id);
            var id = $("<td>").text(datum._id).attr("data-col", "id");
            var title = $("<td>").text(datum.title).attr("data-col", "title");
            var description = $("<td>").text(datum.description).attr("data-col", "description");
            var gitUrl = $("<td>").text(datum.gitUrl).attr("data-col", "gitUrl");
            var projectUrl = $("<td>").text(datum.projectUrl).attr("data-col", "projectUrl");
            var editButton = makeButton(datum._id, "edit");
            var delButton = makeButton(datum._id, "delete");
            row.append(id, title, description, gitUrl, projectUrl, editButton, delButton);
            tBody.append(row);
        });
    }

    function makeButton(id, type) {
        //type is string
        var button = $("<button>").attr({
            "data-id": id,
            "type": "button",
            "class": "btn waves-effect waves-light " + type
        }).text(type);
        return button;
    }
})