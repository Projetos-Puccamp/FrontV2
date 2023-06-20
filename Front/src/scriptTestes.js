window.addEventListener('DOMContentLoaded', function () {
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
        var countP = 1;
        Object.keys(Perguntas).forEach(key => {
          if (key !== '0') {
            var Pergunta = Perguntas[key];
            var div = document.createElement('div'); //vai ser necessario uma funcao na api q verifica as respostas
            div.innerHTML = `
          <form id ='${Pergunta.id}' >
          <label>${countP}: ${Pergunta.descricao}</label><br>
          <label for="${Pergunta.P1}">
            <input type="checkbox" id="${Pergunta.id}" name="options[]" value="${Pergunta.P1}">
            ${Pergunta.P1}
          </label><br>
          <label for="${Pergunta.P2}">
            <input type="checkbox" id="${Pergunta.id}" name="options[]" value="${Pergunta.P2}">
            ${Pergunta.P2}
          </label><br>
          <label for="${Pergunta.P3}">
            <input type="checkbox" id="${Pergunta.id}" name="options[]" value="${Pergunta.P3}">
            ${Pergunta.P3}
          </label><br>
          <label for="${Pergunta.P4}">
            <input type="checkbox" id="${Pergunta.id}" name="options[]" value="${Pergunta.P4}">
            ${Pergunta.P4}
          </label><br>
          <label for="${Pergunta.P5}">
            <input type="checkbox" id="${Pergunta.id}" name="options[]" value="${Pergunta.P5}">
            ${Pergunta.P5}
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
          }

          

        });
        var buttonContainer = document.createElement('div');
        buttonContainer.classList.add('button-container');
        buttonContainer.innerHTML = `
          <button class="btn-ver" id="submit-quiz">Enviar</button>
          <a class="btn-ver" href="Aresultados.html">Voltar</a>
        `;
        container.appendChild(buttonContainer);
        

      } else {
        alert('Deu Xabu!');
      }
      var submitBtn = document.getElementById("submit-quiz");

      submitBtn.addEventListener("click", function() {
        // Aqui você pode adicionar a lógica para voltar para a tela desejada
        // Por exemplo, redirecionar para outra página ou ocultar/mostrar elementos na tela
      
        // Exemplo de redirecionamento para outra página:
        window.location.href = "Aresultados.html";
      });
      
      
      document.getElementById('containerPergunta').addEventListener('submit', function(event) {
        event.preventDefault(); // Impede que o formulário seja enviado
      
        var form = event.target;
        var checkboxes = form.querySelectorAll('input[type="checkbox"]:checked');
        var selectedOptions = [];
        var selectedOptionsId = [];
        checkboxes.forEach(function(checkbox) {//salvar o id tbm para a comparacao com a resposta
          selectedOptions.push(checkbox.value);
          selectedOptionsId.push(checkbox.id);
        });
        
        if (selectedOptions.length > 0) {
          var message = 'Opções selecionadas: ' + selectedOptions.join(' ');
          var messageid = 'Opções selecionadas: ' + selectedOptionsId.join(' ');

          valoresSelecionados = {
          Respostas: selectedOptions,
          Idpergunta:selectedOptionsId,
          Status: Perguntas[0].status,
          IdUsuario: localStorage.getItem('id'),
          IdTreinamento: localStorage.getItem('idCodigotreinamento')
          }
          const requestOptions = {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(valoresSelecionados)
          };
          // Realiza a requisição para a API
          fetch('http://localhost:3001/api/users/verificaResp', requestOptions)
            .then(response => response.json())
            .then(data => {
              
              console.log(data);
              let red = data.result;
              if(red.status == 'C1'){
                window.location.href = 'case1.html';//manda pra outra tela
              }
            

            })
            .catch(error => {
              // Trata erros
              console.error('Erro:', error);
            });
         
          
        } else {
          alert('Nenhuma opção selecionada.');
        }
      });

    })
    .catch(error => {
      console.error('Erro:', error);
    });    

});
