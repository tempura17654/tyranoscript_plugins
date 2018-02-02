<?php
header("Access-Control-Allow-Headers: X-Requested-With");
header("Access-Control-Allow-Origin: *");
function getUserIP() {
    $client  = @$_SERVER['HTTP_CLIENT_IP'];
    $forward = @$_SERVER['HTTP_X_FORWARDED_FOR'];
    $remote  = $_SERVER['REMOTE_ADDR'];
    if (filter_var($client, FILTER_VALIDATE_IP)) {
        $ip = $client;
    }
    elseif (filter_var($forward, FILTER_VALIDATE_IP)) {
        $ip = $forward;
    }
    else {
        $ip = $remote;
    }
    return $ip;
}
$user_ip = getUserIP();
echo $user_ip;