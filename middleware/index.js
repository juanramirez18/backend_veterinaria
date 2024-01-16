import express from "express"
import jwt from "jsonwebtoken";
import Veterinario from "../models/Veterinarios.js";

export default async function(req, res, next){

    const tokenHeader = req.headers.authorization
    if(!tokenHeader){
        return res.status(401).json({msg:"token is mandatory"})
        
    }
    try {
        const decod = jwt.verify(tokenHeader, process.env.SECRET_WORD)
        req.veterinario = await Veterinario.findOne({email:decod.email}).select("-token -confirmado -tokenPwd")
    } catch (error) {
        const e = new Error("token no valido")
        return res.status(403).json({msg: e.message})
        
        
    }
    return next()
};