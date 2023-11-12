<?php


$method = $_SERVER['REQUEST_METHOD'];
$body =  file_get_contents('php://input');

// Validate the request params
$params = json_decode($body);
$required = array(
  "prompt",
  "n",
  "size"
);
foreach ($required as $key) {
  if (!isset($params->$key)) {
    http_response_code(400);
    echo json_encode(array("message" => "Missing required field: " . $key));
    exit;
  }
}

// Set the OPEN AI URL
$url = 'https://api.openai.com/v1/images/generations';

// Set the headers
$headers = array(
  "Content-Type: application/json",
  "User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/111.0.0.0 Safari/537.36",
  "Accept: */*",
  "Accept-Encoding: gzip, deflate, br",
  "Authorization: Bearer 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"
);

// Create a new cURL resource
$ch = curl_init();

// Set the URL and other options for the new request
curl_setopt($ch, CURLOPT_URL, $url);
curl_setopt($ch, CURLOPT_CUSTOMREQUEST, $method);
curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);
curl_setopt($ch, CURLOPT_POSTFIELDS, $body);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_ENCODING, '');

curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, false);

// Send the new request and get the response
set_time_limit(60);
$response = curl_exec($ch);

// Check for cURL errors
if (curl_errno($ch)) {
  http_response_code(500);
  echo json_encode(array("message" => "Server is overloaded."));
  exit();
}

// Get the response status code
$status_code = curl_getinfo($ch, CURLINFO_HTTP_CODE);

// Check if the response is gzipped
$headers = curl_getinfo($ch);
if (isset($headers['content_encoding']) && strtolower($headers['content_encoding']) === 'gzip') {
  // Decode the gzipped response
  $response = gzdecode($response);
}
// Close cURL resource and free up system resources
curl_close($ch);

http_response_code($status_code);
echo $response;
