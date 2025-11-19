<?php
// api/login.php — TESTE BÁSICO, SEM BANCO

// Mostrar erros na tela (desenvolvimento)
ini_set('display_errors', 1);
error_reporting(E_ALL);

// Sempre responder JSON
header('Content-Type: application/json; charset=utf-8');

// Só pra ver se está chegando como POST
echo json_encode([
    'ok'     => true,
    'msg'    => 'login.php respondeu',
    'method' => $_SERVER['REQUEST_METHOD'] ?? 'desconhecido'
]);
exit;
