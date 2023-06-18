document.getElementById('form-atualizar-treinamento').addEventListener('submit', function(event) {
    event.preventDefault(); // Impede o envio do formulário
  
    // Obter os valores dos campos do formulário
    var desc = document.getElementById('newdesc').value;
    var AltVaga = {
      desc: desc,
      IdTreinamento: localStorage.getItem('IdTreinamento')
    };
  
  
    const requestOptions = {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(AltVaga)
    };
    // Realiza a requisição para a API
    fetch('http://localhost:3001/api/adm/cads/attDesc', requestOptions)
      .then(response => response.json())
      .then(data => {
        // Processa a resposta da API
      })
      .catch(error => {
        // Trata erros
        console.error('Erro:', error);
      });
  
    // Limpar os campos do formulário
 
    document.getElementById('newdesc').value = '';

  
    // Exibir uma mensagem de sucesso
  
  });