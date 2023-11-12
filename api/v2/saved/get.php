<?php

require_once '../../../config/db.php';
require_once '../../../helpers/functions.php';
require_once '../../../models/Saved.php';

$guid = htmlspecialchars($_GET["guid"]);
if (!isset($guid)) {
  http_response_code(400);
  echo json_encode(array("error" => "Bad request."));
  exit();
}

try {
  $uuid = getUserUuid($pdo, $guid);
  if (!$uuid) {
    http_response_code(404);
    echo json_encode(array("message" => "User not found."));
    exit;
  }

  $saved = new Saved($pdo);
  $results = [];
  $data = $saved->getByUuid($uuid);

  if (is_array($data)) {
    foreach ($data as $item) {
      array_push($results, $item['post']);
    }
  }

  http_response_code(200);
  echo json_encode($results);
} catch (PDOException $e) {
  http_response_code(500);
  echo json_encode(array("message" => "Unable to get saved list: " . $e->getMessage()));
}
