<?php

require_once '../../../config/db.php';
require_once '../../../helpers/functions.php';
require_once '../../../models/Stat.php';

// Check user login
$isLoggedIn = checkToken();
if (!$isLoggedIn) {
  http_response_code(401);
  echo json_encode(array("message" => "Unauthorized"));
  exit;
}

try {
  $stat = new Stat($pdo);


  $stats = [];
  $data = $stat->getAll();

  if (is_array($data)) {
    $stats = $data;
  }

  $results = [];
  foreach ($stats as $item) {
    $result = $item;
    $result["visits"] = isset($item["visits"]) ? $item["visits"] : 0;
    $result["comments"] = isset($item["comments"]) ? $item["comments"] : 0;
    $result["likes"] = isset($item["likes"]) ? $item["likes"] : 0;
    $result["country"] = isset($item["country"]) ? $item["country"] : "-";
    $result["history"] = [];
    $data = $stat->getByGuid($item["guid"]);
    if (is_array($data)) {
      foreach ($data as $dataItem) {
        array_push($result["history"], $dataItem);
      }
    }
    array_push($results, $result);
  }

  http_response_code(200);
  echo json_encode($results);
} catch (PDOException $e) {
  http_response_code(500);
  echo json_encode(array("message" => "Unable to get stats: " . $e->getMessage()));
}
