import { text } from "express";
import nodemailer from "nodemailer";

const emailPwd = async(datos) => {

    const transporter = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PWD
        }
        
      });
      const {email, nombre, token} = datos
    

      try {
        const info = await transporter.sendMail({
            from: "APV- administrador pacientes",
            to:email,
            subject: "Resetear password app",
            text: "Recupera la contraseña",
            html:`Hola dr ${nombre} has click en el enlace para recuperar tu contraseña
            <a href="http://localhost:5173/resetPwd/${token}">enlace</a>
            
            
            `
        })
        
      } catch (error) {
        console.log(error)
      }
};

export default emailPwd;