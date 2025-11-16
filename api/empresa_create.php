<?php
// api/empresa_create.php
require __DIR__ . '/db.php';

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
  json(['ok'=>false, 'erro'=>'Método não permitido'], 405);
}

$nome   = trim($_POST['NomeInstituicao'] ?? '');
$email  = trim($_POST['EmailInstituicao'] ?? '');
$senha  = (string)($_POST['Senha'] ?? '');
$conf   = (string)($_POST['ConfirmarSenha'] ?? '');
$cnpj   = preg_replace('/\D+/', '', $_POST['CNPJ'] ?? '');
$cep    = preg_replace('/\D+/', '', $_POST['CEP'] ?? '');
$end    = trim($_POST['Endereco'] ?? '');
$cont   = preg_replace('/\D+/', '', $_POST['Contato'] ?? '');
$tipo   = trim($_POST['TipoDeInstituicao'] ?? '');

if ($nome === '' || $email === '' || $senha === '' || $conf === '' || $end === '' || $tipo === '') {
  json(['ok'=>false, 'erro'=>'Preencha todos os campos obrigatórios.'], 400);
}
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
  json(['ok'=>false, 'erro'=>'Email inválido.'], 400);
}
if ($senha !== $conf) {
  json(['ok'=>false, 'erro'=>'As senhas não coincidem.'], 400);
}
if (strlen($cnpj) !== 14) {
  json(['ok'=>false, 'erro'=>'CNPJ deve ter 14 dígitos.'], 400);
}
if (strlen($cep) !== 8) {
  json(['ok'=>false, 'erro'=>'CEP deve ter 8 dígitos.'], 400);
}
if (strlen($cont) < 10 || strlen($cont) > 11) {
  json(['ok'=>false, 'erro'=>'Telefone deve ter DDD + número (10 ou 11 dígitos).'], 400);
}
if (!in_array($tipo, ['ONG','Associacao','Fundacao','Outros'], true)) {
  json(['ok'=>false, 'erro'=>'Tipo de Instituição inválido.'], 400);
}

$hash = password_hash($senha, PASSWORD_DEFAULT);

try {
  $pdo = db();

  $st = $pdo->prepare('SELECT 1 FROM empresas WHERE email = ? OR cnpj = ? LIMIT 1');
  $st->execute([$email, $cnpj]);
  if ($st->fetch()) {
    json(['ok'=>false, 'erro'=>'Email ou CNPJ já cadastrado.'], 409);
  }

  $sql = 'INSERT INTO empresas
            (nome, email, senha_hash, cnpj, cep, endereco, contato_tel, tipo_instituicao)
          VALUES
            (:nome,:email,:senha,:cnpj,:cep,:end,:cont,:tipo)';
  $pdo->prepare($sql)->execute([
    ':nome'  => $nome,
    ':email' => $email,
    ':senha' => $hash,
    ':cnpj'  => $cnpj,
    ':cep'   => $cep,
    ':end'   => $end,
    ':cont'  => $cont,
    ':tipo'  => $tipo,
  ]);

  json(['ok'=>true, 'msg'=>'Cadastro realizado com sucesso!']);
} catch (Throwable $e) {
  json(['ok'=>false, 'erro'=>'Erro no servidor ao salvar cadastro.'], 500);
}
