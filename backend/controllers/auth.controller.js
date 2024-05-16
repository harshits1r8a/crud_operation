import { User } from "../models/auth.model.js";
import emailValidator from "email-validator";


const singup = async (req,res,next)=>{
    const { userName, email, password, confirmPassword } = req.body;
    console.log(userName, email, password, confirmPassword);

    // express validation
    if(!userName || !email || !password || !confirmPassword ){
        return res.status(400).json({
            success:false,
            message:"Every feild is required!"
        })
    }

    const validEmail = emailValidator.validate(email)
    if(!validEmail){
        return res.status(400).json({
            success:false,
            message:"Please enter valid email"
        })
    }

    if(password != confirmPassword){
        return res.status(400).json({
            success:false,
            message:"confirm password is not match!"
        })
    }
    try {
        const userInfo = User(req.body)
        const result = await userInfo.save()
        return res.status(200).json({
            success : true,
            data  : result
        })
    } catch (error) {
        if(error.code === 11000){
            return res.status(400).json({
                success : false,
                data  : 'Account already exists with provided email id.'
            })
        }
        return res.status(400).json({
            success : false,
            data  : error.message
        })
    }
}

const singin = async (req,res,next)=>{
    const {email, password } = req.body;

    try {
        if( !email || !password){
            return res.status(400).json({
                success: false,
                message : "Every feild is required!"
            })
        }
    
        const user = await User.findOne({email}).select('+password')
    
        if( !user || user.password !== password){
            return res.status(400).json({
                success: false,
                message : "Invalid password"
            })
        }

        const token = user.jwtToken();

        user.password = undefined;

        const cookieOption={
            maxAge : 24*60*60*1000,
            httpOnly:true
        }

        res.cookie("token", token, cookieOption)
        res.status(200).json({
            success:true,
            data:user
        })

    } catch (error) {
        res.status(400).json({
            success:false,
            message: error.message
        })
    }
}

const getUser = async(req,res,next)=>{
    const userId = req.user.id;

    try {
        const user = await User.findById(userId)
        return res.status(200).json({
            success: true,
            data : user
        })
    } catch (error) {
        return res.status(400).json({
            success: false,
            message: error.message 
        })
    }
}

const logout =(req,res,next)=>{
    try {
        const cookieOption = {
            expires : new Date(),
            httpOnly:true
        };
        res.cookie("token", null, cookieOption),
        res.status(200).json({
            sucess : true,
            message:"Logged out"
        })
    } catch (error) {
        res.status(400).json({
            success: false,
            message:error.message
        })
    }
}

export {
    singup,
    singin,
    getUser,
    logout
}