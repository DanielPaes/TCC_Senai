// Botões

let btnConsultarTodosUsuarios = document.querySelector('#consultar-todos-usuarios');
let btnConsultarUsuarioCpf = document.querySelector('#btn-consultar-usuario');
let btnLimparCampos = document.querySelector('#btn-apagar-campos');
let btnEditar = document.querySelector('#btn-editar');
let btnDeletar = document.querySelector('#btn-deletar');

// Select inputs

let inputConsultarCpf = document.querySelector('#consultar-cpf');
let inputNome = document.querySelector("#usuario-nome");
let inputCpf = document.querySelector("#usuario-cpf");
let inputNascimento = document.querySelector("#usuario-nascimento");
let inputTelefone = document.querySelector("#usuario-telefone");
let inputEndereco = document.querySelector("#usuario-endereco");
let inputEmail = document.querySelector("#usuario-email");
let inputNumero = document.querySelector("#usuario-numero");
let inputCep = document.querySelector("#usuario-cep");
let inputCidade = document.querySelector("#usuario-cidade");
let inputEstado = document.querySelector("#usuario-estado");
let inputCartaoAtivo = document.querySelector("#usuario-cartao-ativo");

// Functions and validations

function fillObject(){
    let _dataEdit = {
        nome: inputNome.value,
        id_cpf: inputCpf.value,
        nascimento: inputNascimento.value,
        email: inputEmail.value,
        cidade: inputCidade.value,
        estado: inputEstado.value,
        cep: inputCep.value,
        endereco: inputEndereco.value,
        numero: inputNumero.value
    }
    return _dataEdit;
}

let validaNome = (name) => {
    var padraoNome = /^[a-zA-Z\u00C0-\u00FF ]*$/gi;
    let texto = name;
    return padraoNome.test(texto);
}

function validaCPF(strCPF) {
    var Soma;
    var Resto;
    Soma = 0;

    if(strCPF.length != 11) return false;

    if (strCPF == "00000000000") return false;

    for (i=1; i<=9; i++) Soma = Soma + parseInt(strCPF.substring(i-1, i)) * (11 - i);
    Resto = (Soma * 10) % 11;

    if ((Resto == 10) || (Resto == 11))  Resto = 0;
    if (Resto != parseInt(strCPF.substring(9, 10)) ) return false;

    Soma = 0;
    for (i = 1; i <= 10; i++) Soma = Soma + parseInt(strCPF.substring(i-1, i)) * (12 - i);
    Resto = (Soma * 10) % 11;

    if ((Resto == 10) || (Resto == 11))  Resto = 0;
    if (Resto != parseInt(strCPF.substring(10, 11) ) ) return false;
    return true;
}

function validaEmail(email){
    let padraoEmail = /^[\w._-]+@[\w_.-]+\.[\w]/gi;
    let texto = email;
    return padraoEmail.test(texto);
}

function messageErrorValidation(){
  
    if(!validaNome(inputNome.value)){
        console.log("Nome inválido.");
    }
    if(!validaCPF(inputCpf.value.replaceAll(/[.-]/g, ''))){
        console.log("CPF inválido.");
    }
}

// HTTP methods

btnConsultarTodosUsuarios?.addEventListener('click', function(event){
    event.preventDefault();
    fetch('http://localhost:3000/pacientes/')
        .then((data) => data.json())
        .then((post) => {
            console.log(post);
            window.open("http://localhost:3000/pacientes?page=1&limit=3");
        })
})

btnLimparCampos.addEventListener('click', function(){
    window.location.reload();
});

btnDeletar?.addEventListener('click', async function(event){
    event.preventDefault();
    try{
        console.log(inputId)

        console.log(`http://localhost:3000/pacientes/${inputId}`);
        let id = inputId.value;
        await fetch(`http://localhost:3000/pacientes/${inputId}`, {method: 'DELETE'})
        .then((data) => {console.log(data), console.log(alert('Usuário deletado.'))})
        //.then(() => cleanObject())
        .then(() => window.location.reload());        
    } catch(err){
        console.log(err.message);
    }
});

btnConsultarUsuarioCpf?.addEventListener('click', async function(event){
    event.preventDefault();
    try{
        await fetch(`http://localhost:3000/pacientes/${inputConsultarCpf.value}`)
            .then((data) => data.json())
            .then((post) => {
                inputNome.value = post[0].nome;
                inputCpf.value = post[0].id_cpf;
                inputNascimento.value = post[0].nascimento.split('T')[0];
                inputCidade.value = post[0].cidade;
                inputTelefone.value = post[0].telefone;
                inputEmail.value = post[0].email;
                inputEstado.value = post[0].estado;
                inputCep.value = post[0].cep;
                inputEndereco.value = post[0].endereco;
                inputNumero.value = post[0].numero;
                inputId = post[0]._id;
                console.log(inputId)
        });
    } catch(err){
        alert("Usuário não encontrado.");
    }
});

btnEditar?.addEventListener('click', async function(event){
    event.preventDefault();
    let cpf = inputCpf.value.replaceAll(/[.-]/g, '')
    if(validaNome(inputNome.value) 
    && validaCPF(cpf)
    && validaEmail(inputEmail.value)){
        try{
            let data = fillObject();
            console.log(data);
            await fetch(`http://localhost:3000/pacientes/${inputCpf.value}`, {
                method: 'PUT', // Method itself
                headers: {
                    'Content-type': 'application/json; charset=UTF-8'
                },
                body: JSON.stringify(data) // We send data in JSON format
                }).then(tes => tes.json())
                    .then(data => console.log(data), alert('Paciente editado.'));
        } catch(err){
            console.log(err.message)
        }
    } else {
        messageErrorValidation();
        alert('Não editado.')
    }});