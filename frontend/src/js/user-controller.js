const inserirDiscplina = (disciplina = {}) => {
    const nomeDaDisciplina = document.getElementById('nome-da-disciplina').value;
    const professorId = document.getElementById('nome-do-professor').value;
    const email = document.getElementById('disciplina-email').value;
    const diaSemana = document.getElementById('disciplina-dia-semana').value;
    const periodo = document.getElementById('disciplina-periodo').value;

        fetch('http://localhost:3002/disciplina/inserir', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },

        body: JSON.stringify({nomeDisciplina: nomeDaDisciplina, professorId: professorId, emailProfessor: email, diaSemana: diaSemana, periodo: periodo})

    }).then(async (resposta) => {
        mostrarMensagem(await resposta.json());
        console.log('Disciplina', disciplina);
        limparCampos();
    })
};

//requisições de professores

const inserirProfessor = (professor = {}) => {
    const nome = document.getElementById('nome').value;
    const formacao = document.getElementById('formacao').value;
    const email = document.getElementById('email').value;
        fetch('http://localhost:3002/professor/inserir', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
        body: JSON.stringify({nomeProfessor: nome, formacaoProfessor: formacao, emailProfessor: email})
    }).then(async (resposta) => {
        mostrarMensagem(await resposta.json());
        console.log('professor', professor);
        limparCampos()
    })
};