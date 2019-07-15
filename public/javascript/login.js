$(document).ready(function () {

    // checkbox check
    $("#isSignup").on("click", function(e) {
        var checked = e.target.checked;
        var jqChk = $(this).attr("checked");
        console.log(jqChk);
    })

    // listener for submit
    $("form").on("submit", function (e) {
        e.preventDefault();
        var isChecked = document.getElementById("isSignup").checked;
        var data = {
            username: $("#username").val().trim(),
            password: $("#password").val()
        };
        if (!data.username || !data.password) {
            return;
        }

        if (isChecked) {
            $.ajax({
                method: "POST",
                url: "/api/signup",
                data: data
            }).then(function (response) {
                window.location.assign("/admin");
            }).catch(function (err) {
                console.error(err);
            });
        } else {
            $.ajax({
                method: "POST",
                url: "/api/login",
                data: data
            }).then(function (response) {
                window.location.assign("/admin");
            }).catch(function (err) {
                console.error(err);
            });
        }
    })
});