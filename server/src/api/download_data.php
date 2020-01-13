<?php

$env_ini = parse_ini_file("../env.ini");

$db = new mysqli($env_ini['DB_SERVER'], $env_ini['DB_USER'], $env_ini['DB_PASSWORD'], $env_ini['DB_DATABASE']);
$db->set_charset('utf8');

if( $db->connect_error ){
  echo "Connection could not be established.<br/>;";
  die( print_r( array($DB->connect_error, E_USER_ERROR), true));
}

try{

  if (!$_GET || !array_key_exists('token', $_GET) || $_GET['token'] !== $env_ini['DOWNLOAD_TOKEN']) {
    http_response_code(402);
    echo json_encode(array('error' => 'Invalid Token'));
    exit(0);
  }

  if (!$_GET || !array_key_exists('kind', $_GET) || !is_string($_GET['kind']) || !strlen($_GET['kind'])) {
    http_response_code(402);
    echo json_encode(array('error' => 'Invalid Request'));
    exit(0);
  }

  if (!$_GET || !array_key_exists('type', $_GET) || !is_string($_GET['type']) || !strlen($_GET['type'])) {
    http_response_code(402);
    echo json_encode(array('error' => 'Invalid Request'));
    exit(0);
  }

  if ($_GET['type'] !== 'json' && $_GET['type'] !== 'csv') {
    http_response_code(402);
    echo json_encode(array('error' => 'Invalid Request'));
    exit(0);
  }

  $kind = $_GET['kind'];
  $filetype = $_GET['type'];

  $query = '';
  $columns = 0;

  switch ($kind) {
    case "sentences":
      $query = 'SELECT id, sentence, reference FROM sentences';
      $columns = ['id', 'sentence', 'reference'];
    break;

    case "responces":
      $query = 'SELECT id, sentence_id, respondent, class FROM responces';
      $columns = ['id', 'sentence_id', 'respondent', 'class'];
    break;

    case "responceswithsentences":
      $query = 'SELECT responces.id, responces.class, sentences.id, sentences.sentence, sentences.reference FROM responces, sentences WHERE sentences.id = responces.sentence_id';
      $columns = ['id', 'class', 'sentence_id', 'sentence', 'reference'];
    break;

    default:
      http_response_code(402);
      echo json_encode(array('error' => 'Invalid Request'));
      exit(0);
    break;
  }

  $result = $db->query($query);

  if ($filetype === 'csv') {
    header("Content-Type: application/force-download");
    header("Content-disposition: attachment; filename=\"".basename($kind).".csv\"");

    for ($i = 0; $i < count($columns); $i++) {
      echo '"' . $columns[$i] . '"';
      if ($i + 1 < count($columns)) {
        echo ',';
      } else {
        echo "\n";
      }
    }
    while($row = $result->fetch_array(MYSQLI_NUM)) {
      for ($i = 0; $i < count($columns); $i++) {
        $text = str_replace(["\r\n", "\r", "\n"], '　　', $row[$i]);
        echo '"' . $text . '"';
        if ($i + 1 < count($columns)) {
          echo ',';
        } else {
          echo "\n";
        }
      }
    }
  } else if ($filetype === 'json') {
    header("Content-Type: application/force-download");
    header("Content-disposition: attachment; filename=\"".basename($kind).".json\"");

    $data = [];
    while($row = $result->fetch_array(MYSQLI_NUM)) {
      $row_data = array();
      for ($i = 0; $i < count($columns); $i++) {
        $row_data[$columns[$i]] = $row[$i];
      }
      array_push($data, $row_data);
    }

    echo json_encode($data, JSON_UNESCAPED_UNICODE|JSON_PRETTY_PRINT);
  }

  $result->free();
}  catch (Exception $e) {
  http_response_code(500);
  echo json_encode(array('error' => $e->getMessage()));
}
