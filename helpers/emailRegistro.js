import nodemailer from "nodemailer";

const emailRegistro = async(datos) =>{
    const transporter = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PWD
        }
        
      });
      const {email, nombre, token} = datos
      console.log(token)
      try {
        const info = await transporter.sendMail({
          from: "APV- administrador pacientes",
          to: email, 
          subject: "Comprueba tu cuenta",
          text: "Comprueba tu cuenta en APV",
          html: `<p>Hola ${nombre} comprueba tu cuenta en APV. </p>
                 <p>Tu cuenta ya esta lista solo debes darle click al siguiente enlace:
                 <a href="http://localhost:5173/confirmar/${token}">enlace</a>
  
                 <p>Si esta no es tu cuenta omite este mensaje</p>
          
          
          `
  
        })
        
      } catch (error) {
        console.log(error)
        
      }
      

};


export default emailRegistro;