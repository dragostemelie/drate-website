<?php

require_once '../../../config/db.php';
require_once '../../../helpers/functions.php';
require_once '../../../models/User.php';


$required = array(
  "guid",
  "avatar",
  "displayName"
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
  $user = new User($pdo);
  $response = $user->update($data);

  http_response_code(200);
  echo json_encode($response);
} catch (PDOException $e) {
  http_response_code(500);
  echo json_encode(array("message" => "Unable to update comment: " . $e->getMessage()));
}
