<?php

require_once '../../../config/db.php';
require_once '../../../models/Post.php';
require_once '../../../helpers/functions.php';

// Check user login
$isLoggedIn = checkToken();
// $isLoggedIn = true;
if (!$isLoggedIn) {
  http_response_code(401);
  echo json_encode(array("message" => "Unauthorized user"));
  exit;
}

$required = array(
  "author",
  "title",
  "excerpt",
  "content",
  "topic",
  "tag",
);
$optional = array(
  "is_published",
  "post_parent",
);

$data = sanitizeData($required, $optional);
if (!is_array($data)) {
  http_response_code(400);
  echo json_encode(array("message" => "Missing required field: " . $data));
  exit;
}

// Create post
try {
  $post = new Post($pdo);
  $newPost = $post->create($data);
  $isPublished = ($newPost['is_published'] == 1) ? true : false;
  $newPost['is_published'] = $isPublished;
  // Return the newly created post as JSON
  http_response_code(201);
  echo json_encode($newPost);
} catch (PDOException $e) {
  http_response_code(500);
  echo json_encode(array("message" => "Unable to create post: " . $e->getMessage()));
}
