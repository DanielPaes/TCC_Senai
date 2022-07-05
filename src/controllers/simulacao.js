// Botao Validar
let btnValidarCartao = document.querySelector('#btn-validar-cartao');

// Input CPF
let inputCpf = document.querySelector('#valida-cpf');

// Evento Botão
btnValidarCartao?.addEventListener('click', async function(event){
    event.preventDefault();
    let pacienteIsolamento = false; 
    let usuarioCartaoAtivo = false;
    let usuarioInexistente = false;

    try{
        await fetch(`http://localhost:3000/pacientes/${inputCpf.value}`)
            .then((data) => data.json())
            .then((post) => { 
                pacienteIsolamento = post[0].isolamento;
        });
    } catch(err){
        console.log('Usuário não cadastrado no SUS.');
    }

    try{
        await fetch(`http://localhost:3000/usuarios/${inputCpf.value}`)
            .then((data) => data.json())
            .then((post) => { 
                usuarioCartaoAtivo = post[0].cartao_ativo});
    } catch(err){
        alert("Usuário não cadastrado no sistema de transporte públic");
        usuarioInexistente = true;
    } finally{
        console.log(pacienteIsolamento);
        console.log(usuarioCartaoAtivo);

        if(!usuarioInexistente){
            if(!pacienteIsolamento && usuarioCartaoAtivo){
                alert('Acesso liberado');
            } else {
                alert('Cartão bloqueado. Uma mensagem informando o motivo do bloqueio será enviada ao celular/e-mail do usuário.');
            }
        }
    }
});