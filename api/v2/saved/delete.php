<?php

require_once '../../../config/db.php';
require_once '../../../helpers/functions.php';
require_once '../../../models/Saved.php';

$required = array(
  "guid",
  "post"
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
  $saved = new Saved($pdo);
  $saved->delete($data);

  http_response_code(200);
  echo json_encode(array("message" => "Post removed form saved list."));
} catch (PDOException $e) {
  http_response_code(500);
  echo json_encode(array("message" => "Unable to remove post: " . $e->getMessage()));
}
