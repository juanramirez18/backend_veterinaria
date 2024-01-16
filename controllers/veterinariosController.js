import mongoose from "mongoose";
import Veterinario from "../models/Veterinarios.js"
import bcrypt from "bcrypt" 
import jwt from "jsonwebtoken";
import express from "express";
import emailRegistro from "../helpers/emailRegistro.js";
import emailPwd from "../helpers/emailOlvidePwd.js";
import generarId from "../helpers/generarId.js";

const registrar = async(req, res)=>{
    const {email, nombre, password, telefono} = req.body
    const hashedPassword = await bcrypt.hash(password, 10)
    // const token = jwt.sign({name: nombre, email: email}, process.env.SECRET_WORD,{expiresIn: '5h'} )
    try {
        const veterinario = new Veterinario({
            nombre,
            password : hashedPassword,       
            email,
            telefono
           
            
        })
        const searchUser = await Veterinario.findOne({
            email
        })
        
        if(!searchUser){
            const veterinarioCreate = await veterinario.save()
            emailRegistro({
                nombre,
                email,
                token : veterinarioCreate.token
            })
            
            return res.status(200).json({msg:"Usuario creado, revisa tu correo", token:veterinario.token})

        }else{
           return res.json({msg:"user alredy exist!"})

        }
        
    } catch (error) {
        console.log(error)
    }


};

const autentificar = async(req, res)=> {
    const {email} = req.body
    try {
        const user = await Veterinario.findOne({
            email
        })
        if(!user){
            return res.status(401).json({msg:"Usuario no encontrado!"})
        }

        if(user.confirmado !== true){
            console.log("cuenta no confirmada")
            return res.status(401).json({msg:"Cuenta no confirmada, verifique su correo"})

        }else{
            const validPwd = await bcrypt.compare(req.body.password, user.password)
        if(validPwd){  
            if(user.token !== null){
                console.log(user.token)
                return res.json({msg:"Usuario autentificado exitosamente", token: user.token})
              
            }else{
                const token = jwt.sign({email: email}, process.env.SECRET_WORD,{expiresIn: '5h'} )
                const tokenUpdate = await user.updateOne({token})
                setTimeout(()=>{
                    return res.json(user)
                },3000)
                
            }
            
        }else{
            
            return res.status(400).json({msg:"Contraseña incorrecta, intentalo de nuevo"})
        }
        }
    } catch (error) {
        console.log(error)
    }
 
};

const perfil =(req, res)=>{
    console.log(req.veterinario)
    res.status(200).json(req.veterinario)
    try {  
    } catch (error) {
        console.log(error)
    }
};

const veterinarioGet = async(req, res)=>{
    try {
        const {email} = req.body
        const user = await Veterinario.findOne({email})
        if(user){
            return res.json({msg:"login on", user})
        }
    } catch (error) {
        console.log(error)
    }

};

const confirmar = async(req, res)=>{
    const {token} = req.params
    try {
        const userValidate = await Veterinario.findOne({
            token
        })
        

        if(userValidate){
            const conf = {confirmado: true}
            const tokenUp = {token: null};
            try {
                const confirm = await userValidate.updateOne(conf)
                const tokenUpdate = await userValidate.updateOne(tokenUp)
            } catch (error) {
                console.log(error)
                
            }
            return res.status(200).json({msg:`Welcome dr ${userValidate.nombre}`})
        }else{
            return res.status(401).json({msg:"Accion no valida"})
            
        }
    } catch (error) {
        console.log(error)
    }

};

const olvidePasword = async(req, res)=>{
    
    const {email} = req.body
    const updateToken = {tokenPwd: generarId()}
    try {
        const user = await Veterinario.findOne({email}).select("-password")
        
        if(!user){
           return res.status(404).json("user not found, try again bro!")
        }
        if(user.confirmado === true){
            if(user.tokenPwd == null){
                
                await user.updateOne(updateToken)


            }
            const {tokenPwd, email, nombre} = user
            
            emailPwd({
                token:tokenPwd,
                email, 
                nombre
            })


            return res.json({msg:"Revisa tu email",tokenPwd})
        }else{
            return res.json({msg:"usuario no confirmado, revise su correo"})
        }
        
    } catch (error) {
        res.json({msg:error})
    }
    
    
}; 

const validarToken = async(req, res)=>{
    const pwdEmp = {password: null}
    const {token} = req.params
    const confirmarEmail = {confirmado: true}

 
    try {
        const tokenSend = await Veterinario.findOne({tokenPwd:token})
        if(!tokenSend){
            return res.status(404).json({msg:"Token is invalid, try again bro!"})
        }
        res.status(200).json({msg:"Token valido"})
        console.log("token valido")
        // const resetPwd = await tokenSend.updateOne(pwdEmp)  
        // const setConfirmar = await tokenSend.updateOne(confirmarEmail) 
        // return res.json({msg: "Set your new password"})
        
    } catch (error) {
        console.log(error)
    }

    
};

const nuevoPassword = async(req, res)=>{
    const {password} = req.body
    const hashedPassword = await bcrypt.hash(password, 10)
    const {token} = req.params
    const tokenClear = {token: null}
    const setConfirmar = {confirmar: false}
    
    try {
        
        const emailValidate = await Veterinario.findOne({email})
        if(!emailValidate){
            return res.json({msg:"user not found"})
        }
        if(emailValidate.confirmado === true){
            const updatePwd = await emailValidate.updateOne({password: hashedPassword})
            const updateToken = await emailValidate.updateOne(tokenClear)
            const updateConf = await emailValidate.updateOne(setConfirmar)

            return res.json({msg:"Change password successful"})

        }else{
            return res.json({msg:"Action no valid"})
        }
        
    } catch (error) {
        console.log(error)
    }
};

const resetPassword = async(req, res) =>{
    const{token} = req.params 
    const {password} = req.body
    const tokenUpdate = {tokenPwd: null}
    const pwdUpdate = await bcrypt.hash(password, 10)
    try {
        const user = await Veterinario.findOne({
            tokenPwd:token
        })
        if(!user){
            return res.status(401).json({msg:"Token no valido"})
        }else{
            const update = await user.updateOne({password:pwdUpdate})
            const updateToken = await user.updateOne(tokenUpdate)
            res.status(200).json({msg:"La contraseña ha sido actualizada con exito"})
           
        }
        
    } catch (error) {
        return res.status(404).json(error)
        
    }

}; 

const getMethod = async(req, res)=> {
    try {
        const users = await Veterinario.find()
        res.status(200).json({msg:users})
        

        
    } catch (error) {
        console.log(error)
        res.status(401).json({msg:error})
    }

};

const updatePwdPerfil = async(req, res) =>{
    const {pwdOld, pwd, pwdRepeat} = req.body
    const pwdEncryp = await bcrypt.compare(pwdOld, req.veterinario.password)
    if(!pwdEncryp){
        res.status(404).json({msg:"Contraseña actual no coincide"})
        return

    }
    
    try {
        const pwdUpdateEncryp = await bcrypt.hash(req.body.pwd, 10)
        const user = await Veterinario.findById(req.veterinario._id)
        if(user){
            try {
                const updatePwd = await user.updateOne({password: pwdUpdateEncryp} )
                console.log(updatePwd)
                res.json({msg:"Contraseña guardada correctamente", updatePwd})
                
            } catch (error) {
                console.log(error)
                
            }
        }
        
        
    } catch (error) {
        console.log(error)
    }
};

const updateMethod = async(req, res)=>{
    const {_id} = req.veterinario
    const {nombre, email, telefono, web} = req.body
    console.log(_id)
    const payload = {
        nombre,
        email,
        telefono,
        web
    }

    try {
        const user = await Veterinario.findById(_id)
        console.log(user)
        if(user){
            const update = await user.updateOne(payload)
            res.json({msg:"usuario creado exitosamente", update})
        }

        
    } catch (error) {
        console.log(error)
    }
}

const signOut = async(req, res) => {
    const {email, token} = req.body
    try {
        const user = await Veterinario.findOne({email})
        if(user){
            const userUpdate = await user.updateOne(token)
            return res.status(200).json({msg:"se cerro seccion exitosamente"})

        }
      
        
    } catch (error) {
        console.log(error)
        return res.json(error)
        
    }
}

export {
    registrar,
    perfil,
    confirmar,
    autentificar,
    olvidePasword,
    validarToken,
    nuevoPassword,
    resetPassword,
    getMethod,
    signOut,
    veterinarioGet,
    updateMethod,
    updatePwdPerfil
}