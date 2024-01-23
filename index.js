import express from "express";
import connectDb from "./config/db.js"
import routerVeterinarios from "./routes/veterinariosRoutes.js"
import routerPacientes from "./routes/pacientesRoutes.js"
import cors from "cors";

const app = express()
const port = process.env.PORT || 4000

connectDb()
const dominios = ["https://playful-moonbeam-e888a7.netlify.app/"];
const corsOptions = {
    origin: function(origin, callback){
        if(dominios.indexOf(origin) !== -1){
            callback(null, true)

        }else{
            callback(new Error("No permitido por cors"))

        }

    }
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





