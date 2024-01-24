import express from "express";
import connectDb from "./config/db.js"
import routerVeterinarios from "./routes/veterinariosRoutes.js"
import routerPacientes from "./routes/pacientesRoutes.js"
import cors from "cors";

const app = express()
const port = process.env.PORT || 4000

connectDb()
const dominios = ['http://localhost:5173/'];
var corsOptions = {
    origin: 'https://playful-moonbeam-e888a7.netlify.app',
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
  }
app.use(express.json())
app.use(cors(corsOptions))
app.use("/api/veterinarios", routerVeterinarios)
app.use("/api/pacientes", routerPacientes)
app.set('view engine', 'pug')
app.use(express.static('public'))


app.listen(port, ()=>{
    console.log(`Server on ${port}`)

})





