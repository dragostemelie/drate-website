<?php

require_once '../../../config/db.php';
require_once '../../../models/Like.php';

try {
  $like = new Like($pdo);
  $likes = [];
  $data = $like->getAll();

  if (is_array($data)) {
    $likes = $data;
    foreach ($likes as &$item) {
      $item["post"] = intval($item["post"]);
      $item["comment"] = intval($item["comment"]);
    }
  }

  http_response_code(200);
  echo json_encode($likes);
} catch (PDOException $e) {
  http_response_code(500);
  echo json_encode(array("message" => "Unable to get avatar list: " . $e->getMessage()));
}
