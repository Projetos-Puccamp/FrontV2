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
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
            
        },
        body: JSON.stringify(usuario),
        credentials: 'include'
      };
      // Realiza a requisição para a API
      fetch('http://localhost:3001/api/users/login', requestOptions)
        .then(response => response.json())
        .then(data => {
          localStorage.setItem('id', data.id );
          
          // Processa a resposta da API
          if(data.autenticado){
            window.location.href = data.Local;//manda pra outra tela
      } else {
        // O login falhou, exiba uma mensagem de erro ao usuário
        document.getElementById('mensagem').textContent = 'Credenciais inválidas. Tente novamente.';
      }
        })
        .catch(error => {
          // Trata erros
          console.error('Erro:', error);
        });
  
      // Limpar os campos do formulário
      document.getElementById('email').value = '';
      document.getElementById('senha').value = '';
    }
  });
  
  