let btnValidarCartao = document.querySelector('#btn-validar-cartao');

let inputCpf = document.querySelector('#valida-cpf');

let pacienteIsolamento = false; 
let usuarioCartaoAtivo = false;

let acessoLiberado = false;


btnValidarCartao?.addEventListener('click', async function(event){
    event.preventDefault();
    try{
        await fetch(`http://localhost:3000/pacientes/${inputCpf.value}`)
            .then((data) => data.json())
            .then((post) => { 
                pacienteIsolamento = post[0].isolamento;
        });
    } catch(err){
        alert("User not found 1.");
        console.log(inputCpf.value);
        cleanObject();
    }

    try{
        await fetch(`http://localhost:3000/usuarios/${inputCpf.value}`)
            .then((data) => data.json())
            .then((post) => { 
                usuarioCartaoAtivo = post[0].cartao_ativo});
    } catch(err){
        alert("User not found. 2");
        console.log(inputCpf.value);
    }

    console.log(pacienteIsolamento);
    console.log(usuarioCartaoAtivo);

    if(!pacienteIsolamento && usuarioCartaoAtivo){
        alert('Acesso liberado');
    } else {
        alert('Cartão bloqueado');
    }

})