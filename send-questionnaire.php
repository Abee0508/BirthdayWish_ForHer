<?php
// DEBUG: Script started
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    echo "DEBUG: OPTIONS request, exiting\n";
    exit();
}
ini_set('display_errors', 1);
error_reporting(E_ALL);
echo "DEBUG: Before PHPMailer require\n";
require 'PHPMailer/src/PHPMailer.php';
require 'PHPMailer/src/SMTP.php';
require 'PHPMailer/src/Exception.php';
echo "DEBUG: After PHPMailer require\n";
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

header('Content-Type: application/json');

echo "DEBUG: Before PHPMailer instantiation\n";
$mail = new PHPMailer(true);
echo "DEBUG: After PHPMailer instantiation\n";

try {
    echo "DEBUG: In try block\n";
    $mail->isSMTP();
    $mail->Host = 'smtp.gmail.com';
    $mail->SMTPAuth = true;
    $mail->Username = 'abdullah.qamar137@gmail.com';
    $mail->Password = 'pgvb qfny uhbb oxit';
    $mail->SMTPSecure = 'tls';
    $mail->Port = 587;
    echo "DEBUG: SMTP config set\n";

    $mail->setFrom('abdullah.qamar137@gmail.com', 'Love Questionnaire');
    $mail->addAddress('shahzadaabdullah137@gmail.com');
    echo "DEBUG: Recipients set\n";

    $mail->isHTML(true);
    $mail->Subject = 'New Love Questionnaire Submission';
    echo "DEBUG: Subject set\n";

    $data = json_decode(file_get_contents('php://input'), true);
    echo "DEBUG: Data loaded: ";
    var_dump($data);

    $body = '<h2>Love Questionnaire Submission</h2>';
    if ($data && is_array($data)) {
        foreach ($data as $section => $answers) {
            $body .= "<h3>" . htmlspecialchars($section) . "</h3>";
            foreach ($answers as $q => $a) {
                $body .= "<b>" . htmlspecialchars($q) . "</b><br>" . nl2br(htmlspecialchars($a)) . "<br><br>";
            }
        }
    } else {
        $body .= '<p>No data received.</p>';
    }
    $mail->Body = $body;
    echo "DEBUG: Body set\n";

    $mail->send();
    echo "DEBUG: Mail sent\n";
    echo json_encode(['success' => true]);
} catch (Exception $e) {
    echo "DEBUG: Exception caught: ".$mail->ErrorInfo."\n";
    echo json_encode(['success' => false, 'error' => $mail->ErrorInfo]);
}