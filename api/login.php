<?php
// api/login.php
session_start();
require __DIR__ . '/db.php';

// ATIVAR ERROS EM DESENVOLVIMENTO (pode tirar depois)
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

  // IMPORTANTE: confira se os nomes das tabelas/colunas estão assim no banco:
  //  - tabela: clientes   | colunas: id, email, senha_hash
  //  - tabela: empresas   | colunas: id, email, senha_hash
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

  if (!$usuario) {
    json(['ok' => false, 'erro' => 'Email ou senha inválidos.'], 401);
  }

  if (!isset($usuario['senha_hash'])) {
    json([
      'ok'   => false,
      'erro' => 'Coluna senha_hash não retornada. Confira o nome da coluna nas tabelas clientes/empresas.'
    ], 500);
  }

  if (!password_verify($senha, $usuario['senha_hash'])) {
    json(['ok' => false, 'erro' => 'Email ou senha inválidos.'], 401);
  }

  // Guarda infos mínimas na sessão
  $_SESSION['usuario_id']   = $usuario['id'];
  $_SESSION['usuario_tipo'] = $usuario['tipo'];

  json([
    'ok'   => true,
    'msg'  => 'Login realizado com sucesso!',
    'tipo' => $usuario['tipo']
  ]);

} catch (Throwable $e) {
  // Loga no error_log do PHP (útil pra você depois)
  error_log('ERRO LOGIN: ' . $e->getMessage());

  // Devolve a mensagem detalhada pra gente enxergar o problema AGORA
  json([
    'ok'   => false,
    'erro' => '[DEBUG] ' . $e->getMessage()
  ], 500);
}
