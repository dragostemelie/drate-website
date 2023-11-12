<?php

require_once '../../../config/db.php';
require_once '../../../models/User.php';
require_once '../../../helpers/functions.php';

$required = array(
  "email",
  "password"
);

$data = sanitizeData($required);
if (!is_array($data)) {
  http_response_code(400);
  echo json_encode(array("message" => "Missing required field: " . $data));
  exit;
}

try {
  $user = new User($pdo);
  $result = $user->getByEmail($data["email"]);

  if ($result) {
    if (password_verify($data['password'], $result['password'])) {
      $token = setToken($data);
      unset($result['password']);
      $response = array_merge($token, $result);
      http_response_code(200);
      echo json_encode($response);
    } else {
      http_response_code(401);
      echo json_encode(array("message" => "Wrong email or password."));
    }
  } else {
    http_response_code(401);
    echo json_encode(array("message" => "Wrong password or email."));
  }
} catch (PDOException $e) {
  http_response_code(500);
  echo json_encode(array("message" => "Unable to login user: " . $e->getMessage()));
}
