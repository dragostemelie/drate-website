<?php

require_once '../../../config/db.php';
require_once '../../../helpers/functions.php';
require_once '../../../models/Like.php';

$required = array(
  "guid",
  "post",
  "comment"
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

  $like = new Like($pdo);
  $existing = $like->getByUserUuid($uuid);
  foreach ($existing as $item) {
    if (
      $item['post'] === $data['post'] &&
      $item['comment'] === $data['comment']
    ) {
      http_response_code(200);
      echo json_encode($item);
      exit;
    }
  }

  $data['user'] = $uuid;
  $newLike = $like->create($data);
  $newLike["post"] = intval($newLike["post"]);
  $newLike["comment"] = intval($newLike["comment"]);

  http_response_code(201);
  echo json_encode($newLike);
} catch (PDOException $e) {
  http_response_code(500);
  echo json_encode(array("message" => "Unable to add like: " . $e->getMessage()));
}
