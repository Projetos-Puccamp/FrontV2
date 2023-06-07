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
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(usuario)
      };
    
      // Realiza a requisição para a API
      fetch('http://localhost:3000/api/users/login', requestOptions)
        .then(response => response.json())
        .then(data => {
          // Processa a resposta da API
          if(data.autenticado){
            if(data.NvP=='1')
            window.location.href = 'alunos/Paluno.html';
            else if (data.NvP=='2')  window.location.href = 'mentor/Pmentor.html';
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