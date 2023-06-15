window.addEventListener('DOMContentLoaded', function() {
  //alert(localStorage.getItem('idCodigotreinamento'));
  // alert(localStorage.getItem('id'));

  var Ids = {
    IdTreinamento: localStorage.getItem('idCodigotreinamento'),
    IdUser: localStorage.getItem('id')
  };
  //Mudar o titulo de acordo com o status em idtreinamento aluno
  //Para fazer um q funcione para todos os testes;
  //Primeiro verificar o status do aluno neste curso+
  //Pegar as perguntas em treinamentoshasquiz --> quiz --> where status == status do aluno no curso

  alert('entrou em testes');

  const requestOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify(Ids)
  };

  // Realiza a requisição para a API
  fetch('http://localhost:3001/api/users/teste', requestOptions)
    .then(response => response.json())
    .then(dataC => {
      var Perguntas = dataC.result;
      var Titulo = document.getElementById('ContainerTitulo');
      Titulo.innerHTML = `<div>${Perguntas[0].titulo}</div>`;

      if (dataC && typeof dataC === 'object') {
        var container = document.getElementById('containerPergunta');

        var row = document.createElement('div');
        row.classList.add('row');
        container.appendChild(row);

        var count = 0;
        var countP = 0;
        Object.keys(Perguntas).forEach(key => {
          var Pergunta = Perguntas[key];
          var div = document.createElement('div'); //vai ser necessario uma funcao na api q verifica as respostas
          div.innerHTML = `
          <form id ='${Pergunta.id}' >
          <label>${countP}: ${Pergunta.descricao}</label><br>
          <label for="${Pergunta.P1}">
            <input type="checkbox" id="${Pergunta.P1}" name="options[]" value="${Pergunta.P1}">
            ${Pergunta.P1}
          </label><br>
          <label for="${Pergunta.P2}">
            <input type="checkbox" id="${Pergunta.P2}" name="options[]" value="${Pergunta.P2}">
            ${Pergunta.P2}
          </label><br>
          <label for="${Pergunta.P3}">
            <input type="checkbox" id="${Pergunta.P3}" name="options[]" value="${Pergunta.P3}">
            ${Pergunta.P3}
          </label><br>
          <label for="${Pergunta.P4}">
            <input type="checkbox" id="${Pergunta.P4}" name="options[]" value="${Pergunta.P4}">
            ${Pergunta.P4}
          </label><br>
        </form>
          `;
          var containerPergunta = document.getElementById('containerPergunta');
          containerPergunta.appendChild(div);

          // Adicionar o listener apenas para os checkboxes dentro dessa div
          var checkboxes = div.querySelectorAll('input[type="checkbox"]');
          checkboxes.forEach(checkbox => {
            checkbox.addEventListener('change', () => {
              if (checkbox.checked) {
                checkboxes.forEach(cb => {
                  if (cb !== checkbox) {
                    cb.checked = false;
                  }
                });
              }
            });
          });

          row.appendChild(div);
          countP++;
          count++;

          if (count % 2 === 0) {
            row = document.createElement('div');
            row.classList.add('row');
            container.appendChild(row);
            count = 0;
          }

          //event listener aguardando a pergunta ser respondida, entao verifica a partir do id da mesma se o valor selecionado para
          //cada idPergunta corresponde a sua resposta, fazer um para cada pergunta, da pra utilizar o count P para identificar cada uma
          div.addEventListener('submit', function(event) {
            event.preventDefault();
            var buttonClicked = event.target.querySelector('input[type="submit"]:focus');
            var idPergunta = buttonClicked.getAttribute('idPergunta');

            var CursoTreinamento = {
              idTreinamento: idTreinamento,
              idUsuario: idUsuario,
            };

            const requestOptions = {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify(CursoTreinamento)
            };

            fetch('http://localhost:3001/api/adm/Aluno_Treinamento', requestOptions)
              .then(response => response.json())
              .then(data => {})
              .catch(error => {
                // Trata erros
                console.error('Erro:', error);
              });
          });
        });
      } else {
        alert('Deu Xabu!');
      }
    })
    .catch(error => {
      console.error('Erro:', error);
    });
});
