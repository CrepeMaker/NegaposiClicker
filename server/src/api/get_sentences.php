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

  $stmt = $db->prepare(
    'SELECT id, sentence, reference, IFNULL(c, 0) as "count" FROM sentences ' .
    'LEFT JOIN (SELECT sentence_id, COUNT(*) as c FROM responces WHERE respondent = ? GROUP BY sentence_id) ' .
    'AS A ON sentences.id = A.sentence_id WHERE c IS NULL AND id >= 0 ORDER BY RAND() LIMIT ?'
  );

  $stmt->bind_param('sd', $name, $size);
  $success = $stmt->execute();

  if (!$success) {
      throw new Exception('Error in SQL queries.');
  }

  $data = [];

  $stmt->bind_result($id, $sentence, $reference, $c);

  while ($stmt->fetch()) {
    array_push($data, array('id' => $id, 'sentence' => $sentence, 'reference' => $reference, 'count' => $c));
  }
  $stmt->close();

  http_response_code(200);
  echo json_encode($data);

} catch (Exception $e) {
  http_response_code(500);
  echo json_encode(array('error' => $e->getMessage()));

  $db->rollback();
}
