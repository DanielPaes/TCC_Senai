import express from "express";
import db from "./config/dbConnect"
import routes from "./routes";
import cors from "cors";


db.on("error", console.log.bind(console, 'Erro de conexão'))
db.once("open", () => {
    console.log('conexão com o banco feita com sucesso')
})

const app = express();

app.use(
    cors({origin: "*"}),
    express.json());

routes(app);

export default app