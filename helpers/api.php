<?php

require_once __DIR__ . '/../models/Metadata.php';
require_once __DIR__ . '/../models/User.php';

function setPageMeta(PDO $pdo): array
{
  $url = $_SERVER['REQUEST_URI'];

  $metadata = [
    "created" => null,
    "url" => "https://www.drate.net/",
    "title" => "Drate Tech Blog",
    "description" => "We cover a variety of topics including frontend development, coding practices, ui design, and a touch of entertainment that includes finance, lifestyle, sports and eating habits.",
    "image" => "https://www.drate.net/images/drate-meta-image.jpg",
    "author" => null
  ];

  try {
    $meta = new Metadata($pdo);
    $result = $meta->getByUrl($url);

    if ($result) {
      $metadata = $result;
    }
  } catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(array("message" => "Unable to get meta: " . $e->getMessage()));
  }

  return $metadata;
}

function getUserUuid(PDO $pdo, string $guid): string|null
{
  $user = new User($pdo);
  $result = $user->getByGuid($guid);
  if (!$result) {
    return null;
  }
  return $result['uuid'];
}

function sanitizeData(array $required, array $optional = null): array|string
{
  $body = json_decode(file_get_contents('php://input'), true);

  foreach ($required as $key) {
    if (isset($body[$key])) {
      $data[$key] = htmlspecialchars($body[$key]);
    } else {
      return $key;
    }
  }

  if ($optional) {
    foreach ($optional as $key) {
      if (isset($body[$key])) {
        $data[$key] = htmlspecialchars($body[$key]);
      } else {
        $data[$key] = null;
      }
    }
  }
  return $data;
}
