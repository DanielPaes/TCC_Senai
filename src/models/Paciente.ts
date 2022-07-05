import mongoose from "mongoose";

const pacienteSchema = new mongoose.Schema(
    {
        id: {type: String},
        id_cpf: {type: String, unique:true, index:true},
        nome: {type: String, required: true},
        nascimento: {type: Date, required: true},
        telefone: {type: String, required: false},
        email: {type: String, required: false},
        cidade: {type: String, required: true},
        estado: {type: String, required: true},
        cep: {type: String, required: true},
        endereco: {type: String, required: true},
        numero: {type: String, required: false},
        crm_medico: {type: String, required: false},
        anotacoes: {type: String, required: false},
        isolamento: {type: Boolean, required: false},
        data_inicio: {type: Date, required: false},
        data_fim: {type: Date, required: false},
    }
);

const pacientes= mongoose.model('pacientes', pacienteSchema);

export default pacientes;