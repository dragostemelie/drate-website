<?php

require_once '../../../config/db.php';
require_once '../../../helpers/functions.php';
require_once '../../../models/Comment.php';

$required = array(
  "guid",
  "post",
  "comment"
);
$optional = array(
  "repliedTo"
);

$data = sanitizeData($required, $optional);
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
  $newComment = $comment->create($data);

  $newComment["post"] = intval($newComment["post"]);

  http_response_code(201);
  echo json_encode($newComment);
} catch (PDOException $e) {
  http_response_code(500);
  echo json_encode(array("message" => "Unable to add like: " . $e->getMessage()));
}
