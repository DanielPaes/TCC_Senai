// Select inputs

let inputCpfPesquisa = document.querySelector('#paciente-cpf-pesquisa');
let inputNome = document.querySelector('#paciente-nome');
let inputCpf = document.querySelector('#paciente-cpf');
let inputNascimento = document.querySelector('#paciente-nascimento');
let inputAnotacoes = document.querySelector('#paciente-anotacoes');
let inputIsolamento = document.querySelector('#paciente-isolamento-sim');
let inputInicioIsolamento = document.querySelector('#paciente-inicio-isolamento');
let inputFimIsolamento = document.querySelector('#paciente-fim-isolamento');
let inputNomeMedico = document.querySelector('#paciente-nome-medico');
let inputCrmMedico = document.querySelector('#paciente-crm-medico');

// Select Buttons
let btnConcluirAtendimento = document.querySelector('#paciente-concluir-atendimento');
let btnPesquisarCpf = document.querySelector('#btn-pesquisar-cpf');

// Funções
let tempdata = {
    cep: "",
    cidade: "",
    crm_medico: "",
    data_fim: null,
    data_inicio: null,
    endereco: "",
    estado: "",
    id_cpf: "",
    isolamento: false,
    nascimento: "",
    nome: "",
    numero: "",
    telefone: "",
}

btnPesquisarCpf?.addEventListener('click', async function(event){
    event.preventDefault();
    console.log(inputCpfPesquisa.value);
    try{
        await fetch(`http://localhost:3000/pacientes/${inputCpfPesquisa.value}`)
            .then((data) => data.json())
            .then((post) => {
               console.log(post[0].cep);
               tempdata.cep = post[0].cep;
               tempdata.cidade = post[0].cidade;
               
               tempdata.endereco = post[0].endereco;
               tempdata.estado = post[0].estado;
               tempdata.id_cpf = post[0].id_cpf;

               let birthdatesplit = post[0].nascimento.split('T')[0].split('-');
               let nasci = [birthdatesplit[2], birthdatesplit[1], birthdatesplit[0]].join('/');
               inputNascimento.value = nasci;

               inputNome.value = post[0].nome;
               inputCpf.value = post[0].id_cpf;
               
               tempdata.nascimento = post[0].nascimento;
               tempdata.nome = post[0].nome;
               tempdata.numero = post[0].numero;
               tempdata.telefone = post[0].telefone;
               console.log(tempdata)

        });
    } catch(err){
        alert("Paciente não encontrado.");
    }
})

btnConcluirAtendimento?.addEventListener('click', function(event){
    event.preventDefault();
    console.log(tempdata);
    tempdata.anotacoes = inputAnotacoes.value;
    tempdata.crm_medico = inputCrmMedico.value;
               tempdata.data_fim = inputFimIsolamento.value !== "" ?  inputFimIsolamento.value : null;
               tempdata.data_inicio = inputInicioIsolamento.value !== "" ?  inputInicioIsolamento.value : null;
               tempdata.isolamento = inputIsolamento.checked;

    try{
        fetch(`http://localhost:3000/pacientes/${inputCpfPesquisa.value}`, {
            method: 'PUT', // Method itself
            headers: {
                'Content-type': 'application/json; charset=UTF-8'
            },
            body: JSON.stringify(tempdata) // We send data in JSON format
            }).then(tes => tes.json())
                .then(data => {alert("Atendimento finalizado."); window.location.reload();});
                               
    } catch(err){
        console.log(err.message);
    }
});

function fillObject(){
    let _dataEdit = {
        user: inputUserId.value,
        description: inputDescription.value,
        date: inputDate.value
    }
    return _dataEdit;
}

function cleanInputs(){
    //inputTaskId.value = '',
    inputDescription.value = '',
    inputDate.value = '',
    inputUserId.value = ''
}

function cleanInputs2(){
    inputTaskId.value = '',
    inputDescription.value = '',
    inputDate.value = '',
    inputUserId.value = ''
}