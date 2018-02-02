<?php
header("Access-Control-Allow-Headers: X-Requested-With");
header("Access-Control-Allow-Origin: *");
$fileName = $_GET['fileName'];
readfile($fileName);