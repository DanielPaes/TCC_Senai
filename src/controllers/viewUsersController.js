// Select buttons

let buttonGetAll = document.querySelector("#button-get-all");
let searchUser = document.querySelector("#edit-search");
let cleanUser = document.querySelector("#user-clean");
let buttonEditUser = document.querySelector('#edit-user');
let buttonDeleteUser = document.querySelector('#edit-delete');
let postUser = document.querySelector('#submit-user');

// Select inputs

let inputId = document.querySelector("#input-id-edit");
let inputName = document.querySelector("#input-name");
let inputCpf = document.querySelector("#input-cpf");
let inputBirthDate = document.querySelector("#input-birthdate");
let inputEmail = document.querySelector("#input-email");
let inputPassword = document.querySelector("#input-password");
let inputAddress = document.querySelector("#input-address");
let inputNumber = document.querySelector("#input-number");
let inputComplement = document.querySelector("#input-complement");
let inputCity = document.querySelector("#input-city");
let inputState = document.querySelector("#input-state");
let inputCountry = document.querySelector("#input-country");
let inputZipCode = document.querySelector("#input-zipcode");

// Functions and validations

function fillObject(){
    let _dataEdit = {
        name: inputName.value,
        cpf: inputCpf.value,
        birthDate: inputBirthDate.value,
        email: inputEmail.value,
        password: inputPassword.value,
        address: inputAddress.value,
        number: inputNumber.value,
        complement: inputComplement.value,
        city: inputCity.value,
        state: inputState.value,
        country: inputCountry.value,
        zipCode: inputZipCode.value
    }
    return _dataEdit;
}

function cleanObject(){
    inputName.value = '',
    inputCpf.value = '',
    inputBirthDate.value = '',
    inputEmail.value = '',
    inputPassword.value = '',
    inputAddress.value = '',
    inputNumber.value = '',
    inputComplement.value = '',
    inputCity.value = '',
    inputState.value = '',
    inputCountry.value = '',
    inputZipCode.value = ''
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

function validatePassword(password){
    if(password.length < 6){
        return false;
    } else {
        return true;
    } 
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
        inputName.value.length > 0 &&
        inputCpf.value.length > 0 &&
        inputBirthDate.value.length > 0 &&
        inputEmail.value.length > 0 &&
        inputPassword.value.length > 0 &&
        inputAddress.value.length > 0 &&
        inputNumber.value.length > 0 &&
        inputComplement.value.length > 0 &&
        inputCity.value.length > 0 &&
        inputState.value.length > 0 &&
        inputCountry.value.length > 0 &&
        inputZipCode.value.length > 0 
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
    if(!validatePassword(inputPassword.value)){
        console.log("Invalid password.");
    }
    if(!validateName(inputName.value)){
        console.log("Invalid name.");
    }
    let cpf = inputCpf.value.replaceAll(/[.-]/g, '');
    if(!validateCPF(cpf)){
        console.log("Invalid cpf.");
    }
    if(!validateEmail(inputEmail.value)){
        console.log("Invalid password.");
    }
    if(!validateAge()){
        console.log("Invalid age.");
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

postUser?.addEventListener('click', function(event){
    event.preventDefault();
    let cpf = inputCpf.value.replaceAll(/[.-]/g, '');
    if(validatePassword(inputPassword.value) 
        && validateName(inputName.value) 
        && validateCPF(cpf) 
        && validateEmail(inputEmail.value)
        && validateAge()
        && validateRequired()){
        try{
            let data = fillObject();
            fetch('http://localhost:3000/api/v1/users', {
                method: "POST",
                body: JSON.stringify(data),
                headers: {"Content-type": "application/json; charset=UTF-8"}
            }).then(response => response.json()) 
                .then(json => {console.log(json); alert(json['_id'])})
                .then(() => cleanObject());
        }catch(err){
            console.log(err.message);
        }   
    } else {
        messageErrorValidation();
        alert('User not created.')
        
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

cleanUser?.addEventListener('click' , function(event){
    event.preventDefault();
    cleanObject();
    inputId.value = '';
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