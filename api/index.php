<?php

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: ');

http_response_code(405);
echo json_encode(array("message" => "Not allowed."));
