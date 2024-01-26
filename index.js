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
    origin: (origin, callback)=>{
        const ACCEPTEP_ORIGINS = [
            'https://helpful-shortbread-e3f1c3.netlify.app/',
            'https://helpful-shortbread-e3f1c3.netlify.app/login',
            'http://localhost:5173/'
        ]
        if(ACCEPTEP_ORIGINS.includes(origin)){
            return callback(null, true)
        }
        if(!origin){
            return callback(null, true)
        }
        return callback(new Error("No allowed by CORS"))

    }
}))
app.use("/api/veterinarios", routerVeterinarios)
app.use("/api/pacientes", routerPacientes)
app.set('view engine', 'pug')
app.use(express.static('public'))


app.listen(port, ()=>{
    console.log(`Server on ${port}`)

});





