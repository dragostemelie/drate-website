<?php

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods:  POST, OPTIONS');
header('Access-Control-Allow-Headers: Authorization, Content-Type');

$method = $_SERVER['REQUEST_METHOD'];

if ($method == 'OPTIONS') {
  header('Access-Control-Max-Age: 86400'); // preflight request cached for 1 day
  exit;
}

header("Content-Type: application/json; charset=UTF-8");

if ($method == 'POST') {
  require_once 'post.php';
} else {
  http_response_code(405);
  echo json_encode(array("message" => "Not allowed."));
}
