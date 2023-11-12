<?php

require_once __DIR__ . '/../vendor/autoload.php';
require_once __DIR__ . '/api.php';
require_once __DIR__ . '/token.php';

use MaxMind\Db\Reader;

function getUserInfo()
{
  // User IP
  if (isset($_SERVER['HTTP_X_FORWARDED_FOR'])) {
    $user_ip = $_SERVER['HTTP_X_FORWARDED_FOR'];
  } else {
    $user_ip = $_SERVER['REMOTE_ADDR'];
  }

  // User Agent
  $user_agent = $_SERVER['HTTP_USER_AGENT'];

  $browser = '';
  $os = '';

  if (preg_match('/\bFirefox\b/i', $user_agent)) {
    $browser = 'Firefox';
  } elseif (preg_match('/\bEdg\b/i', $user_agent)) {
    $browser = 'Edge';
  } elseif (preg_match('/\bChrome\b/i', $user_agent)) {
    $browser = 'Chrome';
  } elseif (preg_match('/\bSafari\b/i', $user_agent)) {
    $browser = 'Safari';
  } elseif (preg_match('/\bOpera\b/i', $user_agent)) {
    $browser = 'Opera';
  } elseif (preg_match('/\bMSIE\b/i', $user_agent)) {
    $browser = 'Internet Explorer';
  } else {
    $browser = 'Other';
  }

  if (preg_match('/\bWindows\b/i', $user_agent)) {
    $os = 'Windows';
  } elseif (preg_match('/\bMacintosh\b/i', $user_agent)) {
    $os = 'Mac';
  } elseif (preg_match('/\biPhone\b/i', $user_agent)) {
    $os = 'iPhone';
  } elseif (preg_match('/\biPad\b/i', $user_agent)) {
    $os = 'iPad';
  } elseif (preg_match('/\bAndroid\b/i', $user_agent)) {
    $os = 'Android';
  } elseif (preg_match('/\bLinux\b/i', $user_agent)) {
    $os = 'Linux';
  } else {
    $os = 'Other';
  }

  // User location
  $database_path = dirname(__FILE__) . '/GeoLite2-Country.mmdb';

  $reader = new Reader($database_path);
  $record = $reader->get($user_ip);
  $country = $record["country"]["iso_code"];
  $reader->close();

  return array(
    "ip" => $user_ip,
    "os" => $os,
    "browser" => $browser,
    "country" => $country
  );
}
