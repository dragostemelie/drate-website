<?php

require_once '../../../config/db.php';
require_once '../../../helpers/functions.php';
require_once '../../../models/Message.php';

$required = array(
  "guid",
  "author",
  "message"
);

$data = sanitizeData($required);
if (!is_array($data)) {
  http_response_code(400);
  echo json_encode(array("message" => "Missing required field: " . $data));
  exit;
}

try {
  $uuid = getUserUuid($pdo, $data['guid']);
  if (!$uuid) {
    http_response_code(404);
    echo json_encode(array("message" => "User not found."));
    exit;
  }

  $data['uuid'] = $uuid;
  $message = new Message($pdo);
  $newMessage = $message->create($data);

  http_response_code(201);
  echo json_encode($newMessage);
} catch (PDOException $e) {
  http_response_code(500);
  echo json_encode(array("message" => "Unable to send message: " . $e->getMessage()));
}
