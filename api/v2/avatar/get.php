<?php

require_once '../../../config/db.php';
require_once '../../../models/Avatar.php';

try {
  $avatar = new Avatar($pdo);
  $avatars = [];
  $data = $avatar->getAll();

  if (is_array($data)) {
    $avatars = $data;
  }

  http_response_code(200);
  echo json_encode($avatars);
} catch (PDOException $e) {
  http_response_code(500);
  echo json_encode(array("message" => "Unable to get avatar list: " . $e->getMessage()));
}
