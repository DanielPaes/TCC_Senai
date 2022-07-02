import express from "express";
import UsuariosController from "../controllers/usuariosController";

const router = express.Router();

router
    .post("/usuarios", UsuariosController.postUsuario)
    .get("/usuarios/:id", UsuariosController.getUsuarioCPF)
    .get("/usuarios", UsuariosController.getUsuarios)
    .put("/usuarios/:id", UsuariosController.updateUsuario)
    .delete("/usuarios/:id", UsuariosController.deleteUsuario)

export default router;