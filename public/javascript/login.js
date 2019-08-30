$(document).ready(function () {

    // listener for submit
    $("form").on("submit", function (e) {
        e.preventDefault();
        var data = {
            username: $("#username").val().trim(),
            password: $("#password").val()
        };
        if (!data.username || !data.password) {
            return;
        }

        $.ajax({
            method: "POST",
            url: "/api/login",
            data: data
        }).then(function (response) {
            console.log(response);
            location.assign(`${location.origin}/admin`);
            console.log("wtf");
        }).catch(function (err) {
            console.error(err);
        });
    })
});