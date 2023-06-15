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
  fetch('http://localhost:3001/api/users/curso', requestOptions)
  .then(response => response.json())
  .then(dataC => {
    const ValorTeste =localStorage.getItem('id');
    console.log('another onee:'+ValorTeste);
    if (dataC && typeof dataC === 'object') {
      var cursos = dataC.result;

      var container = document.getElementById('container');

      var row = document.createElement('div');
      row.classList.add('row');
      container.appendChild(row);

      var count = 0;
      Object.keys(cursos).forEach(key => {
        var curso = cursos[key];
      
        var div = document.createElement('div');
        div.classList.add('curso-card');
        div.style.marginRight = '25px'
        div.innerHTML = `
          
          <h2 class="curso-titulo">${curso.nome}</h2>
          <p>Descrição: ${curso.descricao}</p>
          <p>Carga Horaria: ${curso.carga}</p>
          <p>Data Inicio: ${curso.inicio}</p>
          <p>Data Fim: ${curso.fim}</p>
          <input id='${curso.codigo}' text='${curso.codigo}' class="btn-inscrever-se" type="submit" value="Inscrever-se">
        `; 
        row.appendChild(div);
        count++;

        if (count % 1 === 0) {
          row = document.createElement('div');
          row.classList.add('row');
          container.appendChild(row);
        }
      });

    
    } else {
      alert('Deu Xabu!');
    }
  })
  .catch(error => {
    console.error('Erro:', error);
  });

  addEventListener('submit', function(event) {
    event.preventDefault();
    var buttonClicked = event.target.querySelector('input[type="submit"]:focus');
    var idTreinamento = buttonClicked.getAttribute('text');
    console.log('aaaaa:'+idTreinamento);
    var idUsuario = localStorage.getItem('id');
    console.log('aaaaaissii:'+idUsuario);

    var CursoTreinamento = {
      idTreinamento:idTreinamento,
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
      .then(data => {
      })
      .catch(error => {
        // Trata erros
        console.error('Erro:', error);
      });

  });


  });
  