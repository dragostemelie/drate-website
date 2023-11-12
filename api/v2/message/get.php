<?php

require_once '../../../config/db.php';
require_once '../../../helpers/functions.php';
require_once '../../../models/Message.php';

// Check user login
$isLoggedIn = checkToken();
if (!$isLoggedIn) {
  http_response_code(401);
  echo json_encode(array("message" => "Unauthorized"));
  exit;
}

try {
  $message = new Message($pdo);

  $messages = [];
  $data = $message->getAll();

  if (is_array($data)) {
    $messages = $data;
  }


  http_response_code(200);
  echo json_encode($messages);
} catch (PDOException $e) {
  http_response_code(500);
  echo json_encode(array("message" => "Unable to get messages: " . $e->getMessage()));
}
