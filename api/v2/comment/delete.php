<?php

require_once '../../../config/db.php';
require_once '../../../helpers/functions.php';
require_once '../../../models/Comment.php';

$required = array(
  "id",
  "guid",
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

  $data['user'] = $uuid;
  $comment = new Comment($pdo);
  $comment->delete($data);

  http_response_code(200);
  echo json_encode(array("message" => "Comment deleted."));
} catch (PDOException $e) {
  http_response_code(500);
  echo json_encode(array("message" => "Unable to add like: " . $e->getMessage()));
}
