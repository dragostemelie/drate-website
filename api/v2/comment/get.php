<?php

require_once '../../../config/db.php';
require_once '../../../models/Comment.php';

try {
  $comment = new Comment($pdo);
  $comments = [];
  $data = $comment->getAll();

  if (is_array($data)) {
    $comments = $data;
  }

  http_response_code(200);
  echo json_encode($comments);
} catch (PDOException $e) {
  http_response_code(500);
  echo json_encode(array("message" => "Unable to get comment list: " . $e->getMessage()));
}
