<?php

require_once '../../../config/db.php';
require_once '../../../helpers/functions.php';
require_once '../../../models/Like.php';

// Validate and sanitize the request data
$body = json_decode(file_get_contents('php://input'), true);
$required = array(
  "guid",
  "post",
  "comment"
);
foreach ($required as $key) {
  if (isset($body[$key])) {
    $data[$key] = htmlspecialchars($body[$key]);
  } else {
    http_response_code(400);
    echo json_encode(array("message" => "Missing required field: " . $key));
    exit;
  }
}

try {
  $uuid = getUserUuid($pdo, $data['guid']);
  if (!$uuid) {
    http_response_code(404);
    echo json_encode(array("message" => "User not found."));
    exit;
  }

  $data['user'] = $uuid;
  $like = new Like($pdo);
  $like->delete($data);

  http_response_code(200);
  echo json_encode(array("message" => "Removed like."));
} catch (PDOException $e) {
  http_response_code(500);
  echo json_encode(array("message" => "Unable to add like: " . $e->getMessage()));
}
