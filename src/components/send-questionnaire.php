<?php
// Handle preflight OPTIONS request for CORS
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

// Include PHPMailer files directly
require 'PHPMailer.php';
require 'SMTP.php';
require 'Exception.php';

// Only allow POST requests
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405); // Method Not Allowed
    echo json_encode(['status' => 'error', 'message' => 'Method Not Allowed']);
    exit;
}

// Use $_POST to get the data, which is more reliable on shared hosting
$jsonData = $_POST['data'] ?? null;
$data = json_decode($jsonData, true);

if (json_last_error() !== JSON_ERROR_NONE) {
    http_response_code(400);
    echo json_encode(['status' => 'error', 'message' => 'Invalid JSON']);
    exit;
}

$mail = new PHPMailer(true);

try {
    // --- SMTP Configuration ---
    $mail->SMTPDebug = 0; // 0 for production, 2 for debugging
    $mail->isSMTP();
    $mail->Host       = 'smtp.gmail.com'; // e.g., 'smtp.gmail.com'
    $mail->SMTPAuth   = true;
    $mail->Username   = 'abdullah.qamar137@gmail.com'; // Your Gmail address
    $mail->Password   = 'klwj zlcc kref osrm';    // Your Gmail App Password
    $mail->SMTPSecure = PHPMailer::ENCRYPTION_SMTPS;
    $mail->Port       = 465;

    // This is important for local development environments
    $mail->SMTPOptions = array(
        'ssl' => array(
            'verify_peer' => false,
            'verify_peer_name' => false,
            'allow_self_signed' => true
        )
    );

    // --- Recipients ---
    // The email address you want to send TO.
    $recipientEmail = 'abdullah.qamar137@gmail.com'; 
    // The name and email that will appear as the SENDER.
    $senderName = isset($data['Name (filled by)']) ? $data['Name (filled by)'] : 'Your Love';
    $senderEmail = 'birthday-wish@special.com'; // Can be a no-reply address

    $mail->setFrom($senderEmail, $senderName);
    $mail->addAddress($recipientEmail);
    $mail->addReplyTo($data['Email (filled by)'] ?? $senderEmail, $senderName);

    // --- Email Content ---
    $mail->isHTML(true);
    $mail->Subject = '💖 Heartfelt Responses from Your Love! 💖';

    // --- Build HTML Body ---
    $body = "<html><head><style>
                body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
                h1 { color: #d63384; }
                h2 { color: #e83e8c; border-bottom: 1px solid #f06595; padding-bottom: 5px; margin-top: 20px;}
                p { margin: 5px 0 10px 15px; }
                strong { color: #c2185b; }
             </style></head><body>";
    $body .= "<h1>💖 A Love-filled Form Submission! 💖</h1>";
    $body .= "<p>My dearest, here are the beautiful feelings from your special someone:</p>";

    if (isset($data['Name (filled by)'])) {
        $body .= "<p><strong>Filled by:</strong> " . htmlspecialchars($data['Name (filled by)']) . "</p>";
    }
    if (isset($data['Email (filled by)'])) {
        $body .= "<p><strong>Email:</strong> " . htmlspecialchars($data['Email (filled by)']) . "</p>";
    }

    // Loop through questionnaire sections
    $sections = ['Shared Experiences', 'Her Wishes', 'My Shortcomings'];
    foreach ($sections as $section) {
        if (isset($data[$section]) && is_array($data[$section])) {
            $body .= "<h2>" . htmlspecialchars($section) . "</h2>";
            foreach ($data[$section] as $question => $answer) {
                if (!empty($answer)) {
                    $body .= "<p><strong>" . htmlspecialchars($question) . "</strong><br>" . nl2br(htmlspecialchars($answer)) . "</p>";
                }
            }
        }
    }

    // --- Attachments (Captured Memories & Secret Video) ---
    $attachmentSections = ['Captured Memories', 'Secretly Recorded Video'];
    foreach ($attachmentSections as $sectionName) {
        if (isset($data[$sectionName]) && is_array($data[$sectionName])) {
            foreach ($data[$sectionName] as $index => $media) {
                if (isset($media['content']) && isset($media['name'])) {
                    // Extract base64 content
                    $base64Content = substr($media['content'], strpos($media['content'], ',') + 1);
                    $decodedContent = base64_decode($base64Content);
                    if ($decodedContent) {
                        // Add as a string attachment
                        $mail->addStringAttachment($decodedContent, $media['name'], 'base64', $media['type']);
                    }
                }
            }
        }
    }

    $body .= "</body></html>";
    $mail->Body = $body;

    $mail->send();
    echo json_encode(['status' => 'success', 'message' => 'Email sent successfully']);

} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(['status' => 'error', 'message' => "Message could not be sent. Mailer Error: {$mail->ErrorInfo}"]);
}
?>