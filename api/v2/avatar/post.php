<?php

require_once '../../../config/db.php';
require_once '../../../helpers/functions.php';
require_once '../../../models/Avatar.php';

// Check user login
// $isLoggedIn = checkToken();
$isLoggedIn = true;
if (!$isLoggedIn) {
  http_response_code(401);
  echo json_encode(array("message" => "Unauthorized user"));
  exit;
}

// Validate and sanitize the request data
$required = array(
  "name",
  "sex"
);
foreach ($required as $key) {
  if (isset($_POST[$key])) {
    $data[$key] = htmlspecialchars($_POST[$key]);
  } else {
    http_response_code(400);
    echo json_encode(array("message" => "Missing required field: " . $key));
    exit;
  }
}

if (!isset($_FILES['image']) && $_FILES['image']['error'] != UPLOAD_ERR_OK) {
  http_response_code(400);
  echo json_encode(array("message" => "Image upload failed."));
  exit;
}

$image_tmp_name = $_FILES['image']['tmp_name'];
$image_name =  $_FILES['image']['name'];

$allowed_extensions = array('jpg', 'jpeg', 'png', 'gif');
$file_info = pathinfo($image_name);
$extension = strtolower($file_info['extension']);
if (!in_array($extension, $allowed_extensions)) {
  http_response_code(401);
  echo json_encode(array("message" => "Only JPG, PNG, and GIF files are allowed."));
  exit;
}


try {
  $uploads_dir = dirname(__FILE__, 4) . '/avatars/';
  $new_image_name = uniqid() . '.' . $extension;
  $new_image_path = $uploads_dir . $new_image_name;
  move_uploaded_file($image_tmp_name, $new_image_path);

  $data['url'] = '/avatars/' . basename($new_image_path);
  $avatar = new Avatar($pdo);
  $newAvatar = $avatar->create($data);

  http_response_code(201);
  echo json_encode($newAvatar);
} catch (PDOException $e) {
  http_response_code(500);
  echo json_encode(array("message" => "Unable to add avatar: " . $e->getMessage()));
}
