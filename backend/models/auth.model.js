import mongoose from "mongoose";
import JWT from 'jsonwebtoken'
import bcrypt from 'bcrypt'

const userSchema = new mongoose.Schema({
    name : {
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

userSchema.pre('save', async function(next){
    if(!this.isModified('password')){
        return next()
    }
    this.password = await bcrypt.hash(this.password, 10);
    return next()
})

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