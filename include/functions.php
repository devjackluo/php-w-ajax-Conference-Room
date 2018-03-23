<?php

// Reports all errors
error_reporting(E_ALL);
// Do not display errors for the end-users (security issue)
ini_set('display_errors', 'Off');
// Set a logging file
ini_set('error_log', 'cheese.log');


// Override the default error handler behavior
set_exception_handler(function ($exception) {
    error_log($exception);
    error_page("Something went wrong!");
});


function dbConnect()
{
    $db = new mysqli('mysqldev.caseyjohnson1989.com', 'cjohnsonsql', 'yoMomma6969', 'php_agiledev_scc');
    //$db = new mysqli('mysqldev.dennissauve.com', 'aigroup', 'ignorance', 'agiledev');

    if ($db->connect_errno) {
        echo "Failed to connect to Database: (" . $db->connect_errno . ")" . $db->connect_error;
    }
    return $db;
}

function sendMail($emails, $primaryKey)
{

    $db = dbConnect();

    $sql = "SELECT * FROM rooms where roomID='$primaryKey'";
    $result = $db->query($sql);

    list($roomID, $roomName,
        $sessionStart,
        $sessionEnd,
        $timeLimit,
        $expired) = $result->fetch_row();



    foreach ($emails as $vemail) {

        $linkforUser = "jack.caseyjohnson1989.com/newuser.php?primaryKey=" . $primaryKey . "&email=" . $vemail;

        $subject = 'You been invited to a meeting';
        $headers = "From: aigroup@ignorance.com " . "\r\n";
        $headers .= "Reply-To: aigroup@ignorance.com ". "\r\n";
        $headers .= "CC: aigroup@ignorance.com\r\n";
        $headers .= "MIME-Version: 1.0\r\n";
        $headers .= "Content-Type: text/html; charset=ISO-8859-1\r\n";

        $message = '<html><body>';

        $message .= <<<MESSAGE

<form style=" border: 1px solid black; text-align: center; margin: 50px auto; width: 50%; background-color: #d4d4d6;">
  <div style="background-color: #18188e; height: 60px; border: 2px solid #000;">
    <h3 style="margin-top: 0; color: #0069cc; font-family: 'Pacifico', cursive; font-size: 26px; text-shadow: -1px -1px 0 #02e9ff, 1px -1px 0 #02e9ff, -1px -1px 0 #02e9ff, 1px 1px 0 #02e9ff;">You have been invited to a &copy;Cheese meeting room</h3>
  </div>
  <div>
    <h1 style="color: #042c99;">$roomName</h1>
    <hr/>
  </div>
  <div style="margin: 20px auto;">
    <a href="$linkforUser" style="color: #bc0000; font-size: 20px;">Join the Meeting!</a>
  </div>
  <hr>
  <div style="color: #2f7efc; margin-bottom: 20px;">
    <span>&copy;Artificial-Ignorance</span> | <span>1-800-555-3385</span> | <span>Company Email</span> |
    <span>Company Website</span>
  </div>
</form>

MESSAGE;

        $message .= '</body></html>';

        mail($vemail, $subject, $message, $headers);

    }

}


function logError($level, $message)
{
    $file = __FILE__;

    $log = "[ $file ] [$level] $message";
    error_log($log);
}

function RandomString()
{
    $characters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    $randstring = '';
    for ($i = 0; $i < 20; $i++) {
        $randCharacter = rand(0, strlen($characters));
        $randstring = $randstring . $characters[$randCharacter];
    }
    return $randstring;
}


function checkIfAvail($primaryKey, $email){


    $db = dbConnect();
    $sql = "SELECT * FROM rooms where roomID='$primaryKey'";
    $result = $db->query($sql);
    list($roomID, $roomName, $sessionStart, $sessionEnd, $timeLimit, $expired) = $result->fetch_row();

    if($roomID == null || $expired == true){
        return false;
    }else{

        $csql = "SELECT * FROM users where roomPK='$primaryKey' AND email='$email' AND online=TRUE ";
        $cresult = $db->query($csql);
        list($id, $roompk, $un, $em, $online) = $cresult->fetch_row();

        if($id != null){
            return false;
        }

    }

    return true;

}


?>
