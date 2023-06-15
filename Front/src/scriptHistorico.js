window.addEventListener('DOMContentLoaded', function() {
 
  var id = {
    id: localStorage.getItem('id'),

  };
    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(id)
    };

    // Realiza a requisição para a API
    fetch('http://localhost:3001/api/users/historico', requestOptions)
    .then(response => response.json())
    .then(dataC => {
      console.log('another onee:'+id);
      if (dataC && typeof dataC === 'object') {

        var historicos = dataC.result;
  

        var container = document.getElementById('container');
        var row = document.createElement('div');
        row.classList.add('row');
        container.appendChild(row);
        var count = 0;
        Object.keys(historicos).forEach(key => {
          var historico = historicos[key];

         // if(historico.status==='N'){

          var div = document.createElement('div');
          div.classList.add('resultado-card');
          div.innerHTML = `
            <p text=>Código do Treinamento: ${historico.codigoT}</p> 
            <p>Status: ${historico.status}</p> 
            <input text='${historico.local}' IdT='${historico.codigoT}' class="btn-ver" type="submit" value="Entrar">
          `; 
          row.appendChild(div);
          count++;
  
          if (count % 3 === 0) {
            row = document.createElement('div');
            row.classList.add('row');
            container.appendChild(row);
          }

       // }

        });

        addEventListener('submit', function(event) {
          event.preventDefault();
          
          var buttonClicked = event.target.querySelector('input[type="submit"]:focus');
          var Tela = buttonClicked.getAttribute('text');
          this.alert('Tela é'+ Tela);
          var buttonClicked2 = event.target.querySelector('input[type="submit"]:focus');
          var Codigo = buttonClicked2.getAttribute('IdT');
          localStorage.setItem('idCodigotreinamento',Codigo);
          window.location.href = Tela;//manda pra outra tela

        });

      } else {
        alert('Deu Xabu!');
      }
    })
    .catch(error => {
      console.error('Erro:', error);
    });
    
  }); 