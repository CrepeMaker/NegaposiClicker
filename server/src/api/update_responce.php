<?php

$env_ini = parse_ini_file("../env.ini");

$db = new mysqli($env_ini['DB_SERVER'], $env_ini['DB_USER'], $env_ini['DB_PASSWORD'], $env_ini['DB_DATABASE']);

if( $db->connect_error ){
  echo "Connection could not be established.<br/>;";
  die( print_r( array($DB->connect_error, E_USER_ERROR), true));
}

try{
  $db->autocommit(FALSE);

  $request = json_decode(file_get_contents('php://input'), true);

  if (!$request || !array_key_exists('id', $request) ||
      !array_key_exists('name', $request) || !array_key_exists('class', $request)) {
    http_response_code(400);
    echo json_encode(array('error' => 'Invalid Request'));
    exit(0);
  }

  if (!array_key_exists('token', $request) || $request['token'] !== $env_ini['CLIENT_TOKEN']) {
    http_response_code(402);
    echo json_encode(array('error' => 'Invalid Token'));
    exit(0);
  }

  $id = $request['id'];
  $name = $request['name'];
  $class = $request['class'];

  $stmt = $db->prepare("UPDATE responces SET class = ? WHERE id = ? AND respondent = ?");

  if (!$stmt) {
    throw new Exception('Error in SQL queries. (' . $db->error . ')');
  }

  $stmt->bind_param('dds', $class, $id, $name);

  $success = $stmt->execute();

  if (!$success) {
    throw new Exception('Error in SQL queries. (' . $db->error . ')');
  }

  $db->commit();

  http_response_code(200);
  echo json_encode(array('success' => 'OK'));

} catch (Exception $e) {
  http_response_code(500);
  echo json_encode(array('error' => $e->getMessage()));

  $db->rollback();
}
