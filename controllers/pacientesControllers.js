import Pacientes from "../models/Pacientes.js";

const obtenerPaciente = async(req, res)=>{
    const {nombre} = req.body
    try {
        const paciente = await Pacientes.findOne({nombre})
        return res.json(paciente)
        
    } catch (error) {
        console.log(error)
        
    }

};

const obtenerPacientesVet = async(req, res)=>{
    const veterinario = req.veterinario

    try {
        const pacientes = await Pacientes.find({veterinario: veterinario.id})
        if(pacientes.length === 0){
            return res.json({msg: `No hay pacientes para usted Dr ${veterinario.nombre}`, type:"empty" })
        }
        return res.json({msg:`El veterinario es el doctor: ${veterinario.nombre}`, pacientes})
        
    } catch (error) {
        console.log(error)
    }
};

const agregarPaciente = async(req, res)=>{
    const medicoId = req.veterinario._id 
    try {
        const {nombre, propietario, email, sintomas} = req.body
        const paciente = await new Pacientes ({
        nombre,
        propietario,
        email,
        sintomas,
        veterinario: medicoId


    })
    const pacienteNew = await paciente.save()
    return res.json({msg:"Paciente creado exitosamente", pacienteNew})

        
    } catch (error) {
        console.log(error)
        res.json(error)
        
    }
    
};

const actualizarPaciente = async(req, res)=>{
    const {id} = req.params
    const vet = req.veterinario._id.toString()
    console.log(vet)

    try {
        const pacienteFind = await Pacientes.findById(id)
        if(!pacienteFind){
            return res.json({msg: "Pacient not found!"})
        }
        if(pacienteFind.veterinario.toString() === vet){
            const pacienteUpdate = await pacienteFind.updateOne(req.body)
            return res.json({msg:pacienteUpdate})
        }else{
            return res.json({msg:"Acceso denegado"})
        }
    } catch (error) {
        console.log(error)
        
    }
}; 

const eliminarPaciente = async(req, res)=>{
    const id = req.params.id
    try {
        const userId = await Pacientes.findOne({_id: id})
        if(!userId){
            return res.json({msg:"user no found!"})
        }
        const deletePac = await Pacientes.deleteOne(userId)
        return res.json(`Paciente eliminado exitosamente ${deletePac}`)
    } catch (error) {
        console.log(error)
        
    }
    console.log("desde eliminar paciente")
};

export {
    obtenerPaciente,
    agregarPaciente, 
    obtenerPacientesVet,
    actualizarPaciente,
    eliminarPaciente
};