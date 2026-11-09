import mongoose,{Schema} from "mongoose";
const userSchema = new Schema({
  name:{
    type:String,
    required:true,
    trim:true
  },
  email:{
     type:String,
    required:true,
    unique:true
  },
  password:{
     type:String,
    required:true,
    unique:true
  },
  lastlogin:{
   type:Date,
   default:Date.now
  },
  isVerified:{
    type:Boolean,
    default:false
  },
  verificationToken:String,
  verificationTokenExpireAt:Date,
  resetpasswordToken:String,
  resetpasswordTokenExpireAt:Date

},{timestamps:true})

export const  User = mongoose.model("User",userSchema)
