$(document).ready(function () {

    //ON WHEN FORM SUBMITS
    $("#newUserForm").submit(function (event) {

        var newName = $("#newUserName").val();
        var primaryKey = $("#hiddenPKNew").text();
        var email = $("#hiddenEmailNew").text();

        newName = newName.replace(/\W/g, '')

        if ((newName != "" && newName.length >= 2)) {

            $.post("miscFunctionalities.php", {
                primaryKey: primaryKey,
                email: email,
                addUserName: newName
            }).done(function () {
                window.location.href = "conferenceRoom.php";
            });
            event.preventDefault();

        } else {

            if (newName == "" || newName.length <= 1) {
                $("#errorNewUserName").css("display", "inline");
                $("#newUserName").val(newName);
            } else {
                $("#errorNewUserName").css("display", "none");
                $("#newUserName").val(newName);
            }
            event.preventDefault();
        }

    });

});