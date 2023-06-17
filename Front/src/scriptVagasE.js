window.addEventListener('DOMContentLoaded', function() {

    const requestOptions = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include'
      //body: JSON.stringify(usuario)
    };
  
    // Realiza a requisição para a API
    fetch('http://localhost:3001/api/users/vagas', requestOptions)
    .then(response => response.json())
    .then(dataC => {
        //const jsonString = JSON.stringify(dataC.result);
        //alert('essas sao as'+jsonString);
      if (dataC && typeof dataC === 'object') {
        var vagas = dataC.result;

        var container = document.getElementById('container');
  
        var row = document.createElement('div');
        row.classList.add('row');
        container.appendChild(row);
        var count = 0;
        
        Object.keys(vagas).forEach(key => {
          var vaga = vagas[key];
          var div = document.createElement('div');
          div.classList.add('vaga-card');
          div.style.marginRight = '25px'
          div.innerHTML = `
            <p>Codigo: ${vaga.codigo}</p>
            <p>Vaga: ${vaga.vaga}</p>
            <p>Descrição: ${vaga.descricao}</p>
            <p>Requisitos: ${vaga.requisitos}</p>
            <p>Faixa Salarial: ${vaga.salario}</p>
            <a class="btn-inscrever-se" href="atualizarVaga.html" id='${vaga.codigo}' >Alterar Vaga</a>
            <br>
          `;
          row.appendChild(div);
  
          count++;
  
          if (count % 2 === 0) {
            row = document.createElement('div');
            row.classList.add('row');
            container.appendChild(row);
          }
          var btnsInscrever = document.getElementsByClassName('btn-inscrever-se');
          Array.from(btnsInscrever).forEach(btn => {
            btn.addEventListener('click', function(event) {
              
              var vagaId = event.target.getAttribute('id');
              localStorage.setItem('IdVaga', vagaId);
            });

          });
        });
      } else {
        alert('Erro!');
      }
    })
    .catch(error => {
      console.error('Erro:', error);
    });
  
    });