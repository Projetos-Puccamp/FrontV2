window.addEventListener('DOMContentLoaded', function() {


  const requestOptions = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  };

  // Realiza a requisição para a API
  fetch('http://localhost:3000/api/users/curso', requestOptions)
    .then(response => response.json())
    .then(data => {
      // Processa a resposta da API
      if(data){
        alert('Nivel de Permissao' + data.em);
  } else {
    // O login falhou, exiba uma mensagem de erro ao usuário
    alert('Deu Xabu!');
  }
    })
    .catch(error => {
      // Trata erros
      console.error('Erro:', error);
    });

    
  });

  