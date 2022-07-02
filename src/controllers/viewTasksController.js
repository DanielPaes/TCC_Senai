// Select inputs

let inputDescription = document.querySelector('#input-description');
let inputDate = document.querySelector('#input-date');
let inputUserId = document.querySelector('#input-userid');
let inputTaskId = document.querySelector('#input-taskid');
let divJson = document.querySelector('#json');

// Select Buttons

let buttonConsultById = document.querySelector('#button-get-taskid');
let buttonSave = document.querySelector('#button-register-task');
let buttonGetAll = document.querySelector('#button-get-all');
let buttonCleanTask = document.querySelector('#clean-task');
let buttonEditTask = document.querySelector('#button-edittask');
let buttonDeleteTask = document.querySelector('#button-delete-task');

// Functions and validations

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

buttonSave?.addEventListener('click', async function(event){    
    event.preventDefault();
    let data = fillObject();

    if(validateDate(inputDate.value) && inputDescription.value) {
        try{
            await fetch('http://localhost:3000/api/v1/tasks', {
                method: "POST",
              body: JSON.stringify(data),
              headers: {"Content-type": "application/json; charset=UTF-8"}
            })
            .then(response => response.json()) 
            .then(json => {console.log(json); alert(json['_id'])});
        }catch(err){
            console.log(err.message);
        }   
    } else {
        alert("Not included.")
        if(!validateDate(inputDate.value)){
            console.log('Invalid date.')
        }
        if(!inputDescription.value){
            console.log('Insert a description.')
        }
    }    
});

buttonGetAll?.addEventListener('click', function(event){
    event.preventDefault();          
    window.open("http://localhost:3000/api/v1/tasks?page=1&limit=3");
});

buttonConsultById?.addEventListener('click', async function(event){
    event.preventDefault();

    try{
        await fetch(`http://localhost:3000/api/v1/tasks/${inputTaskId.value}`)
            .then((data) => data.json())
            .then((post) => {
                inputDescription.value = post['description'],
                inputDate.value = post['date'],
                inputUserId.value = post['user'],
                searchErr(post.message)
            })
    } catch(err){
        alert("Task not found.");
        console.log(err)
        cleanInputs2();        
    }
});

buttonCleanTask?.addEventListener('click', () =>{
    cleanInputs();
});

buttonEditTask?.addEventListener('click', function(event){
    event.preventDefault();
    let data = fillObject();

    if(validateDate(inputDate.value) && inputDescription.value){
        try{
            fetch(`http://localhost:3000/api/v1/tasks/${inputTaskId.value}`, {
                method: 'PUT', // Method itself
                headers: {
                    'Content-type': 'application/json; charset=UTF-8'
                },
                body: JSON.stringify(data) // We send data in JSON format
                }).then(tes => tes.json())
                    .then(data => alert(data.message));
                    //.then(cleanInputs2());                
        } catch(err){
            console.log(err.message);
            console.log('User not found.');
        }
    } else {
        alert('Edition failed.');
        throw new Error('Date or description incorrect.'); 
    }
});

buttonDeleteTask?.addEventListener('click', async function(event){
    event.preventDefault();
    try{
        await fetch(`http://localhost:3000/api/v1/tasks/${inputTaskId.value}`,
            {method: 'DELETE'})
            .then((data) => {console.log(data), console.log(alert((data['status'] === 204) ? 'Task deleted.' : 'Task not deleted.' ))})
            .then(() => inputTaskId.value = '');        
    } catch(err){
        console.log(err.message)
    }    
});