
var MAIN = /** @class */ (function () {

    function MAIN() {

        //ON READY
        $(document).ready(function () {

            //ON WHEN FORM SUBMITS
            $("#submitForm").submit(function (event) {

                var cname = $("#conferenceName").val();
                var tl = $("#timeLimit").val();
                var cinvites = $("#conferenceInvitees").val();
                var adminName = $("#adminName").val();
                var adminEmail = $("#adminEmail").val();

                cname = cname.replace(/\W/g, '')
                adminName = adminName.replace(/\W/g, '')

                var validateEmails = "";
                var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                function validateEmail(email) {
                    return re.test(String(email).toLowerCase());
                }

                function checkEmails(emails) {
                    var res = emails.split("\n");
                    for (i = 0; i < res.length; i++) {
                        if (validateEmail(res[i].trim())) {
                            validateEmails = validateEmails + res[i].trim() + ", ";
                        }
                    }
                }

                checkEmails(cinvites);

                if (validateEmails != "") {
                    validateEmails = validateEmails.substring(0, validateEmails.length - 2);
                }


                if ((cname != "" && cname.length >= 5) && validateEmails != "" && (adminName != "" && adminName.length >= 2) && (validateEmail(adminEmail))) {
                    //POST TO CONFERENCE ROOM WITH THESE KEYS AND THEIR VALUES
                    $.post("postRoomData.php", {
                        roomName: cname,
                        adminName: adminName,
                        adminEmail: adminEmail,
                        emails: validateEmails,
                        timeLimit: tl,
                        submit: "submit"
                    }).done(function () {
                        //WHEN IT IS DONE POSTING, REDIRECT
                        window.location.href = "conferenceRoom.php";
                    });
                    // prevent the default submit action to happen?
                    event.preventDefault();

                } else {

                    if (cname == "" || cname.length <= 4) {
                        $("#errorRoomName").css("display", "inline");
                        $("#conferenceName").val(cname);

                    } else {
                        $("#errorRoomName").css("display", "none");
                        $("#conferenceName").val(cname);
                    }


                    if (adminName == "" || adminName.length <= 1) {
                        $("#errorAdminName").css("display", "inline");
                        $("#adminName").val(adminName);
                    }else {
                        $("#errorAdminName").css("display", "none");
                        $("#adminName").val(adminName);
                    }


                    if (!(validateEmail(adminEmail))) {
                        $("#errorAdminEmail").css("display", "inline");
                    }else {
                        $("#errorAdminEmail").css("display", "none");
                    }

                    if (validateEmails == "") {
                        $("#errorEmails").css("display", "inline");
                    }else {
                        $("#errorEmails").css("display", "none");
                    }

                    event.preventDefault();
                }
            });
        });
    }
    return MAIN;
}());

// Instance and run .
var app = new MAIN();
