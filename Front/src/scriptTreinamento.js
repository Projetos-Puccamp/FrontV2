document.getElementById('form-treinamento').addEventListener('submit', function(event) {
  event.preventDefault(); // Impede o envio do formulário

  // Obter os valores dos campos do formulário
  var nome = document.getElementById('nome').value;
  var codigoQuiz = document.getElementById('codigoQuiz').value;
  var codigoConteudo = document.getElementById('codigoConteudo').value;
  var descricao = document.getElementById('descricao').value;
  var cargaHoraria = document.getElementById('carga-horaria').value;
  var dataInicio = document.getElementById('data-inscricao').value;
  var dataFim = document.getElementById('data-fim').value;

  var novoTreinamento = {
    nome: nome,
    codigoQuiz: codigoQuiz,
    codigoConteudo: codigoConteudo,
    descricao: descricao,
    cargaHoraria: cargaHoraria,
    dataInicio: dataInicio,
    dataFim: dataFim
  };

  // Aqui você pode fazer o que quiser com o objeto 'novoTreinamento'
  // Por exemplo, enviar os dados para o servidor através de uma requisição AJAX

  const requestOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(novoTreinamento)
  };

  // Realiza a requisição para a API
  fetch('http://localhost:3001/api/adm/CriarTreinamento', requestOptions)
    .then(response => response.json())
    .then(data => {
      // Processa a resposta da API
      alert('Treinamento adicionado com sucesso');
    })
    .catch(error => {
      // Trata erros
      console.error('Erro:', error);
    });

  // Limpar os campos do formulário
  document.getElementById('nome').value = '';
  document.getElementById('codigoQuiz').value = '';
  document.getElementById('codigoConteudo').value = '';
  document.getElementById('descricao').value = '';
  document.getElementById('carga-horaria').value = '';
  document.getElementById('data-inscricao').value = '';
  document.getElementById('data-fim').value = '';

  // Exibir uma mensagem de sucesso

});

// Adicionar DatePicker aos campos de data
$(function() {
  $("#data-inscricao").datepicker({
    dateFormat: "yy-mm-dd",
    changeYear: true,
    changeMonth: true,
    yearRange: "1900:2100",
    showButtonPanel: true,
    closeText: "Fechar"
  });
  
  $("#data-fim").datepicker({
    dateFormat: "yy-mm-dd",
    changeYear: true,
    changeMonth: true,
    yearRange: "1900:2100",
    showButtonPanel: true,
    closeText: "Fechar"
  });

});
