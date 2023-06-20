window.addEventListener('DOMContentLoaded', function() {
    IdTreinamento ={
        IdTreinamento: localStorage.getItem('idCodigotreinamento'),
    } 

    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify(IdTreinamento)
    };
  
    // Realiza a requisição para a API
    fetch('http://localhost:3001/api/users/case', requestOptions)
    .then(response => response.json())
    .then(dataC => {
        console.log('Teeste da chamda dos case');
      const ValorTeste =localStorage.getItem('id');
      console.log('another onee:'+ValorTeste);
      if (dataC && typeof dataC === 'object') {
        var cases = dataC.result;
  
        var container = document.getElementById('containerConteudo');
        var container2 = document.getElementById('containerBotao');
        var row = document.createElement('div');
        row.classList.add('row');
        container.appendChild(row);
  
        var count = 0;
        Object.keys(cases).forEach(key => {
          var curso = cases[key];
  
        var div = document.createElement('div');
        div.innerHTML = `
        <h1 class="curso-titulo">${curso.titulo2}</h1>
        <p class="curso-descricao">Descricao: ${curso.descricao2}</p>
        <p class="curso-video">Video: <a href="${curso.video2}" target="_blank">${curso.video2}</a></p>
      `; 
    row.appendChild(div);

          row.appendChild(div);
  
          count++;
  
          if (count % 1 === 0) {
            row = document.createElement('div');
            row.classList.add('row');
            container.appendChild(row);
            count=0;
          }
        });

        container2.innerHTML = `
       <a class="btn" href="testeaptidao.html">Fazer Teste do Case </a> 
      `; 


  
      
      } else {
        alert('Deu Xabu!');
      }
    })
    .catch(error => {
      console.error('Erro:', error);
    });
  
    
 
  
  
    });