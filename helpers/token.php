<?php
$dotenv = Dotenv\Dotenv::createImmutable(__DIR__ . '/..');
$dotenv->load();

use Firebase\JWT\JWT;
use Firebase\JWT\Key;

function checkToken()
{
  $secret_key = $_ENV['JWT_SECRET'];
  $token = readToken();

  try {
    $decoded = JWT::decode($token, new Key($secret_key, 'HS256'));
    if ($decoded->exp > time()) {
      return true;
    } else {
      return false;
    }
  } catch (Exception $e) {
    return $e;
  }
}

function readToken()
{
  $headers = getallheaders();
  if (isset($headers['Authorization']) || isset($headers['authorization'])) {
    $authorization = isset($headers['authorization']) ? $headers['authorization'] : $headers['Authorization'];
    $header = explode(" ",  $authorization);
    if ($header[0] === "Bearer") {
      return $header[1];
    }
  }
  return "";
}

function setToken($data)
{
  $issuedat = time(); // issued at
  $notbefore_claim = $issuedat + 5; //token valid after 5 secs
  $expire_claim = $issuedat + (7 * 24 * 60 * 60); //NEXT WEEK

  $token = array(
    "iss" => $_SERVER['SERVER_NAME'], //required
    "aud" => $_SERVER['SERVER_NAME'],
    "iat" => $issuedat,  //required
    "nbf" => $notbefore_claim, //required
    "exp" => $expire_claim,  //required
    "data" => array(
      "email" => $data['email']
    )
  );
  $secret_key = "f7eV9Wj7nAq3FQaQ";
  $jwt = JWT::encode($token, $secret_key, 'HS256');

  return array(
    "message" => "Successful login.",
    "token" => $jwt,
    "expireAt" => date('d-m-Y', $expire_claim)
  );
}
