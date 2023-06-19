document.getElementById('form-treinamento').addEventListener('submit', function(event) {
    event.preventDefault(); // Impede o envio do formulário
  
    // Obter os valores dos campos do formulário
    var codigoConteudo = document.getElementById('codigoConteudo').value;
    var Titulo1 = document.getElementById('Titulo1').value;
    var Titulo2 = document.getElementById('Titulo2').value;
    var descricao1 = document.getElementById('Desc1').value;
    var descricao2 = document.getElementById('Desc2').value;
    var link1 = document.getElementById('link1').value;
    var link2 = document.getElementById('link2').value;
  
    var novoConteudo = {
      Titulo1: Titulo1,
      Titulo2: Titulo2,
      codigoConteudo: codigoConteudo,
      descricao1: descricao1,
      descricao2: descricao2,
      link1: link1,
      link2: link2
    };
  
    // Aqui você pode fazer o que quiser com o objeto 'novoTreinamento'
    // Por exemplo, enviar os dados para o servidor através de uma requisição AJAX
  
    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(novoConteudo)
    };
  
    // Realiza a requisição para a API
    fetch('http://localhost:3001/api/adm/CriarConteudo', requestOptions)
      .then(response => response.json())
      .then(data => {
        // Processa a resposta da API
        alert('Conteudo adicionado com sucesso');
      })
      .catch(error => {
        // Trata erros
        console.error('Erro:', error);
      });
  
    // Limpar os campos do formulário
    document.getElementById('codigoConteudo').value = '';
    document.getElementById('Titulo1').value = '';
    document.getElementById('Titulo2').value = '';
    document.getElementById('Desc1').value = '';
    document.getElementById('Desc2').value = '';
    document.getElementById('link1').value = '';
    document.getElementById('link2').value = '';
  
    // Exibir uma mensagem de sucesso
  
  });
  