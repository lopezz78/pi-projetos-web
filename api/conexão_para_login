<?php
$host = 'localhost';
$db   = 'inclui';        // <-- NOME DO SEU BANCO
$user = 'root';
$pass = '';              // senha do MySQL (no XAMPP normalmente é vazia)

$dsn = "mysql:host=$host;dbname=$db;charset=utf8mb4";

$options = [
    PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
    PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
];

try {
    $pdo = new PDO($dsn, $user, $pass, $options);
} catch (PDOException $e) {
    die('Erro na conexão com o banco: ' . $e->getMessage());
}
