<?php

$env_ini = parse_ini_file("../env.ini");

var_dump($env_ini);

$db = new mysqli($env_ini['DB_SERVER'], $env_ini['DB_USER'], $env_ini['DB_PASSWORD'], $env_ini['DB_DATABASE']);

if( $db->connect_error ){
  echo "Connection could not be established.<br/>;";
  die( print_r( array($DB->connect_error, E_USER_ERROR), true));
}

try{
  $db->autocommit(FALSE);

  $request = json_decode(file_get_contents('php://input'), true);
  var_dump($request);

  foreach ($request as $item) {
    $id = $item['id'];
    $sentence = $item['sentence'];
    $reference = $item['reference'];

    var_dump($item);

    $stmt = $db->prepare("INSERT INTO sentences VALUES (?, ?, ?)");
    $stmt->bind_param('dss', $id, $sentence, $reference);
    $stmt->execute();

    var_dump($data);
  }

  $db->commit();

} catch (Exception $e) {
  http_response_code(500);
  echo 'Transaction failed: ' . $e->getMessage();
  $DB->rollback();
}
