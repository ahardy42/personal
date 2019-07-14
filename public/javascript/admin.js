$(document).ready(function() {

    // build a table w/ contents from the database on page load
    $.ajax({
        method: "GET",
        url: "/api/portfolio"
    }).then(function(data) {
        buildTable(data);
    });

    $("#form-one").on("submit", function(event) {
        event.preventDefault();

        var doc = {
            title: $("#title").val().trim(),
            description: $("#description").val().trim(),
            gitUrl: $("#gitUrl").val().trim(),
            projectUrl: $("#projectUrl").val().trim(),
            fileName: $("#filePath").val()
        };
        document.getElementById("image").submit();
        insertDocument(doc);
    });

    $("#fileName").on("input", function(e) {
        var filePathInput = $("#filePath");
        var fileName = e.currentTarget.files[0].name;
        filePathInput.val("/images/"+fileName);
        $("#fileLabel").addClass("active");
    });

    // delete this entry from the database
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

    // update this entry with input values from the database
    $("body").on("click", ".update", function() {
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
        if (data.length === 0) {
            return;
        }
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
        if ($(this).data("col") === "description") {
            var textArea = $("<textarea>").attr({"type": "text", "data-col": column}).val(textContent);
            $(this).after(textArea);
        } else {
            var input = $("<input>").attr({"type": "text", "data-col": column}).val(textContent);
            $(this).after(input);
        }
        $(this).remove();
    });

    function getFileName() {
        var files = document.getElementById('fileName').files;
        var name;
        for (i=0; i<files.length; i++) {
            name = files[i].name;
        }
        return name;
    }

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
            var fileName = $("<td>").text(datum.fileName).attr("data-col", "fileName");
            var editButton = makeButton(datum._id, "update");
            var delButton = makeButton(datum._id, "delete");
            row.append(id, title, description, gitUrl, projectUrl, fileName, editButton, delButton);
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