<?php

// if the user comes to this page and their url doesn't have a key or they already have one, redirect to index

ob_start();
session_start();

include 'include/functions.php';

$primaryKey = $_GET["primaryKey"];

if (isset($_SESSION["primaryKey"])) {
    header("Location: /conferenceRoom.php");
}

if (empty($primaryKey)) {

    header("Location: /index.php");

}else{

//    // should probably check if it is actually in database.
//    $db = dbConnect();
//    $sql = "SELECT * FROM rooms where roomID='$primaryKey'";
//    $result = $db->query($sql);
//    list($roomID, $roomName, $sessionStart, $sessionEnd, $timeLimit, $expired) = $result->fetch_row();
//
//    if($roomID == null){
//        header("Location: /index.php");
//    }else{
//
//        $email = $_GET["email"];
//
//        //check if email is already online
//
//        $csql = "SELECT * FROM users where roomPK='$primaryKey' AND email='$email' AND online=TRUE ";
//        $cresult = $db->query($csql);
//        list($id, $roompk, $un, $em, $online) = $cresult->fetch_row();
//
//        if($id != null){
//            header("Location: /index.php");
//        }
//
//
//    }

    if(checkIfAvail($primaryKey, $_GET["email"]) == false){
        header("Location: /index.php");
    }

}


ob_clean();

?>


<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <!-- The above 3 meta tags *must* come first in the head; any other head content must come *after* these tags -->
    <title>Cheese Conferencing - Meeting Room</title>

    <!-- Bootstrap -->
    <link href="libs/bootstrap-3.3.7/css/bootstrap.min.css" rel="stylesheet">

    <!--------- CSS ----------->
    <link rel="stylesheet" type="text/css" href="css/SiteStyles.css">
    <link href="https://fonts.googleapis.com/css?family=Great+Vibes" rel="stylesheet">

    <!-- HTML5 shim and Respond.js for IE8 support of HTML5 elements and media queries -->
    <!-- WARNING: Respond.js doesn't work if you view the page via file:// -->
    <!--[if lt IE 9]>
    <script src="https://oss.maxcdn.com/html5shiv/3.7.3/html5shiv.min.js"></script>
    <script src="https://oss.maxcdn.com/respond/1.4.2/respond.min.js"></script>
    <![endif]-->
</head>

<body>
<!-- CREATE FANCY FORM INPUT AND BUTTON -->
<div id="conference_room_form" class="well">
    <form id="newUserForm">

        <p id="hiddenPKNew" style="display: none"><?php echo $_GET["primaryKey"] ?></p>
        <p id="hiddenEmailNew" style="display: none"><?php echo $_GET["email"] ?></p>

        <div class="form-group">
            <label class="control-label">Please enter a name:</label>
            <input type="text" class="form-control" placeholder="Fancy Input" id="newUserName"/>
            <label style="color: red; display: none;" id="errorNewUserName" >Please enter valid name.</label>
        </div>
        <div class="form-group text-center">
            <input name="submit" type="submit" class="btn btn-primary" id="newUser_button" value="Submit"/>
        </div>
    </form>
    <!-- End of Form Container -->
</div>

<!-- jQuery (necessary for Bootstrap's JavaScript plugins) -->
<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.12.4/jquery.min.js"></script>
<!-- Include all compiled plugins (below), or include individual files as needed -->
<script src="libs/bootstrap-3.3.7/js/bootstrap.min.js"></script>
<script src="js/newUser.js"></script>
</body>
</html>
