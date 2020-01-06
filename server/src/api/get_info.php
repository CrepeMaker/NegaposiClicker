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

  $all_num = 0;
  $ok_num = 0;
  $one_num = 0;
  $id = 0; $num = 0;

  // 全体数
  $stmt_all = $db->prepare(
    'SELECT COUNT(*) FROM sentences'
  );

  $success = $stmt_all->execute();

  if (!$success) {
      throw new Exception('Error in SQL queries. (' . $db->error . ')');
  }

  $stmt_all->bind_result($all_num);
  $stmt_all->fetch();
  $stmt_all->close();

  // 回答者1以上
  $stmt_merge1 = $db->prepare(
    'SELECT COUNT(*) FROM (SELECT sentence_id, COUNT(DISTINCT respondent) as num FROM responces GROUP BY sentence_id) as T WHERE num >= 1'
  );

  $success = $stmt_merge1->execute();

  if (!$success) {
    throw new Exception('Error in SQL queries. (' . $db->error . ')');
  }

  $stmt_merge1->bind_result($one_num);
  $stmt_merge1->fetch();
  $stmt_merge1->close();

  // 回答者2以上
  $stmt_merge = $db->prepare(
    'SELECT COUNT(*) FROM (SELECT sentence_id, COUNT(DISTINCT respondent) as num FROM responces GROUP BY sentence_id) as T WHERE num >= 2'
  );

  $success = $stmt_merge->execute();

  if (!$success) {
    throw new Exception('Error in SQL queries. (' . $db->error . ')');
  }

  $stmt_merge->bind_result($ok_num);
  $stmt_merge->fetch();
  $stmt_merge->close();

  // 各個人の回答数
  $stmt_users = $db->prepare(
    'SELECT respondent, COUNT(DISTINCT sentence_id) FROM responces GROUP BY respondent'
  );

  $success = $stmt_users->execute();

  if (!$success) {
    throw new Exception('Error in SQL queries. (' . $db->error . ')');
  }

  $stmt_users->bind_result($id, $num);

  $users = [];

  while ($stmt_users->fetch()) {
    array_push($users, array('id' => $id, 'num' => $num));
  }

  $stmt_users->close();

  http_response_code(200);
  echo json_encode(array('all' => $all_num, 'ok1' => $one_num, 'ok2' => $ok_num, 'users' => $users));

} catch (Exception $e) {
  http_response_code(500);
  echo json_encode(array('error' => $e->getMessage()));

  $db->rollback();
}
