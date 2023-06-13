document.getElementById('formvaga').addEventListener('submit', function(event) {
    event.preventDefault(); // Impede o envio do formulário

    // Obter os valores dos campos do formulário
    var idEmp = localStorage.getItem('id');
    console.log("testando a maldita memoria"+idEmp);
    var titulo = document.getElementById('titulo').value;
    console.log("testando a maldita memoriasss"+titulo);
    var descricao = document.getElementById('descricao').value;
    var requisitos = document.getElementById('requisitos').value;
    var fxsal = document.getElementById('faixa-salarial').value;
 
      var NovaVaga = {
        id: idEmp,
        titulo: titulo,
        descricao: descricao,
        requisitos: requisitos,
        fxsal: fxsal
      };
  
      // Aqui você pode fazer o que quiser com o objeto 'usuario'
      // Por exemplo, enviar os dados para o servidor através de uma requisição AJAX

      const requestOptions = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(NovaVaga)
      };
    
      // Realiza a requisição para a API
      fetch('http://localhost:3001/api/emps/cads', requestOptions)
        .then(response => response.json())
        .then(data => {
          // Processa a resposta da API
          console.log(data);
        })
        .catch(error => {
          // Trata erros
          console.error('Erro:', error);
        });
  
      // Limpar os campos do formulário
    document.getElementById('titulo').value ='';
    document.getElementById('descricao').value='';
     document.getElementById('requisitos').value='';
     document.getElementById('faixa-salarial').value=''; 
  
      // Exibir uma mensagem de sucesso
    
  });   