<?php

$hash = password_hash("Anaare2mere1!", PASSWORD_BCRYPT);


http_response_code(200);
echo json_encode(array("message" => "Hash is "  . $hash . " and id is " . uniqid("tech-"),));
exit();
