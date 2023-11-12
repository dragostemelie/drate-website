<?php

require_once '../../../helpers/functions.php';

// Check user login
$isLoggedIn = checkToken();

if ($isLoggedIn) {
  http_response_code(200);
  echo json_encode(array("message" => "User is logged in."));
} else {
  http_response_code(401);
  echo json_encode($isLoggedIn);
}
