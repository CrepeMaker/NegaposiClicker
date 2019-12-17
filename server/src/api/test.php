<?php

$env_ini = parse_ini_file("../env.ini");

var_dump($env_ini);

$db = new mysqli($env_ini['DB_SERVER'], $env_ini['DB_USER'], $env_ini['DB_PASSWORD'], $env_ini['DB_DATABASE']);

if( $db->connect_error ){
  echo "Connection could not be established.<br/>;";
  die( print_r( array($DB->connect_error, E_USER_ERROR), true));
}

try{

  $request = json_decode(file_get_contents('php://input'), true);
  echo $request;

} catch (Exception $e) {
  http_response_code(500);
  echo 'Transaction failed: ' . $e->getMessage();
  $DB->rollback();
}
