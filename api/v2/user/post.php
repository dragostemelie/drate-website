<?php

require_once '../../../config/db.php';
require_once '../../../helpers/functions.php';
require_once '../../../models/User.php';


$required = array(
  "avatar",
  "guid",
  "displayName"
);

$data = sanitizeData($required);
if (!is_array($data)) {
  http_response_code(400);
  echo json_encode(array("message" => "Missing required field: " . $data));
  exit;
}

try {
  $user = new User($pdo);
  $response = $user->getByGuid($data['guid']);
  if (!$response) {
    $data['uuid'] = uniqid("tech-");
    $response = $user->create($data);
  }

  http_response_code(200);
  echo json_encode($response);
} catch (PDOException $e) {
  http_response_code(500);
  echo json_encode(array("message" => "Unable to update comment: " . $e->getMessage()));
}
