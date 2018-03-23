<?php

ob_start();
session_start();

include 'include/functions.php';

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
    <link rel="stylesheet" type="text/css" href="css/conferenceRoom.css">
    <link href="https://fonts.googleapis.com/css?family=Great+Vibes" rel="stylesheet">

    <!-- HTML5 shim and Respond.js for IE8 support of HTML5 elements and media queries -->
    <!-- WARNING: Respond.js doesn't work if you view the page via file:// -->
    <!--[if lt IE 9]>
    <script src="https://oss.maxcdn.com/html5shiv/3.7.3/html5shiv.min.js"></script>
    <script src="https://oss.maxcdn.com/respond/1.4.2/respond.min.js"></script>
    <![endif]-->
</head>

<body>
<!-- Main container for website -->
<div class="container">
    <!-- Website Heading -->
    <h1 id="title_header" class="text-center">Cheese Professional Conferencing Services</h1>
    <h2 id="logo" class="text-center">An &copy;Artificial-Ignorance Service</h2>

    <!-- CREATE FANCY FORM INPUT AND BUTTON -->
    <div id="conference_room_form" class="well container-fluid">

        <h1 style="display: none" id="waitUploadText">UPLOADING, PLEASE WAIT BEFORE CLOSING!</h1>

        <div id="topSection">

            <div id="members">
                <ul class="hidden-sm hidden-xs" id="emailList">

                </ul>
            </div>


            <div id="wrapper">


                <div id="menu">
                    <p class="welcome">Welcome, <b><?php echo $_SESSION['userName']; ?></b></p>
                    <div style="clear:both"></div>
                </div>

                <div id="chatbox">

                </div>

                <form name="message" action="" id="messageForm">
                    <input name="usermsg" type="text" id="usermsg" size="63" placeholder="Message"/><br>
                    <input name="submitmsg" type="submit" id="submitmsg" value="Send" class="btn btn-primary"/>
                </form>

            </div>

        </div>

        <br>

        <div id="uploadFormWrapper">

            <h3>This is javascript version.</h3>

            <div id="file_upload_form">
                <div class="form-group">
                    <label for="inputFile">File input</label>
                    <input type="file" id="inputFileNew">
                </div>
                <button id="submitfile" class="btn btn-primary">Submit</button>
            </div>

            <br>

            <h3>This is php version. the php version seems buggy</h3>

            <div>
                <form enctype="multipart/form-data" action="uploadedFile.php" method="post" id="file_upload_form">
                    <div class="form-group">
                        <label for="inputFile">File input</label>
                        <input type="file" id="inputFile" name="userfile">
                    </div>

                    <input style="display: none" name="pKey" value="<?php echo $_SESSION["primaryKey"] ?>">
                    <input style="display: none" name="uName" value="<?php echo $_SESSION["userName"] ?>">

                    <button id="submitfile" type="submit" class="btn btn-primary">Submit</button>
                </form>
            </div>
            <!-- End of Form Container -->
        </div>


        <input class="btn btn-danger" name="killSession" value="kill session" id="killSessionBtn"/>
        <input style="display: none" class="btn btn-danger" name="leaveChat" value="leave Chat" id="leaveChatBtn"/>

    </div>


    <!-- End of Main Container -->
</div>


<p id="hiddenPK" style="display: none"><?php echo $_SESSION["primaryKey"] ?></p>
<p id="hiddenUserName" style="display: none"><?php echo $_SESSION["userName"] ?></p>
<p id="hiddenEmail" style="display: none"><?php echo $_SESSION["email"] ?></p>


<!-- jQuery (necessary for Bootstrap's JavaScript plugins) -->
<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.12.4/jquery.min.js"></script>
<!-- Include all compiled plugins (below), or include individual files as needed -->
<script src="libs/bootstrap-3.3.7/js/bootstrap.min.js"></script>
<script src="js/ConferenceRoom.js"></script>
</body>
</html>


<?php


// redirect back to index if they don't have a key

if (!isset($_SESSION["primaryKey"])) {
    session_destroy();
    header("Location: /index.php");
    exit();
} else {

    $primaryKey = $_SESSION["primaryKey"];

    $db = dbConnect();
    $sql = "SELECT * FROM rooms where roomID='$primaryKey'";
    $result = $db->query($sql);
    list($roomID, $roomName, $sessionStart, $sessionEnd, $timeLimit, $expired) = $result->fetch_row();

    if ($roomID == null) {

        session_destroy();
        header("Location: /index.php");
        exit();

    } else {

        if ($expired == true) {
            session_destroy();
            header("Location: /index.php");
            exit();
        }

    }


}

?>
