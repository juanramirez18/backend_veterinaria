import mongoose from "mongoose";
import dotenv from "dotenv"

dotenv.config()
console.log(process.env.URL_DATA_BASE)

const connectDb = async()=>{
    try {
        const db = await mongoose.connect(process.env.URL_DATA_BASE)
        const url = `${db.connection.host}: ${db.connection.port}`
        console.log(`Bd connect sucessfull ${url}`)
    } catch (error) {
        console.log(error)
    }

}

export default connectDb