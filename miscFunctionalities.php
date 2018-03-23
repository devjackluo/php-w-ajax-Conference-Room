<?php

// this page is for being able to kill the cookie/session
// it is now used as somewhat like an api
include 'include/functions.php';


if ($_POST["killSession"]) {

    session_start();

    $db = dbConnect();
    $primaryKey = mysqli_real_escape_string($db, $_POST["primaryKey"]);
    $username = mysqli_real_escape_string($db, $_POST["username"]);
    $email = mysqli_real_escape_string($db, $_POST["email"]);

    $sql = "update users set online=FALSE where roomPK='$primaryKey' AND username='$username' AND email='$email'";
    $result = $db->query($sql);

    session_destroy();
    ob_clean();
    ob_end_flush();
}

if ($_POST["leaveChat"]) {

    session_start();
    $_SESSION["online"] = false;

    $db = dbConnect();
    $primaryKey = mysqli_real_escape_string($db, $_POST["primaryKey"]);
    $username = mysqli_real_escape_string($db, $_POST["username"]);
    $email = mysqli_real_escape_string($db, $_POST["email"]);

    $sql = "update users set online=FALSE where roomPK='$primaryKey' AND username='$username' AND email='$email'";
    $result = $db->query($sql);


    ob_clean();
    ob_end_flush();
}


if ($_POST["letServerKnowHere"]) {

    session_start();

    if($_SESSION["online"] == false) {

        $db = dbConnect();

        $primaryKey = mysqli_real_escape_string($db, $_POST["primaryKey"]);
        $username = mysqli_real_escape_string($db, $_POST["username"]);
        $email = mysqli_real_escape_string($db, $_POST["email"]);

        $sql = "update users set online=TRUE where roomPK='$primaryKey' AND username='$username' AND email='$email'";
        $result = $db->query($sql);

//        $_SESSION["primaryKey"] = $primaryKey;
//        $_SESSION['userName'] = $username;
//        $_SESSION["email"] = $email;
        $_SESSION["online"] = true;

    }

    ob_clean();
    ob_end_flush();

}


if ($_POST["addUserName"]) {

    session_start();
    $_SESSION['userName'] = $_POST["addUserName"];

    $db = dbConnect();

    $primaryKey = mysqli_real_escape_string($db, $_POST["primaryKey"]);
    $uname = mysqli_real_escape_string($db, $_POST["addUserName"]);
    $uemail = mysqli_real_escape_string($db, $_POST["email"]);

    $usql = "INSERT into users (Id,roomPK,username,email,online)
            VALUES (null, \"$primaryKey\", \"$uname\", \"$uemail\", TRUE)";
    $uresult = $db->query($usql);

    $_SESSION["primaryKey"] = $primaryKey;
    $_SESSION["email"] = $uemail;
    $_SESSION["online"] = true;

}

if ($_POST["addMessage"]) {

    $db = dbConnect();

    $primaryKey = mysqli_real_escape_string($db, $_POST["addMessage"]);
    $username = mysqli_real_escape_string($db, $_POST["username"]);
    $message = mysqli_real_escape_string($db, $_POST["message"]);

    $psql = "SELECT * FROM chatlog where roomID='$primaryKey'";
    $presult = $db->query($psql);

    list($roomID, $chatHistory) = $presult->fetch_row();

    $newChatHistory = $chatHistory . "<div><b>" . $username . "</b>: " . htmlspecialchars($message) . "</div>";

    $sql = "update chatlog set chatHistory=\"$newChatHistory\" where roomID='$primaryKey'";
    $result = $db->query($sql);

}


if ($_POST["getChatData"]) {

    $db = dbConnect();

    $primaryKey = mysqli_real_escape_string($db, $_POST["getChatData"]);

    $sql = "SELECT * FROM chatlog where roomID='$primaryKey'";
    $result = $db->query($sql);

    list($roomID, $chatHistory) = $result->fetch_row();


    echo "<div>";
    echo "$chatHistory";
    echo "</div>";


}


if ($_POST["getOnlineUsers"]) {

    $db = dbConnect();

    $primaryKey = mysqli_real_escape_string($db, $_POST["getOnlineUsers"]);

    $sql = "SELECT * FROM users where roomPK='$primaryKey' AND online=TRUE";
    $result = $db->query($sql);

    echo "<h4>Online Members:</h4>";
    while (list($Id, $roompk, $username, $email, $online) = $result->fetch_row()){

        echo "<li class=\"flex-item\">". $username . "</li>";

    }

}

