import express from "express"
import {obtenerPaciente, agregarPaciente, obtenerPacientesVet, 
        actualizarPaciente, eliminarPaciente} 
        from "../controllers/pacientesControllers.js"
import middleware from "../middleware/index.js"

const router = express.Router()

router.get("/", obtenerPaciente)
router.post("/add",  [middleware, agregarPaciente])
router.get("/find", [middleware, obtenerPacientesVet])
router.post("/find/:id", [middleware, actualizarPaciente])
router.delete("/find/:id", [middleware, eliminarPaciente])

export default router