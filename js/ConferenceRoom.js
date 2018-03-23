$(document).ready(function () {


    var pk = $("#hiddenPK").text();
    var username = $("#hiddenUserName").text();
    var useremail = $("#hiddenEmail").text();

    var sessionLock = false;

    $('#killSessionBtn').click(function () {

        sessionLock = true;

        $.post("miscFunctionalities.php", {
            primaryKey: pk,
            username: username,
            email: useremail,
            killSession: "kill"
        }).done(function () {
            window.location.href = "index.php";
        });
        event.preventDefault();

    });

    $('#leaveChatBtn').click(function () {

        sessionLock = true;

        $.post("miscFunctionalities.php", {
            primaryKey: pk,
            username: username,
            email: useremail,
            leaveChat: "leave"
        }).done(function () {
            window.location.href = "index.php";
        });
        event.preventDefault();

    });

    window.onbeforeunload = function (e) {
        sessionLock = true;
        //$("#killSessionBtn").click();
        $("#leaveChatBtn").click();
    };


    $("#submitmsg").click(function(){

        var clientmsg = $("#usermsg").val();
        //clientmsg = clientmsg.replace('<','&lt;');
        //clientmsg = clientmsg.replace('>','&gt;');

        if(clientmsg != "") {

            $.post("miscFunctionalities.php", {
                addMessage: pk,
                username: username,
                message: clientmsg
            });

            $("#usermsg").val("");

        }
        return false;
    });


    $("#submitfile").click(function(){

        //var selectedFile = document.getElementById('inputFileNew').files[0];

        if($("#inputFileNew").val() != "") {

            $("#waitUploadText").css("display", "inline");
            $("#uploadFormWrapper").css("display", "none");


            var file_data = $("#inputFileNew").prop("files")[0];
            var form_data = new FormData();
            form_data.append("userfile", file_data);
            form_data.append("pKey", pk);
            form_data.append("uName", username);

            //alert(form_data);

            $.ajax({
                url: "/uploadedFile.php",
                dataType: 'script',
                cache: false,
                contentType: false,
                processData: false,
                data: form_data,
                type: 'post',
                complete: function () {
                    //alert("done");
                    $("#inputFileNew").val("");
                    $("#waitUploadText").css("display", "none");
                    $("#uploadFormWrapper").css("display", "inline");
                }
            });

        }else {
            alert("empty!");
        }

    });



    function loadLog(){

        var oldscrollHeight = $("#chatbox").get(0).scrollHeight - 20; //Scroll height before the request

        $.post("miscFunctionalities.php", {
            getChatData: pk
        }, function (data) {
            $("#chatbox").html(data);

            //Auto-scroll
            var newscrollHeight = $("#chatbox").get(0).scrollHeight - 20; //Scroll height after the request
            if(newscrollHeight > oldscrollHeight){
                $("#chatbox").animate({ scrollTop: newscrollHeight }, 'normal'); //Autoscroll to bottom of div
            }

        });

    }

    function loadUsers(){

        $.post("miscFunctionalities.php", {
            getOnlineUsers: pk
        }, function (data) {
            $("#emailList").html(data);
        });

    }


    function letServerKnowHere(){

        if(sessionLock == false) {
            $.post("miscFunctionalities.php", {
                primaryKey: pk,
                username: username,
                email: useremail,
                letServerKnowHere: "here"
            });
        }

    }


    setInterval(letServerKnowHere, 1667);

    setInterval(loadUsers, 1091);
    setInterval(loadLog, 977);
    var newscrollHeight = $("#chatbox").get(0).scrollHeight - 20;
    $("#chatbox").animate({ scrollTop: newscrollHeight }, 'normal');


});