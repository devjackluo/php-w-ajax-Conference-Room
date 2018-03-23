<?php


include 'include/functions.php';
logError("E_NOTICE", "upload.php reached!");
//logError("E_NOTICE", print_r($_FILES['files']["name"]) . " <- file");
//logError("E_NOTICE", print_r($_FILES['files']) . " <- file");


// In PHP versions earlier than 4.1.0, $HTTP_POST_FILES should be used instead
// of $_FILES.

//logError("E_NOTICE",  $_FILES['userfile']['tmp_name']);
//logError("E_NOTICE",  $_FILES['userfile']['name']);
//logError("E_NOTICE", print_r($_FILES['userfile']));

//print_r($_FILES['userfile']);
////echo $_FILES['userfile']['tmp_name'];
////echo $_FILES['userfile']['name'];
///
if (!file_exists('file_sharing/' . $_POST["pKey"])) {
    mkdir('file_sharing/' . $_POST["pKey"], 0777, true);
}

$uploaded_file_name = $_FILES['userfile']['tmp_name'];
move_uploaded_file($uploaded_file_name, "file_sharing/" . $_POST["pKey"] . "/" . $_FILES["userfile"]["name"]);



// add download link to chat

$db = dbConnect();

$primaryKey = mysqli_real_escape_string($db, $_POST["pKey"]);
$username = mysqli_real_escape_string($db, $_POST["uName"]);
$message = "has uploaded a file! -- <a href='file_sharing/" . $_POST['pKey'] . "/" . $_FILES['userfile']['name'] . "' download>" . $_FILES['userfile']['name'] . "</a>";

$psql = "SELECT * FROM chatlog where roomID='$primaryKey'";
$presult = $db->query($psql);

list($roomID, $chatHistory) = $presult->fetch_row();

$newChatHistory = $chatHistory . "<div><b>" . $username . "</b>: " . $message . "</div>";

$sql = "update chatlog set chatHistory=\"$newChatHistory\" where roomID='$primaryKey'";
$result = $db->query($sql);


header("Location: conferenceRoom.php");
die();


?>