document.getElementById('form-treinamento-vaga').addEventListener('submit', function(event) {
    event.preventDefault(); // Impede o envio do formulário
  
    // Obter os valores dos campos do formulário
    var idVemp = document.getElementById('IdVemp').value;
    var idTreinamento = document.getElementById('IdTreinamento').value;
alert('TESTE DUS BUTAO');
    var TreinamentoVaga = {
      idTreinamento:idTreinamento,
      idVemp: idVemp,
    };
  
    // Aqui você pode fazer o que quiser com o objeto 'novoTreinamento'
    // Por exemplo, enviar os dados para o servidor através de uma requisição AJAX
  
    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(TreinamentoVaga)
    };
    alert('Treinamento');
    // Realiza a requisição para a API
    fetch('http://localhost:3001/api/adm/Vaga_Treinamento', requestOptions)
      .then(response => response.json())
      .then(data => {
        // Processa a resposta da API
        alert('Treinamento adicionado a Vaga com  adicionado com sucesso');
      })
      .catch(error => {
        // Trata erros
        console.error('Erro:', error);
      });
  
    // Limpar os campos do formulário
 
    document.getElementById('IdVemp').value = '';
    document.getElementById('IdTreinamento').value = '';

  
    // Exibir uma mensagem de sucesso
  
  });