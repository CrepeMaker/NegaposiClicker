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

  if (!array_key_exists('token', $request) || $request['token'] !== $env_ini['TOKEN']) {
    http_response_code(402);
    echo json_encode(array('error' => 'Invalid Token'));
  }

  $num = 0;

  $offset = array_key_exists('offset', $request) ? $request['offset'] : 0;
  $size = array_key_exists('size', $request) ? $request['size'] : 20;

  $stmt = $db->prepare("SELECT id, sentence FROM sentences LIMIT ? OFFSET ?");
  $stmt->bind_param('dd', $size, $offset);
  $success = $stmt->execute();

  if (!$success) {
      throw new Exception('Error in SQL queries.');
  }

  $data = [];

  $stmt->bind_result($id, $sentence);

  while ($stmt->fetch()) {
    array_push($data, array('id' => $id, 'sentence' => $sentence));
  }
  $stmt->close();

  http_response_code(200);
  echo json_encode($data);

} catch (Exception $e) {
  http_response_code(500);
  echo json_encode(array('error' => $e->getMessage()));

  $db->rollback();
}
