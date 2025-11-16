<?php
// api/cliente_create.php
require __DIR__ . '/db.php';

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
  json(['ok' => false, 'erro' => 'Método não permitido.'], 405);
}

// Coleta e normaliza dados do formulário
$nome   = trim($_POST['NomeCompleto'] ?? '');
$email  = trim($_POST['Email']        ?? '');
$senha  = (string)($_POST['Senha']    ?? '');
$conf   = (string)($_POST['ConfirmarSenha'] ?? '');
$nasc   = trim($_POST['DataDeNascimento'] ?? '');
$cep    = preg_replace('/\D+/', '', $_POST['CEP'] ?? '');
$genero = trim($_POST['Genero'] ?? '');

// Validações básicas
if ($nome === '' || $email === '' || $senha === '' || $conf === '' || $nasc === '' || $cep === '' || $genero === '') {
  json(['ok' => false, 'erro' => 'Preencha todos os campos obrigatórios.'], 400);
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
  json(['ok' => false, 'erro' => 'Email inválido.'], 400);
}

if (strlen($senha) < 8) {
  json(['ok' => false, 'erro' => 'A senha deve ter pelo menos 8 caracteres.'], 400);
}

if ($senha !== $conf) {
  json(['ok' => false, 'erro' => 'As senhas não coincidem.'], 400);
}

if (strlen($cep) !== 8) {
  json(['ok' => false, 'erro' => 'CEP deve ter 8 dígitos.'], 400);
}

// Data de nascimento – formato simples (YYYY-MM-DD)
$dt = DateTime::createFromFormat('Y-m-d', $nasc);
// Se falhar ou se o format não bater exatamente, considera inválida
if (!$dt || $dt->format('Y-m-d') !== $nasc) {
  json(['ok' => false, 'erro' => 'Data de nascimento inválida.'], 400);
}

// (Opcional) impedir datas futuras
$hoje = new DateTime('today');
if ($dt > $hoje) {
  json(['ok' => false, 'erro' => 'Data de nascimento não pode ser futura.'], 400);
}

// Validação de gênero — mesmos valores das <option> do HTML
$generosPermitidos = [
  'Feminino',
  'Masculino',
  'Outro',
  'Helicoptero AH-64 Apache',
  'Prefiro não dizer'
];

if (!in_array($genero, $generosPermitidos, true)) {
  json(['ok' => false, 'erro' => 'Gênero inválido.'], 400);
}

// Gera hash seguro da senha
$hash = password_hash($senha, PASSWORD_DEFAULT);

try {
  $pdo = db();

  // Verifica se já existe usuário com esse e-mail
  $st = $pdo->prepare('SELECT 1 FROM clientes WHERE email = ? LIMIT 1');
  $st->execute([$email]);
  if ($st->fetch()) {
    json(['ok' => false, 'erro' => 'Este email já está cadastrado.'], 409);
  }

  // Insere cadastro
  $sql = 'INSERT INTO clientes
            (nome, email, senha_hash, data_nascimento, cep, genero)
          VALUES
            (:nome, :email, :senha, :nasc, :cep, :genero)';

  $pdo->prepare($sql)->execute([
    ':nome'   => $nome,
    ':email'  => $email,
    ':senha'  => $hash,
    ':nasc'   => $dt->format('Y-m-d'),
    ':cep'    => $cep,
    ':genero' => $genero,
  ]);

  json(['ok' => true, 'msg' => 'Cadastro realizado com sucesso!']);
} catch (Throwable $e) {
  // Em desenvolvimento você pode logar o erro:
  // error_log($e->getMessage());
  json(['ok' => false, 'erro' => 'Erro no servidor ao salvar cadastro.'], 500);
}
