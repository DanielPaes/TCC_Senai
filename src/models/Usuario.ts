import mongoose from "mongoose";

const usuarioSchema = new mongoose.Schema(
    {
        id: {type: String},
        id_cpf: {type: String, required: true},
        nome: {type: String, required: true},
        nascimento: {type: Date, required: true},
        telefone: {type: String, required: false},
        email: {type: String, required: false},
        cidade: {type: String, required: true},
        estado: {type: String, required: true},
        cep: {type: String, required: true},
        endereco: {type: String, required: true},
        numero: {type: String, required: false},
        cartao_ativo: {type: Boolean, required: false}
    }
);

const usuarios= mongoose.model('usuarios', usuarioSchema);

export default usuarios;