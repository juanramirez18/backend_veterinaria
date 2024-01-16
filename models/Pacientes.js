import mongoose from "mongoose";

const PacientesSchema = mongoose.Schema({
    nombre:{
        type: String,
        require: true,
        trim: true
    },
    propietario:{
        type: String,
        require: true,
        trim: true
    },
    email:{
        type: String,
        require: true
    },
    fechaAlta: {
        type: Date,
        require: true,
        default: Date.now()
    },
    sintomas:{
        type: String,
        require:true
    },
    veterinario:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"Veterinario"
    }

},{
    timestamps: true
})

const Pacientes = mongoose.model("Pacientes", PacientesSchema)

export default Pacientes
