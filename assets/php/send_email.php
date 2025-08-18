<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Collect form data
    $name = htmlspecialchars($_POST['demo-name']);
    $email = htmlspecialchars($_POST['demo-email']);
    $telefoon = htmlspecialchars($_POST['demo-telefoon']);
    $message = htmlspecialchars($_POST['demo-message']);

    // Email details
    $to = "jelle.destoop@icloud.com"; // Replace with your email address
    $subject = "New Contact Form Submission";
    $body = "Name: $name\nEmail: $email\nPhone: $telefoon\nMessage:\n$message";
    $headers = "From: $email";

    // Send email
    if (mail($to, $subject, $body, $headers)) {
        echo "Message sent successfully!";
    } else {
        echo "Failed to send message.";
    }
} else {
    echo "Invalid request.";
}
?>