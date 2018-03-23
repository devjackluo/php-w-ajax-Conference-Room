<?php

ob_start();

include 'include/functions.php';

logError("E_NOTICE", "postRoomData.php reached!");


$noErrors = true;

// check for submitted form
$submit = $_POST["submit"];
logError("E_NOTICE", "submit: $submit");

if (empty($submit)) {

    $noErrors = false;

} else {

    // Connect to Database
    $db = dbConnect();

    // Decode JSON
    $roomName = $_POST["roomName"];
    $adminName = $_POST["adminName"];
    $adminEmail = $_POST["adminEmail"];
    $time = $_POST["timeLimit"];
    $emails = $_POST["emails"];
    logError("E_NOTICE", "\nroomName: $roomName\ntime: $time\nemails: $emails");

    // Sanitize input

    // Validate name, length, and email addresses
    // split emails and validate
    $splitEmails = preg_split("/, /", $emails);
    $pattern = '/^(?!(?:(?:\\x22?\\x5C[\\x00-\\x7E]\\x22?)|(?:\\x22?[^\\x5C\\x22]\\x22?)){255,})(?!(?:(?:\\x22?\\x5C[\\x00-\\x7E]\\x22?)|(?:\\x22?[^\\x5C\\x22]\\x22?)){65,}@)(?:(?:[\\x21\\x23-\\x27\\x2A\\x2B\\x2D\\x2F-\\x39\\x3D\\x3F\\x5E-\\x7E]+)|(?:\\x22(?:[\\x01-\\x08\\x0B\\x0C\\x0E-\\x1F\\x21\\x23-\\x5B\\x5D-\\x7F]|(?:\\x5C[\\x00-\\x7F]))*\\x22))(?:\\.(?:(?:[\\x21\\x23-\\x27\\x2A\\x2B\\x2D\\x2F-\\x39\\x3D\\x3F\\x5E-\\x7E]+)|(?:\\x22(?:[\\x01-\\x08\\x0B\\x0C\\x0E-\\x1F\\x21\\x23-\\x5B\\x5D-\\x7F]|(?:\\x5C[\\x00-\\x7F]))*\\x22)))*@(?:(?:(?!.*[^.]{64,})(?:(?:(?:xn--)?[a-z0-9]+(?:-+[a-z0-9]+)*\\.){1,126}){1,}(?:(?:[a-z][a-z0-9]*)|(?:(?:xn--)[a-z0-9]+))(?:-+[a-z0-9]+)*)|(?:\\[(?:(?:IPv6:(?:(?:[a-f0-9]{1,4}(?::[a-f0-9]{1,4}){7})|(?:(?!(?:.*[a-f0-9][:\\]]){7,})(?:[a-f0-9]{1,4}(?::[a-f0-9]{1,4}){0,5})?::(?:[a-f0-9]{1,4}(?::[a-f0-9]{1,4}){0,5})?)))|(?:(?:IPv6:(?:(?:[a-f0-9]{1,4}(?::[a-f0-9]{1,4}){5}:)|(?:(?!(?:.*[a-f0-9]:){5,})(?:[a-f0-9]{1,4}(?::[a-f0-9]{1,4}){0,3})?::(?:[a-f0-9]{1,4}(?::[a-f0-9]{1,4}){0,3}:)?)))?(?:(?:25[0-5])|(?:2[0-4][0-9])|(?:1[0-9]{2})|(?:[1-9]?[0-9]))(?:\\.(?:(?:25[0-5])|(?:2[0-4][0-9])|(?:1[0-9]{2})|(?:[1-9]?[0-9]))){3}))\\]))$/iD';
    $validatedEmails = array();
    foreach ($splitEmails as $email) {
        if (preg_match($pattern, $email) === 1) {
            array_push($validatedEmails, $email);
        }
    }

    if (preg_match($pattern, $_POST["adminEmail"]) === 1) {
        array_push($validatedEmails, $_POST["adminEmail"]);
    }

    //create a primary key to link everyone to this room
    $primaryKey = RandomString();


    // create database room
    $roomID = mysqli_real_escape_string($db, $primaryKey);
    $roomName = mysqli_real_escape_string($db, $_POST['roomName']);

    //$sessionStart = mysqli_real_escape_string($db, date("Y-m-d H:i:s"));

    if ($_POST["timeLimit"]) {

        $timeLimit = mysqli_real_escape_string($db, $_POST["timeLimit"]);

        // need to add $timeLimit to sessionEnd if it is there
        $sessionEnd = mysqli_real_escape_string($db, date("Y-m-d H:i:s"));

    } else {
        $sessionEnd = null;
        $timeLimit = null;
    }


    $expired = mysqli_real_escape_string($db, false);

    if (true) {

        $adminName =  mysqli_real_escape_string($db, $_POST["adminName"]);
        $adminEmail =  mysqli_real_escape_string($db, $_POST["adminEmail"]);


        //insert to db
        $sql = "INSERT into rooms (roomID,roomName,sessionStart,sessionEnd,timeLimit,expired)
            VALUES (\"$roomID\", \"$roomName\", now(),\"$sessionEnd\", \"$timeLimit\", \"$expired\" )";
        logError("E_NOTICE", "\nsql: $sql");
        $result = $db->query($sql);
        logError("E_NOTICE", "\nresult: $result");


        $csql = "INSERT into chatlog (roomID,chatHistory)
            VALUES (\"$roomID\", \"\")";
        $cresult = $db->query($csql);



        //also create user for admin
        $usql = "INSERT into users (Id,roomPK,username,email,online)
            VALUES (null, \"$primaryKey\", \"$adminName\", \"$adminEmail\", TRUE)";
        $uresult = $db->query($usql);


    }


    // also if everything checks out, create session from whatever information we can tie people together.
    //probably only need primary key, can just use that to query $db
    session_start();
    $_SESSION["primaryKey"] = $primaryKey;
    $_SESSION["userName"] = $adminName;
    $_SESSION["email"] = $adminEmail;
    $_SESSION["online"] = true;


    // sent email to everyone at the end
    sendMail($validatedEmails, $primaryKey);

}

// Redirect to conferenceRoom.php


if ($noErrors) {
    //ob_clean();
    //javascript will handle this. this page will only for functionality now.
    //header("Location: /conferenceRoom.php");
    exit;
}