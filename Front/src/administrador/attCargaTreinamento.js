document.getElementById('form-atualizar-treinamento').addEventListener('submit', function(event) {
    event.preventDefault(); // Impede o envio do formulário
  
    // Obter os valores dos campos do formulário
    var req = document.getElementById('newcarga').value;
    var AltReq = {
      carga: req,
      IdTreinamento: localStorage.getItem('Idtreinamento')
    };
  
  
    const requestOptions = {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(AltReq)
    };
    // Realiza a requisição para a API
    fetch('http://localhost:3001/api/adm/cads/attCarga', requestOptions)
      .then(response => response.json())
      .then(data => {
        // Processa a resposta da API
      })
      .catch(error => {
        // Trata erros
        console.error('Erro:', error);
      });
  
    // Limpar os campos do formulário
 
    document.getElementById('newreq').value = '';

  
    // Exibir uma mensagem de sucesso
  
  });