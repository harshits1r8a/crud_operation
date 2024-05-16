import express from 'express'
import auth_router from './routes/auth.route.js';
import databaseConnection from './config/databaseConfig.js';
import cookieParser from 'cookie-parser';

const app = express();

databaseConnection()
// midddleware
app.use(express.json())
app.use(cookieParser())

app.use('/api/auth',auth_router)

app.use('/',(req,res)=>{
    res.status(400).json({data:"Crud operation server"})
})


export default app;