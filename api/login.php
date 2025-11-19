<?php
// api/login.php
session_start();
require __DIR__ . '/db.php';

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

  // Procura o usuário tanto em clientes quanto em empresas
  $sql = "
    SELECT id, senha_hash, 'cliente' AS tipo
    FROM clientes
    WHERE email = :email

    UNION ALL

    SELECT id, senha_hash, 'empresa' AS tipo
    FROM empresas
    WHERE email = :email

    LIMIT 1
  ";

  $st = $pdo->prepare($sql);
  $st->execute([':email' => $email]);
  $usuario = $st->fetch();

  if (!$usuario || !password_verify($senha, $usuario['senha_hash'])) {
    json(['ok' => false, 'erro' => 'Email ou senha inválidos.'], 401);
  }

  // Guarda na sessão se quiser proteger páginas depois
  $_SESSION['usuario_id']   = $usuario['id'];
  $_SESSION['usuario_tipo'] = $usuario['tipo'];

  json([
    'ok'   => true,
    'msg'  => 'Login realizado com sucesso!',
    'tipo' => $usuario['tipo'], // 'cliente' ou 'empresa'
  ]);
} catch (Throwable $e) {
  // error_log($e->getMessage()); // se quiser logar
  json(['ok' => false, 'erro' => 'Erro no servidor ao tentar fazer login.'], 500);
}
