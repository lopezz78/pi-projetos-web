<?php
// api/login.php
session_start();
require __DIR__ . '/db.php';

// DESENVOLVIMENTO – pode comentar depois
ini_set('display_errors', 1);
error_reporting(E_ALL);

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
  json(['ok' => false, 'erro' => 'Método não permitido.'], 405);
}

$email = trim($_POST['Email'] ?? '');
$senha = (string)($_POST['Senha'] ?? '');

if ($email === '' || $senha === '') {
  json(['ok' => false, 'erro' => 'Informe email e senha.'], 400);
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
  json(['ok' => false, 'erro' => 'Email inválido.'], 400);
}

try {
  $pdo = db();

  $usuario = null;
  $tipo    = null;

  // *** IMPORTANTE ***
  // Confira no phpMyAdmin:
  //  - se a tabela de clientes se chama MESMO "clientes"
  //  - se a coluna de senha se chama MESMO "senha_hash"
  //
  // Se for "cliente" ou "senha" etc., troque aqui.

  // 1) tenta achar como CLIENTE
  $st = $pdo->prepare('SELECT id, senha_hash FROM clientes WHERE email = :email LIMIT 1');
  $st->execute([':email' => $email]);
  $usuario = $st->fetch(PDO::FETCH_ASSOC);

  if ($usuario) {
    $tipo = 'cliente';
  } else {
    // 2) se não achou, tenta EMPRESA
    $st = $pdo->prepare('SELECT id, senha_hash FROM empresas WHERE email = :email LIMIT 1');
    $st->execute([':email' => $email]);
    $usuario = $st->fetch(PDO::FETCH_ASSOC);

    if ($usuario) {
      $tipo = 'empresa';
    }
  }

  // Nenhum usuário com esse email
  if (!$usuario) {
    json(['ok' => false, 'erro' => 'Email ou senha inválidos.'], 401);
  }

  // Garante que veio a coluna senha_hash
  if (!array_key_exists('senha_hash', $usuario)) {
    json([
      'ok'   => false,
      'erro' => '[DEBUG] Coluna "senha_hash" não encontrada. Confira o nome da coluna nas tabelas clientes/empresas.'
    ], 500);
  }

  // Valida a senha
  if (!password_verify($senha, $usuario['senha_hash'])) {
    json(['ok' => false, 'erro' => 'Email ou senha inválidos.'], 401);
  }

  // Guarda na sessão
  $_SESSION['usuario_id']   = $usuario['id'];
  $_SESSION['usuario_tipo'] = $tipo;

  json([
    'ok'   => true,
    'msg'  => 'Login realizado com sucesso!',
    'tipo' => $tipo,
  ]);

} catch (Throwable $e) {
  error_log('ERRO LOGIN: ' . $e->getMessage());

  json([
    'ok'   => false,
    'erro' => '[DEBUG] ' . $e->getMessage()
  ], 500);
}
