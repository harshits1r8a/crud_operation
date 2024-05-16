import mongoose from "mongoose";
import JWT from 'jsonwebtoken'

const userSchema = new mongoose.Schema({
    userName : {
        type:String,
        required : [true, "Username is required"],
        minLength : [5, "Username must be atleast 5 character"],
        maxLength : [50, "Username must be less then 50 character"],
        trim:true
    },
    email:{
        type:String,
        required : [true, "Email is required"],
        unique : [true, "emial already exist!"],
        lowercase: true,

    },
    password :{
        type : String,
        select : false
    },
    forgotPasswordTocken:{
        type : String
    },
    forgotPasswordExpiryTocken:{
        type : Date
    }
},{timestamps:true})

// jsonwebtoken method
userSchema.methods = {
    jwtToken(){
        return JWT.sign(
            {id:this._id, email : this.email},
            process.env.SECRET,
            {expiresIn:'24h'}
        )
    }
}
export const User = mongoose.model('User',userSchema)