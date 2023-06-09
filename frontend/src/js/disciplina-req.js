var select = document.getElementById("nome-do-professor");
var professorContainer = document.getElementById("selecionar-professor");
var emailInput = document.getElementById("disciplina-email");

const inserirDiscplina = (disciplina = {}) => {
    const nomeDaDisciplina = document.getElementById('nome-da-disciplina').value;
    const professorId = document.getElementById('nome-do-professor').value;
    const diaSemana = document.getElementById('disciplina-dia-semana').value;
    const periodo = document.getElementById('disciplina-periodo').value;
    const salaId = document.getElementById('selecionar-sala').value;
    const quantidadeAlunos = document.getElementById('quantidade-de-alunos').value;

        fetch('http://localhost:3002/disciplina/inserir', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },

        body: JSON.stringify({nomeDisciplina: nomeDaDisciplina, professorId: professorId, diaSemana: diaSemana, periodo: periodo, salaId: salaId, quantidadeAlunos: quantidadeAlunos})

    }).then(async (resposta) => {
        mostrarMensagem(await resposta.json());
        console.log('Disciplina', disciplina);
        limparCampos();
    })
};

const carregarDisciplinas = () => {
    fetch('http://localhost:3002/disciplinas')
        .then((response) => {
            if (!response.ok) {
                throw new Error('Erro ao obter os dados das disciplinas');
            }
            return response.json();
        })
        .then((data) => {
            const dados = data.rows;
            console.log(data)

            document.getElementById('disciplinas').innerHTML = data.reverse().reduce((acumulador, disciplina) => {
                console.log('Discplina', disciplina)
                return acumulador + `
                <tr>
                <th "col-sm-3"><input class="formulario-alterar" type="text" id="disciplina-nome-${disciplina.id}" value="${disciplina.nome}"></th>
                <th class="col-sm-9">${disciplina.professor.nome}</th>
                <th class="col-sm-9">${disciplina.professor.email}</th>
                <th class="col-sm-9">${disciplina.sala.bloco_sala} - ${disciplina.sala.numero_sala}</th>
                <th class="col-sm-9"><input class="formulario-alterar" type="text" id="disciplina-dia-semana-${disciplina.id}" value="${disciplina.dia_semana}"></th>
                <th class="col-sm-9"><input class="formulario-alterar" type="text" id="disciplina-periodo-${disciplina.id}" value="${disciplina.periodo}"></th>
                <th class="col-sm-9"><button onclick="excluirDiscplina(${disciplina.id})" id="deletar" class="btn btn-success">Deletar</button></th>
                <th class="col-sm-9"><button onclick="alterarDiscplinas(${disciplina.id})" id="atualizar" class="btn btn-success">Atualizar</button></th>
            </tr>
                `;
            },
             '', );
            esconderIconeCarregando()
        })
        .catch((error) => {
            console.error(error);
        });
};
carregarDisciplinas()

const selecionarProfessorDisciplina = () => {
    fetch('http://localhost:3002/professores')
    .then((response) => {
            if (!response.ok) {
                throw new Error('Erro ao obter os dados dos professores');
            }
            return response.json();
        })
        .then((data) => {
            const rows = Array.isArray(data) ? data : [];
            const dados = data.rows;

            dados.forEach(function (professor) {
                var option = document.createElement("option");
                option.textContent = professor.nome;
                option.value = professor.id;
                select.appendChild(option);
            });

            select.addEventListener("change", function () {
                var professorSelecionado = select.value;
                var professorSelecionadoData = dados.find(function (professor) {
                    if(professor.id == professorSelecionado){
                        return professor;
                    }
                });
            });
        })
        .catch((error) => {
            console.error(error);
        });
};
selecionarProfessorDisciplina();

const excluirDiscplina = (id) => {
    fetch (`http://localhost:3002/disciplina/deletar/${id}`,{
        method: 'DELETE',
    }).then(async (resposta) => {
        mostrarMensagem(await resposta.json('Disciplina deletada com sucesso'));
    })
};