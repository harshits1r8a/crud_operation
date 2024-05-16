import mongoose from 'mongoose'
import { DB_NAME } from '../constant.js'

const databaseConnection = async()=>{
    await mongoose.connect(`${process.env.MONGODB_URL}/${DB_NAME}`)
    .then((conn)=> console.log(`Connected to DB: ${conn.connection.host}`))
    .catch((err)=>console.log(err.message)) 
}

export default databaseConnection