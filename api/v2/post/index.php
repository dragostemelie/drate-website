<?php

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, GET, OPTIONS');
header('Access-Control-Allow-Headers: Authorization, Content-Type');

$method = $_SERVER['REQUEST_METHOD'];

if ($method == 'OPTIONS') {
  header('Access-Control-Max-Age: 86400');
  http_response_code(200);
  exit;
}

header("Content-Type: application/json; charset=UTF-8");
if ($method == 'GET') {
  require_once 'get.php';
} elseif ($method == 'POST') {
  require_once 'post.php';
} else {
  http_response_code(405);
  echo json_encode(array("message" => "Not allowed."));
}
