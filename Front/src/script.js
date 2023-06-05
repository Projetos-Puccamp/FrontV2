document.getElementById('cadastroForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Impede o envio do formulário
  
    // Obter os valores dos campos do formulário
    var nome = document.getElementById('nome').value;
    var email = document.getElementById('email').value;
    var senha = document.getElementById('senha').value;
  
    // Verificar se os campos estão preenchidos
    if (nome === '' || email === '' || senha === '') {
      document.getElementById('mensagem').textContent = 'Por favor, preencha todos os campos.';
    } else {
      // Criar um objeto com os dados do usuário
      var usuario = {
        nome: nome,
        email: email,
        senha: senha
      };
  
      // Aqui você pode fazer o que quiser com o objeto 'usuario'
      // Por exemplo, enviar os dados para o servidor através de uma requisição AJAX
  
      // Limpar os campos do formulário
      document.getElementById('nome').value = '';
      document.getElementById('email').value = '';
      document.getElementById('senha').value = '';
  
      // Exibir uma mensagem de sucesso
      document.getElementById('mensagem').className = '';
      document.getElementById('mensagem').textContent = 'Cadastro realizado com sucesso!';
    }
  });