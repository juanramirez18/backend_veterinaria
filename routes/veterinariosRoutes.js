import express from "express";
import middleware from "../middleware/index.js";
import {getMethod, registrar, perfil, 
       confirmar, autentificar, olvidePasword,
       validarToken, nuevoPassword, resetPassword, 
       signOut, veterinarioGet, updateMethod, 
       updatePwdPerfil } from "../controllers/veterinariosController.js"

const router = express.Router()

router.post("/", registrar) 
router.get("/citas", getMethod)
router.get("/perfil", [middleware, perfil]) 
router.post("/perfil/:token", confirmar)
router.post("/auth", autentificar)
router.post("/pwd", olvidePasword)
router.get("/pwd/:token", validarToken)
router.put("/resetPwd/:token", resetPassword)
router.post("/signout", signOut)
router.post("/get", veterinarioGet)
router.put("/update", [middleware, updateMethod])
router.post("/updatePwd", [middleware, updatePwdPerfil])




export default router