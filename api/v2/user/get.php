<?php

require_once '../../../config/db.php';
require_once '../../../models/User.php';

try {
  $user = new User($pdo);
  $users = [];
  $data = $user->getAll();

  if (is_array($data)) {
    $users = $data;
    foreach ($users as &$item) {
      $item["isAuthor"] = ($item["isAuthor"] == 1) ? true : false;
    }
  }

  http_response_code(200);
  echo json_encode($users);
} catch (PDOException $e) {
  http_response_code(500);
  echo json_encode(array("message" => "Unable to get user list: " . $e->getMessage()));
}
