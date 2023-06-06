document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Impede o envio do formulário
  
    // Obter os valores dos campos do formulário
    var email = document.getElementById('email').value;
    var senha = document.getElementById('senha').value;
  
    // Verificar se os campos estão preenchidos
    if (email === '' || senha === '') {
      document.getElementById('mensagem').textContent = 'Por favor, preencha todos os campos.';
    } else {
      // Criar um objeto com os dados do usuário
      var usuario = {
        email: email,
        senha: senha
      };
  
      // Aqui você pode fazer o que quiser com o objeto 'usuario'
      // Por exemplo, enviar os dados para o servidor através de uma requisição AJAX

      const requestOptions = {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(usuario)
      };
    
      // Realiza a requisição para a API
      fetch('http://localhost:3000/api/users', requestOptions)
        .then(response => response.json())
        .then(data => {
            console.log('Entrou fora');
          // Processa a resposta da API
          if(data.autenticado){
            console.log('Entrou');
          }
          
        })
        .catch(error => {
          // Trata erros
          console.error('Erro:', error);
        });
  
      // Limpar os campos do formulário
      document.getElementById('nome').value = '';
      document.getElementById('email').value = '';
      document.getElementById('senha').value = '';
  
      // Exibir uma mensagem de sucesso
      document.getElementById('mensagem').className = '';
      document.getElementById('mensagem').textContent = 'Cadastro realizado com sucesso!';
    }
  });