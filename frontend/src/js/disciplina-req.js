var select = document.getElementById("nome-do-professor");
var professorContainer = document.getElementById("selecionar-professor");
var emailInput = document.getElementById("disciplina-email");

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

            dados.forEach(function(professor) {
                var option = document.createElement("option");
                option.textContent = professor.nome;
                select.appendChild(option);
            });

            select.addEventListener("change", function() {
                var selectedProfessor = select.value;
                var selectedProfessorData = dados.find(function(professor) {
                    return professor.nome === selectedProfessor;
                });

                if (selectedProfessorData) {
                    emailInput.value = selectedProfessorData.email;
                } else {
                    emailInput.value = "";
                }
            });
        })
        .catch((error) => {
            console.error(error);
        });
};

selecionarProfessorDisciplina();