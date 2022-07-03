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

let btnConcluirAtendimento = document.querySelector('#paciente-concluir-atendimento');
let btnPesquisarCpf = document.querySelector('#btn-pesquisar-cpf');


// Select Buttons

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


// Functions and validations

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
               
               tempdata.nascimento = post[0].nascimento;
               tempdata.nome = post[0].nome;
               tempdata.numero = post[0].numero;
               tempdata.telefone = post[0].telefone;
               console.log(tempdata)

        });
    } catch(err){
        alert("User not found.");
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
                .then(data => {alert(data.message); console.log('entrou no try')});
                //.then(cleanInputs2());                
    } catch(err){
        console.log(err.message);
        console.log('User not found.');
    }
    

});


// buttonEditTask?.addEventListener('click', function(event){
//         event.preventDefault();
//         let data = fillObject();
    
//         if(validateDate(inputDate.value) && inputDescription.value){
//             try{
//                 fetch(`http://localhost:3000/api/v1/tasks/${inputTaskId.value}`, {
//                     method: 'PUT', // Method itself
//                     headers: {
//                         'Content-type': 'application/json; charset=UTF-8'
//                     },
//                     body: JSON.stringify(data) // We send data in JSON format
//                     }).then(tes => tes.json())
//                         .then(data => alert(data.message));
//                         //.then(cleanInputs2());                
//             } catch(err){
//                 console.log(err.message);
//                 console.log('User not found.');
//             }
//         } else {
//             alert('Edition failed.');
//             throw new Error('Date or description incorrect.'); 
//         }
//     });


function fillObject(){
    let _dataEdit = {
        user: inputUserId.value,
        description: inputDescription.value,
        date: inputDate.value
    }
    return _dataEdit;
}

function validateDate(date){
    let now = new Date();
    let dateTask = new Date(date)
    if(dateTask > now){
        return true;
    } else {
        return false;
    }
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

function searchErr(value){
    if(value === 'Id not finded' || inputTaskId.value === ''){
        throw new Error('Task not found');
    }
}

// HTTP methods

// buttonSave?.addEventListener('click', async function(event){    
//     event.preventDefault();
//     let data = fillObject();

//     if(validateDate(inputDate.value) && inputDescription.value) {
//         try{
//             await fetch('http://localhost:3000/api/v1/tasks', {
//                 method: "POST",
//               body: JSON.stringify(data),
//               headers: {"Content-type": "application/json; charset=UTF-8"}
//             })
//             .then(response => response.json()) 
//             .then(json => {console.log(json); alert(json['_id'])});
//         }catch(err){
//             console.log(err.message);
//         }   
//     } else {
//         alert("Not included.")
//         if(!validateDate(inputDate.value)){
//             console.log('Invalid date.')
//         }
//         if(!inputDescription.value){
//             console.log('Insert a description.')
//         }
//     }    
// });

// buttonGetAll?.addEventListener('click', function(event){
//     event.preventDefault();          
//     window.open("http://localhost:3000/api/v1/tasks?page=1&limit=3");
// });

// buttonConsultById?.addEventListener('click', async function(event){
//     event.preventDefault();

//     try{
//         await fetch(`http://localhost:3000/api/v1/tasks/${inputTaskId.value}`)
//             .then((data) => data.json())
//             .then((post) => {
//                 inputDescription.value = post['description'],
//                 inputDate.value = post['date'],
//                 inputUserId.value = post['user'],
//                 searchErr(post.message)
//             })
//     } catch(err){
//         alert("Task not found.");
//         console.log(err)
//         cleanInputs2();        
//     }
// });

// buttonCleanTask?.addEventListener('click', () =>{
//     cleanInputs();
// });

// buttonEditTask?.addEventListener('click', function(event){
//     event.preventDefault();
//     let data = fillObject();

//     if(validateDate(inputDate.value) && inputDescription.value){
//         try{
//             fetch(`http://localhost:3000/api/v1/tasks/${inputTaskId.value}`, {
//                 method: 'PUT', // Method itself
//                 headers: {
//                     'Content-type': 'application/json; charset=UTF-8'
//                 },
//                 body: JSON.stringify(data) // We send data in JSON format
//                 }).then(tes => tes.json())
//                     .then(data => alert(data.message));
//                     //.then(cleanInputs2());                
//         } catch(err){
//             console.log(err.message);
//             console.log('User not found.');
//         }
//     } else {
//         alert('Edition failed.');
//         throw new Error('Date or description incorrect.'); 
//     }
// });

// buttonDeleteTask?.addEventListener('click', async function(event){
//     event.preventDefault();
//     try{
//         await fetch(`http://localhost:3000/api/v1/tasks/${inputTaskId.value}`,
//             {method: 'DELETE'})
//             .then((data) => {console.log(data), console.log(alert((data['status'] === 204) ? 'Task deleted.' : 'Task not deleted.' ))})
//             .then(() => inputTaskId.value = '');        
//     } catch(err){
//         console.log(err.message)
//     }    
// });