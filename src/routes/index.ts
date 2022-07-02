import express, {Express} from "express";
import users from "./usuariosRoutes";
import tasks from "./pacientesRoutes";


const routes = (app: Express) => {
    app.route('/').get((req, res) => {
        res.status(200).send({titulo: "Curso de node"})
    })


    app.use(
        express.json(),
        users,
        tasks
    )
}

export default routes;