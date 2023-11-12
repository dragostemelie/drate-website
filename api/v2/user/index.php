<?php

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PUT, OPTIONS');
header('Access-Control-Allow-Headers: Authorization, Content-Type');

$method = $_SERVER['REQUEST_METHOD'];

if ($method == 'OPTIONS') {
  header('Access-Control-Max-Age: 86400'); // preflight request cached for 1 day
  exit;
}

header("Content-Type: application/json; charset=UTF-8");

if ($method == 'GET') {
  require_once 'get.php';
} elseif ($method == 'POST') {
  require_once 'post.php';
} elseif ($method == 'PUT') {
  require_once 'put.php';
} else {
  http_response_code(405);
  echo json_encode(array("message" => "Not allowed."));
}
