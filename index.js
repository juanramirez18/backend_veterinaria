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
    origin: ['https://helpful-shortbread-e3f1c3.netlify.app', 'https://helpful-shortbread-e3f1c3.netlify.app/login']
  }
app.use(express.json())
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "https://helpful-shortbread-e3f1c3.netlify.app");
  res.setHeader("Access-Control-Allow-Methods", "POST, GET, PUT, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  next();
})
app.use("/api/veterinarios", routerVeterinarios)
app.use("/api/pacientes", routerPacientes)
app.set('view engine', 'pug')
app.use(express.static('public'))


app.listen(port, ()=>{
    console.log(`Server on ${port}`)

});





