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
  fetch('http://localhost:3001/api/adm/buscaconteudo', requestOptions)
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
      console.log('teste de rota do ver treinamentos+cursos');
      Object.keys(cursos).forEach(key => {
        var conteudo = cursos[key];
        var div = document.createElement('div');
        div.classList.add('conteudo-card');
        div.style.marginRight = '25px'
        div.innerHTML = `
          
        <h2>Id Conteudo: ${conteudo.idconteudo}</h2>
        <p>Titulo 1: ${conteudo.titulo}</p>
        <p>Titulo 2: ${conteudo.titulo2}</p> 
        <p>Descrição 1: ${conteudo.descricao}</p> 
        <p>Descrição 1: ${conteudo.descricao2}</p> 
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


  });
  