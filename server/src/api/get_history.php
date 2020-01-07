<?php

$env_ini = parse_ini_file("../env.ini");

$db = new mysqli($env_ini['DB_SERVER'], $env_ini['DB_USER'], $env_ini['DB_PASSWORD'], $env_ini['DB_DATABASE']);

if( $db->connect_error ){
  echo "Connection could not be established.<br/>;";
  die( print_r( array($DB->connect_error, E_USER_ERROR), true));
}

try{

  if (!$_GET || !array_key_exists('token', $_GET) || $_GET['token'] !== $env_ini['CLIENT_TOKEN']) {
    http_response_code(402);
    echo json_encode(array('error' => 'Invalid Token'));
    exit(0);
  }

  if (!$_GET || !array_key_exists('name', $_GET) || !is_string($_GET['name']) || !strlen($_GET['name'])) {
    http_response_code(402);
    echo json_encode(array('error' => 'Invalid Request'));
    exit(0);
  }

  $num = 0;

  $name = $_GET['name'];
  $size = array_key_exists('size', $_GET) ? $_GET['size'] : 20;
  $offset = array_key_exists('offset', $_GET) ? $_GET['offset'] : 20;

  $stmt = $db->prepare(
    'SELECT responces.id, class, sentence FROM responces, sentences ' .
    'WHERE responces.sentence_id = sentences.id AND respondent = ? ' .
    'ORDER BY id DESC LIMIT ? OFFSET ?'
  );

  $stmt->bind_param('sdd', $name, $size, $offset);
  $success = $stmt->execute();

  if (!$success) {
    throw new Exception('Error in SQL queries. (' . $db->error . ')');
  }

  $data = [];

  $stmt->bind_result($id, $class, $sentence);

  while ($stmt->fetch()) {
    array_push($data, array('id' => $id, 'sentence' => $sentence, 'class' => $class));
  }
  $stmt->close();

  $result = $db->query('SELECT FOUND_ROWS() as count');
  $obj = $result->fetch_object();

  http_response_code(200);
  echo json_encode(array('items' => $data, 'all' => $obj->count, 'offset' => $offset));

} catch (Exception $e) {
  http_response_code(500);
  echo json_encode(array('error' => $e->getMessage()));

  $db->rollback();
}
