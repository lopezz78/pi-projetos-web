<?php
// api/login.php
session_start();
require __DIR__ . '/db.php';

// MODO DESENVOLVIMENTO – depois você pode comentar essas 2 linhas
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

  // 1) Tenta achar como CLIENTE
  // ATENÇÃO: confira no phpMyAdmin se a tabela se chama exatamente "clientes"
  // e se a coluna da senha se chama exatamente "senha_hash".
  $st = $pdo->prepare('SELECT id, senha_hash FROM clientes WHERE email = :email LIMIT 1');
  $st->execute([':email' => $email]);
  $usuario = $st->fetch(PDO::FETCH_ASSOC);

  if ($usuario) {
    $tipo = 'cliente';
  } else {
    // 2) Se não achou, tenta como EMPRESA
    $st = $pdo->prepare('SELECT id, senha_hash FROM empresas WHERE email = :email LIMIT 1');
    $st->execute([':email' => $email]);
    $usuario = $st->fetch(PDO::FETCH_ASSOC);

    if ($usuario) {
      $tipo = 'empresa';
    }
  }

  // Nenhum usuário com esse e-mail
  if (!$usuario) {
    json(['ok' => false, 'erro' => 'Email ou senha inválidos.'], 401);
  }

  // Confere se a coluna senha_hash realmente veio
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
    'tipo' => $tipo
  ]);

} catch (Throwable $e) {
  // Log pra você olhar depois, se quiser
  error_log('ERRO LOGIN: ' . $e->getMessage());

  // Em desenvolvimento, devolve o erro detalhado
  json([
    'ok'   => false,
    'erro' => '[DEBUG] ' . $e->getMessage()
  ], 500);
}
