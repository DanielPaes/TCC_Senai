import express from "express";
import PacientesController from "../controllers/pacientesController";

const router = express.Router();

router
     .post("/pacientes", PacientesController.postPaciente)
     .get("/pacientes/:id", PacientesController.getPacienteCPF)
     .get("/pacientes", PacientesController.getPacientes)
     .put("/pacientes/:id", PacientesController.updatePaciente)
     .delete("/pacientes/:id", PacientesController.deletePaciente)

export default router;