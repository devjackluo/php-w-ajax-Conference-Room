<?php
ob_start();
session_start();

?>

<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <!-- The above 3 meta tags *must* come first in the head; any other head content must come *after* these tags -->
    <title>Cheese Conferencing</title>

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
    <!-- Main container for website -->
    <div class="container">
      <!-- Website Heading -->
      <h1 id="title_header" class="text-center">Cheese Professional Conferencing Services</h1>
      <h2 id="logo" class="text-center">An &copy;Artificial-Ignorance Service</h2>

      <!-- Form container -->
      <div id="main_form" class="well">

        <form id="submitForm">

          <!-- Conference Name form Group -->
          <div class="form-group">
            <label class="control-label" for="conferenceName" >Step 1:</label>
            <input type="text" class="form-control" placeholder="Conference Name" id="conferenceName" />
              <label style="color: red; display: none;" id="errorRoomName" >Please enter valid conference name. (5 or more characters)</label>
          </div>

            <!-- Admin Name form Group -->
            <div class="form-group">
                <label class="control-label" for="adminName" >Step 2:</label>
                <input type="text" class="form-control" placeholder="Your Name" id="adminName" />
                <label style="color: red; display: none;" id="errorAdminName" >Please enter your name.</label>
            </div>


            <!-- Admin Email form Group -->
            <div class="form-group">
                <label class="control-label" for="adminEmail" >Step 3:</label>
                <input type="text" class="form-control" placeholder="Your Email" id="adminEmail" />
                <label style="color: red; display: none;" id="errorAdminEmail" >Please enter your email.</label>
            </div>


          <!-- Time limit Form Group -->
          <div class="form-group">
            <label class="control-label" for="timeLimit">Step 4 (Optional):</label>
            <input class="form-control" type="number" id="timeLimit" placeholder="Conference Length (Hours)" />
          </div>

          <!-- Email list entry form group -->
          <div class="form-group">

            <label class="control-label" for="conferenceInvitees" >Step 5 (new email each line):</label>
            <!-- Brian's field for adding an email attendee -->
            <textarea class="form-control" id="conferenceInvitees" placeholder="Invite Attendees by Email" rows="5"></textarea>
              <label style="color: red; display: none;" id="errorEmails">Please enter at least one valid email.</label>

          </div>

          <!-- Submit and start button form group -->
          <div class="form-group text-center">
            <input id="start_conference_button" name="submit" type="submit" class="btn btn-success" value="Invite Attendees and Start Conference" />
          </div>

        </form>

      <!-- End of Form Container -->
      </div>

    <!-- End of Main Container -->
    </div>

    <!-- jQuery (necessary for Bootstrap's JavaScript plugins) -->
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.12.4/jquery.min.js"></script>
    <!-- Include all compiled plugins (below), or include individual files as needed -->
    <script src="libs/bootstrap-3.3.7/js/bootstrap.min.js"></script>
	<script src="js/Index.js"></script>
  </body>
</html>


<?php

// redirect back to conference room if they have a key
if (isset($_SESSION["primaryKey"])) {
    header("Location: /conferenceRoom.php");
    exit();
}

?>