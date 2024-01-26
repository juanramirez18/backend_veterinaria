import express from "express";
import connectDb from "./config/db.js"
import routerVeterinarios from "./routes/veterinariosRoutes.js"
import routerPacientes from "./routes/pacientesRoutes.js"
import cors from "cors";

const app = express()
const port = process.env.PORT || 4000

connectDb()

app.use(express.json())
app.use(cors({
    origin: "*"
}))
app.use("/api/veterinarios", routerVeterinarios)
app.use("/api/pacientes", routerPacientes)
app.set('view engine', 'pug')
app.use(express.static('public'))


app.listen(port, ()=>{
    console.log(`Server on ${port}`)

});





