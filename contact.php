<?php
declare(strict_types=1);
header('Content-Type: application/json; charset=utf-8');
header('X-Content-Type-Options: nosniff');

function respond(int $status, bool $ok, string $message): never {
    http_response_code($status);
    echo json_encode(['ok' => $ok, 'message' => $message], JSON_UNESCAPED_SLASHES);
    exit;
}

if (($_SERVER['REQUEST_METHOD'] ?? '') !== 'POST') {
    respond(405, false, 'Method not allowed.');
}

if (trim((string)($_POST['company_url'] ?? '')) !== '') {
    respond(200, true, 'Thanks.');
}

$ip = (string)($_SERVER['REMOTE_ADDR'] ?? 'unknown');
$rateFile = sys_get_temp_dir() . '/madecurrent_' . hash('sha256', $ip);
if (is_file($rateFile) && (time() - (int)@filemtime($rateFile)) < 45) {
    respond(429, false, 'Please wait a moment before submitting again.');
}
@touch($rateFile);

$name = trim((string)($_POST['name'] ?? ''));
$business = trim((string)($_POST['business'] ?? ''));
$website = trim((string)($_POST['website'] ?? ''));
$email = trim((string)($_POST['email'] ?? ''));
$package = trim((string)($_POST['package'] ?? 'Not sure yet'));
$message = trim((string)($_POST['message'] ?? ''));
$consent = (string)($_POST['consent'] ?? '');

if ($name === '' || mb_strlen($name) > 100 || $business === '' || mb_strlen($business) > 150) {
    respond(422, false, 'Please enter your name and business name.');
}
if (!filter_var($email, FILTER_VALIDATE_EMAIL) || mb_strlen($email) > 180) {
    respond(422, false, 'Please enter a valid email address.');
}
if (!filter_var($website, FILTER_VALIDATE_URL) || !in_array(strtolower((string)parse_url($website, PHP_URL_SCHEME)), ['http', 'https'], true)) {
    respond(422, false, 'Please enter a valid website address including https://.');
}
if ($message === '' || mb_strlen($message) > 3000) {
    respond(422, false, 'Please tell us what the website should do better.');
}
if ($consent !== 'yes') {
    respond(422, false, 'Consent is required so we can respond.');
}

$allowedPackages = ['Not sure yet', 'Current One — £495', 'Current Business — £895', 'Current Growth — £1,495+'];
if (!in_array($package, $allowedPackages, true)) $package = 'Not sure yet';

$cleanSubjectBusiness = preg_replace('/[\r\n]+/', ' ', $business) ?: 'Website enquiry';
$subject = 'Made Current redesign request — ' . mb_substr($cleanSubjectBusiness, 0, 100);
$body = "New Made Current redesign request\n\n"
      . "Name: {$name}\n"
      . "Business: {$business}\n"
      . "Website: {$website}\n"
      . "Email: {$email}\n"
      . "Package: {$package}\n\n"
      . "What should improve:\n{$message}\n\n"
      . "Submitted: " . gmdate('Y-m-d H:i:s') . " UTC\n";

$headers = [
    'From: Made Current Website <dave@madecurrent.co.uk>',
    'Reply-To: ' . $email,
    'MIME-Version: 1.0',
    'Content-Type: text/plain; charset=UTF-8',
    'X-Mailer: Made Current Website'
];

$sent = @mail('dave@madecurrent.co.uk', $subject, $body, implode("\r\n", $headers));
if (!$sent) {
    error_log('Made Current enquiry mail() failed for ' . $business);
    respond(500, false, 'The message could not be sent. Please email dave@madecurrent.co.uk.');
}
respond(200, true, 'Request received.');
