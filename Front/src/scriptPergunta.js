document.getElementById('quiz-questions').addEventListener('submit', function(event) {
    event.preventDefault(); // Impede o envio do formulário
    // Obter os valores dos campos do formulário
        const checkboxes = document.querySelectorAll('input[type="checkbox"]');
        let selectedValue = '';

        checkboxes.forEach((checkbox) => {
            if (checkbox.checked) {
                selectedValue = checkbox.value;
            }
        });

    var idQuiz = document.getElementById('idQuiz').value;
    var pergunta = document.getElementById('pergunta1').value;
    var respostaA = document.getElementById('resposta1').value;
    var respostaB = document.getElementById('resposta2').value;
    var respostaC = document.getElementById('resposta3').value;
    var respostaD = document.getElementById('resposta4').value;
    var respostaE = document.getElementById('resposta5').value;
    var respostaCorreta = document.getElementById('respostaCorreta').value;

    var novaPergunta = {
        idQuiz: idQuiz,
        tipoPergunta: selectedValue,
        pergunta: pergunta,
        respostaA: respostaA,
        respostaB: respostaB,
        respostaC: respostaC,
        respostaD: respostaD,
        respostaE: respostaE,
        respostaCorreta: respostaCorreta
    };

    // Aqui você pode fazer o que quiser com o objeto 'novaPergunta'
    // Por exemplo, enviar os dados para o servidor através de uma requisição AJAX

    const requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(novaPergunta)
    };

    // Realiza a requisição para a API
    fetch('http://localhost:3001/api/adm/CriarPergunta', requestOptions)
        .then(response => response.json())
        .then(data => {
            // Processa a resposta da API
            alert('Pergunta adicionada com sucesso');
        })
        .catch(error => {
            // Trata erros
            console.error('Erro:', error);
        });

    // Limpar os campos do formulário
    document.getElementById('idQuiz').value = '';
    document.getElementById('TipoPergunta').value = '';
    document.getElementById('pergunta1').value = '';
    document.getElementById('resposta1').value = '';
    document.getElementById('resposta2').value = '';
    document.getElementById('resposta3').value = '';
    document.getElementById('resposta4').value = '';
    document.getElementById('resposta5').value = '';
    document.getElementById('respostaCorreta').value = '';

    // Exibir uma mensagem de sucesso

});

