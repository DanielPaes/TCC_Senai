import mongoose from "mongoose";

mongoose.connect("mongodb+srv://CompasSprint5:APIRest@cluster0.q6sty.mongodb.net/?retryWrites=true&w=majority")
    .then((data)=>{
        console.log('MongoDB Connected');
    }).catch((err) => {
        console.log('Erro na conexão com Db');
    });

let db = mongoose.connection;

export default db;

