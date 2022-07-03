// Select buttons

let buttonGetAll = document.querySelector("#button-get-all");
let searchUser = document.querySelector("#edit-search");
let cleanUser = document.querySelector("#user-clean");
let buttonEditUser = document.querySelector('#edit-user');
let buttonDeleteUser = document.querySelector('#edit-delete');
let postUser = document.querySelector('#submit-user');

let btnUsuarioLimparCampos = document.querySelector('#usuario-limpar-campos');
let btnUsuarioCadastrar = document.querySelector('#usuario-cadastrar');

// Select inputs

let inputNome = document.querySelector("#usuario-nome");
let inputCpf = document.querySelector("#usuario-cpf");
let inputNascimento = document.querySelector("#usuario-nascimento");
let inputEmail = document.querySelector("#usuario-email");
let inputTelefone = document.querySelector("#usuario-telefone");
let inputEndereco = document.querySelector("#usuario-endereco");
let inputNumero = document.querySelector("#usuario-numero");
let inputCep = document.querySelector("#usuario-cep");
let inputCidade = document.querySelector("#usuario-cidade");
let inputEstado = document.querySelector("#usuario-estado");
let inputCartaoAtivo = document.querySelector("#usuario-cartao-ativo");
let inputCartaoInativo = document.querySelector("#usuario-cartao-inativo");

// Functions and validations

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
        email: inputEmail.value,
        cidade: inputCidade.value,
        estado: inputEstado.value,
        cep: inputCep.value,
        endereco: inputEndereco.value,
        numero: inputNumero.value,
        cartao_ativo: verificaCartao()
    }
    return _dataEdit;
}

function cleanObject(){
    inputNome.value = '',
    inputCpf.value = '',
    inputNascimento.value = '',
    inputEmail.value = '',
    inputTelefone.value = '',
    inputEndereco.value = '',
    inputNumero.value = '',
    inputCep.value = '',
    inputCidade.value = '',
    inputEstado.value = '',
    inputCartao.value = ''
}

let validateName = (name) => {
    var padraoNome = /^[a-zA-Z\u00C0-\u00FF ]*$/gi;
    let texto = name;
    return padraoNome.test(texto);
}

function validateCPF(strCPF) {
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

function validateEmail(email){
    let padraoEmail = /^[\w._-]+@[\w_.-]+\.[\w]/gi;
    let texto = email;
    return padraoEmail.test(texto);
}

function validateAge(){
    let today = new Date();
    let birthdate = inputBirthDate.value;
    let birthdatesplit = birthdate.split('T')[0].split('-');
    let birthYear = birthdatesplit[0];
    let birthMonth = birthdatesplit[1];
    let birthDay = birthdatesplit[2];
    let nascimento = new Date(birthYear, (birthMonth - 1), birthDay);    
    let diferencaAnos = today.getFullYear() - nascimento.getFullYear();

    if ( new Date(today.getFullYear(), today.getMonth(), today.getDate()) < 
        new Date(today.getFullYear(), nascimento.getMonth(), nascimento.getDate()) )
        diferencaAnos--;      
    
    if(diferencaAnos < 18){
        return false;
    } else{
        return true;
    }
}

function validateRequired(){
    if(
        inputNome.value.length > 0 &&
        inputCpf.value.length > 0 &&
        inputNascimento.value.length > 0 &&
        inputCidade.value.length > 0 &&
        inputEstado.value.length > 0 &&
        inputCep.value.length > 0 &&
        inputEndereco.value.length > 0 &&
        inputNumero.value.length > 0
    ) {
        return true;
    } else{
        return false;
    }
}

function getBirthDay(bday){
    let bday2 = bday.split('T')[0];
    return bday2;
}

function messageErrorValidation(){
  
    if(!validateName(inputNome.value)){
        console.log("Invalid name.");
    }
    let cpf = inputCpf.value.replaceAll(/[.-]/g, '');
    if(!validateCPF(cpf)){
        console.log("Invalid cpf.");
    }
    if(!validateEmail(inputEmail.value)){
        console.log("Invalid email.");
    }
    if(!validateRequired()){
        console.log("All inputs must be fill.");
    }
}

// HTTP methods

buttonGetAll?.addEventListener('click', function(event){
    event.preventDefault();
    fetch('http://localhost:3000/api/v1/users')
        .then((data) => data.json())
        .then((post) => {
            console.log(post);
            window.open("http://localhost:3000/api/v1/users?page=1&limit=3");
        })
})

btnUsuarioCadastrar.addEventListener('click', function(event){
    event.preventDefault();
    let cpf = inputCpf.value.replaceAll(/[.-]/g, '');
    if( validateName(inputNome.value) 
        && validateCPF(cpf) 
        && validateEmail(inputEmail.value)
        && validateRequired()){

            let data = fillObject();

            console.log(data)
        try{
           // let data = fillObject();
            fetch('http://localhost:3000/usuarios', {
                method: "POST",
                body: JSON.stringify(data),
                headers: {"Content-type": "application/json; charset=UTF-8"}
            }).then(response => response.json()) 
                .then(json => {console.log(json); alert(json['_id'])})
                ;
        }catch(err){
            console.log(err.message);
        }   
    } else {
        messageErrorValidation();
        alert('Usuário não cadastrado.')
        
    }    
})



searchUser?.addEventListener('click', async function(event){
    event.preventDefault();
    try{
        await fetch(`http://localhost:3000/api/v1/users/${inputId.value}`)
            .then((data) => data.json())
            .then((post) => {
                inputName.value = post['name'],
                inputCpf.value = post['cpf'],
                inputBirthDate.value = getBirthDay(post['birthDate']),
                inputEmail.value = post['email'],
                inputPassword.value = post['password'],
                inputAddress.value = post['address'],
                inputNumber.value = post['number'],
                inputComplement.value = post['complement'],
                inputCity.value = post['city'],
                inputState.value = post['state'],
                inputCountry.value = post['country'],
                inputZipCode.value = post['zipCode']                
        });
    } catch(err){
        alert("User not found.");
        cleanObject();
    }
})

btnUsuarioLimparCampos?.addEventListener('click' , function(event){
    event.preventDefault();
    console.log('teste')
    cleanObject();
})

buttonEditUser?.addEventListener('click', async function(event){
    event.preventDefault();
    let cpf = inputCpf.value.replaceAll(/[.-]/g, '')
    if(validatePassword(inputPassword.value) 
    && validateName(inputName.value) 
    && validateCPF(cpf) 
    && validateEmail(inputEmail.value)
    && validateAge()
    && validateRequired()){
        try{
            let data = fillObject();
            await fetch(`http://localhost:3000/api/v1/users/${inputId.value}`, {
                method: 'PUT', // Method itself
                headers: {
                    'Content-type': 'application/json; charset=UTF-8'
                },
                body: JSON.stringify(data) // We send data in JSON format
                }).then(tes => tes.json())
                    .then(data => console.log(data), alert('User sucessfully updated'));
        } catch(err){
            console.log(err.message)
        }
    } else {
        messageErrorValidation();
        alert('Not edited.')
    } 
})

buttonDeleteUser?.addEventListener('click', async function(event){
    event.preventDefault();
    try{
        await fetch(`http://localhost:3000/api/v1/users/${inputId.value}`, {method: 'DELETE'})
        .then((data) => {console.log(data), console.log(alert((data['status'] === 204) ? 'User deleted.' : 'User not deleted.' ))})
        .then(() => cleanObject())
        .then(() => inputId.value = '');        
    } catch(err){
        console.log(err.message);
    }
})