<?php

require_once '../../../config/db.php';
require_once '../../../helpers/functions.php';
require_once '../../../models/Stat.php';

$required = array(
  "guid",
  "url"
);

$data = sanitizeData($required);
if (!is_array($data)) {
  exit;
}

$guid = htmlspecialchars($data['guid']);
$url = htmlspecialchars($data['url']);

if ($_ENV['VITE_ENV'] === 'production') {
  try {
    $stat = new Stat($pdo);
    $data = getUserInfo();

    $data = $stat->create(
      $guid,
      $data['ip'],
      $data['os'],
      $data['browser'],
      $data['country'],
      $url
    );


    http_response_code(200);
    echo json_encode($data);
  } catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(array("message" => "Unable to update stats: " . $e->getMessage()));
  }
} else {
  http_response_code(200);
}
