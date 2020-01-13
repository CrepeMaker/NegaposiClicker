<?php

$env_ini = parse_ini_file("../env.ini");

$db = new mysqli($env_ini['DB_SERVER'], $env_ini['DB_USER'], $env_ini['DB_PASSWORD'], $env_ini['DB_DATABASE']);
$db->set_charset('utf8');

if( $db->connect_error ){
  echo "Connection could not be established.<br/>;";
  die( print_r( array($DB->connect_error, E_USER_ERROR), true));
}

try{
  $db->autocommit(FALSE);

  $request = json_decode(file_get_contents('php://input'), true);

  if (!$request || !array_key_exists('data', $request)) {
    http_response_code(400);
    echo json_encode(array('error' => 'Invalid Request'));
    exit(0);
  }

  if (!array_key_exists('token', $request) || $request['token'] !== $env_ini['DEVELOPER_TOKEN']) {
    http_response_code(402);
    echo json_encode(array('error' => 'Invalid Token'));
    exit(0);
  }

  $num = 0;

  foreach ($request['data'] as $item) {
    $id = $item['id'];
    $sentence = $item['sentence'];
    $reference = $item['reference'];

    $stmt = $db->prepare("INSERT INTO sentences(id, sentence, reference) VALUES (?, ?, ?)");

    if (!$stmt) {
      throw new Exception('Error in SQL queries.' . $db->error);
    }

    $stmt->bind_param('dss', $id, $sentence, $reference);
    $success = $stmt->execute();

    if (!$success) {
      throw new Exception('Error in SQL queries.' . $db->error);
    }

    $num += 1;
  }

  $db->commit();

  http_response_code(200);
  echo json_encode(array('success' => 'OK', 'num' => $num));

} catch (Exception $e) {
  http_response_code(500);
  echo json_encode(array('error' => $e->getMessage()));

  $db->rollback();
}
