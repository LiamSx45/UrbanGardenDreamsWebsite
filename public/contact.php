<?php
if($_POST['number'] != '') {
    die('Sorry, we don\'t like spammers here!');
} else {

//*************** Spam Test *******************
//***********************************************

// Blank message to start with so we can append to it.
$message = '';

// Check that name & email aren't empty.
if(empty($_POST['name']) || empty($_POST['email'])){
    die('Please ensure name and email are provided.');
}


	//Sanitize input data using PHP filter_var().
	$user_Name        = filter_var($_POST['name'], FILTER_SANITIZE_STRING);
	$user_Email       = filter_var($_POST['email'], FILTER_SANITIZE_EMAIL);
	$user_Message     = filter_var($_POST['text'], FILTER_SANITIZE_STRING);

// Construct the message
$message .= <<<TEXT
    Name: {$user_Name}
    Email: {$user_Email}
    Text: {$user_Message }
TEXT;

// Email to send to
$to = 'support@bestlooker.pro';

// Email Subject
$subject = 'You have been contacted!';

// Name to show email from
$from = 'Your Site';

// Domain to show the email from
$fromEmail = 'YourSite@domain.com';

// Construct a header to send who the email is from
$header = 'From: ' . $from . '<' . $fromEmail . '>';

// Try sending the email
if(!mail($to, $subject, $message, $header)){
    die('Error sending email.');
}else{
    die('Your email has been sent successfully!');
}


//*************** Spam Test *******************
//***********************************************
	
}
?>