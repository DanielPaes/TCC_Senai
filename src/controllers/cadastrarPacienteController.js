// Botões
let btnCadastrar = document.querySelector('#btn-paciente-cadastrar');
let btnLimpar = document.querySelector('#btn-paciente-limpar-campos');

// Inputs
let inputNome = document.querySelector('#paciente-nome');
let inputCpf = document.querySelector('#paciente-cpf');
let inputNascimento = document.querySelector('#paciente-nascimento');
let inputEmail = document.querySelector('#paciente-email');
let inputTelefone = document.querySelector('#paciente-telefone');
let inputEndereco = document.querySelector('#paciente-endereco');
let inputNumero = document.querySelector('#paciente-numero');
let inputCep = document.querySelector('#paciente-cep');
let inputCidade = document.querySelector('#paciente-cidade');
let inputEstado = document.querySelector('#paciente-estado');

// Funções
function verificaCartao(){
    if(inputCartaoAtivo.checked){
        return true;
    } else {
        return false;
    }
}

function fillObject(){
    let _dataEdit = {
        nome: inputNome.value,
        id_cpf: inputCpf.value,
        nascimento: inputNascimento.value,
        telefone: inputTelefone.value,
        email: inputEmail.value,
        cidade: inputCidade.value,
        estado: inputEstado.value,
        cep: inputCep.value,
        endereco: inputEndereco.value,
        numero: inputNumero.value
    }
    return _dataEdit;
}

// Validações
let validaNome = (nome) => {
    var padraoNome = /^[a-zA-Z\u00C0-\u00FF ]*$/gi;
    let texto = nome;
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
    if(email.length == 0){
        return true;
    }
    let padraoEmail = /^[\w._-]+@[\w_.-]+\.[\w]/gi;
    let texto = email;
    return padraoEmail.test(texto);
}

function messageErrorValidation(){
    if(!validaNome(inputNome.value)){
        console.log("Nome inválido");
    }    
    if(!validaCPF(inputCpf.value.replaceAll(/[.-]/g, ''))){
        console.log("CPF inválido");
    }
    if(!validaEmail(inputEmail.value)){
        console.log("Email inválido.");
    }
}

// Eventos
btnCadastrar.addEventListener('click', function(event){
    event.preventDefault();
    let cpf = inputCpf.value.replaceAll(/[.-]/g, '');
    if( validaNome(inputNome.value)
         && validaCPF(cpf)
         && validaEmail(inputEmail.value)){
    try{
        let data = fillObject();
        console.log(data);
        fetch('http://localhost:3000/pacientes', {
            method: "POST",
            body: JSON.stringify(data),
            headers: {"Content-type": "application/json; charset=UTF-8"}
        }).then(response => response.json()) 
            .then(json => {console.log(json);
                alert(json['_id']);
                window.location.reload();});
    }catch(err){
        console.log(err.message);
    }} else {
        messageErrorValidation();
        alert('Paciente não cadastrado.')
    }    
});

btnLimpar.addEventListener('click', function(event){
    event.preventDefault();
    window.location.reload();
});