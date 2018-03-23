//Command to install needed jquery if you want errors gone but since you're using jquery already in html, don't need to?
//npm install --save-dev @types/jquery
//Command to compile TS
//tsc Index.ts --watch --target ES5
//tsc Index.ts --target ES5
// Index page js entry point class
var MAIN = /** @class */ (function () {
    // Create a new Index page js entry point
    function MAIN() {
        //.. TODO ..
        //ON READY
        $(document).ready(function () {
            //ON WHEN FORM SUBMITS
            $("#submitForm").submit(function (event) {
                //TODO - Validate the name, list of emails etc.
                var cname = $("#conferenceName").val();
                var tl = $("#timeLimit").val();
                var cinvites = $("#conferenceInvitees").val();
                // console.log(cname);
                // console.log(tl);
                // console.log(cinvites);
                //...
                var validateEmails = "";
                function validateEmail(email) {
                    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                    return re.test(String(email).toLowerCase());
                }
                function checkEmails(emails) {
                    var res = emails.split("\n");
                    //console.log(res);
                    for (i = 0; i < res.length; i++) {
                        //console.log(res[i]);
                        //console.log(validateEmail(res[i]));
                        if (validateEmail(res[i].trim())) {
                            validateEmails = validateEmails + res[i].trim() + ", ";
                        }
                    }
                }
                checkEmails(cinvites);
                if (validateEmails != "") {
                    validateEmails = validateEmails.substring(0, validateEmails.length - 2);
                    console.log(validateEmails);
                }
                alert("conference name: " + cname + "\ntime limit: " + tl + "\nvalidate emails: " + validateEmails);
                if ((cname != "" && cname.length >= 5) && validateEmails != "") {
                    //POST TO CONFERENCE ROOM WITH THESE KEYS AND THEIR VALUES
                    $.post("postRoomData.php", {
                        roomName: cname,
                        emails: validateEmails,
                        timeLimit: tl,
                        submit: "submit"
                    }).done(function () {
                        //WHEN IT IS DONE POSTING, REDIRECT
                        window.location.href = "conferenceRoom.php";
                    });
                    // prevent the default submit action to happen?
                    event.preventDefault();
                }
                else {
                    //console.log("sfsdfs");
                    //console.log($("#errorRoomName").css("display"));
                    //console.log(cname.length);
                    if (cname == "" || cname.length <= 4) {
                        $("#errorRoomName").css("display", "inline");
                    }
                    else {
                        $("#errorRoomName").css("display", "none");
                    }
                    if (validateEmails == "") {
                        $("#errorEmails").css("display", "inline");
                    }
                    else {
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
