let btnValidarCartao = document.querySelector('#btn-validar-cartao');

let inputCpf = document.querySelector('#valida-cpf');

btnValidarCartao?.addEventListener('click', async function(event){
    event.preventDefault();
    try{
        await fetch(`http://localhost:3000/usuarios/${inputCpf.value}`)
            .then((data) => data.json())
            .then((post) => { 
                if(post[1].cartao_ativo){
                    alert('Acesso liberado.');
                } else {
                    alert('Cartão bloqueado. Uma mensagem foi enviada informando o motivo do bloqueio.')
                }                           
        });
    } catch(err){
        alert("User not found.");
        console.log(inputCpf.value);
        cleanObject();
    }
})