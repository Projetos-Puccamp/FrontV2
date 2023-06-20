document.getElementById('quiz-questions').addEventListener('submit', function(event) {
    event.preventDefault(); // Impede o envio do formulário

    var idQuiz = document.getElementById('idQuiz').value;
    var titulo = document.getElementById('titulo').value;

    var novoQuiz = {
        idQuiz: idQuiz,
        titulo: titulo
    };

    const requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(novoQuiz)
    };

    // Realiza a requisição para a API
    fetch('http://localhost:3001/api/adm/CriarQuiz', requestOptions)
        .then(response => response.json())
        .then(data => {
            // Processa a resposta da API
            alert('Quiz adicionado com sucesso');
        })
        .catch(error => {
            // Trata erros
            console.error('Erro:', error);
        });

    // Limpar os campos do formulário
    document.getElementById('idQuiz').value = '';
    document.getElementById('titulo').value = '';

    // Exibir uma mensagem de sucesso

});

