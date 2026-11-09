import bcryptjs from "bcryptjs"
import crypto from "crypto"
import { User } from "../model/user.model.js"
import generateTokenAndSetCookie from "../utils/generateTokenAndSetCookie.js"
import { sendConfirmationEmail, sendWelcomeEmail,sendResetPasswordEmail,sendPasswordChangedEmail } from "../mailtrap/email.js"
export const signup = async ( req, res) =>{
  try {
    const { name, email, password } = req.body
  if(!name || !email || !password) {
    return res.status(400).json({message:"All fields are required"})
  }
     const existUser = await User.findOne({email:email.toLowerCase()})
     if(existUser){
      return res.status(409).json({message:"User already exists"}) 
     }
     const hashedPassword = await bcryptjs.hash(password,10)
     const verificationToken = Math.floor(100000 + Math.random() * 900000).toString()
     const user =await User.create({
      name,
      email:email.toLowerCase(),
      password:hashedPassword,
      verificationToken:verificationToken,
      verificationTokenExpireAt:Date.now() + 24*60*60*1000
     })
     
     generateTokenAndSetCookie(res,user._id)
     await sendConfirmationEmail(user.email,user.name,verificationToken)

     res.status(201).json({
      message:"user created successfully",
      user:{
        ...user._doc,
        password:undefined,
        verificationToken:undefined,
        verificationTokenExpireAt:undefined
      }
     })

  } catch (error) {
    res.status(500).json({
      message:"Internal server error",
      error:error.message
    })
  }

  }
  export const verifyEmail = async (req,res) => {
    const {code}=req.body
    try {
      const user = await User.findOne({verificationToken:code,verificationTokenExpireAt:{$gt:Date.now()}})
      if(!user){
        return res.status(400).json({message:"Invalid or expired verification code"})
      }
      user.isVerified = true
      user.verificationToken = undefined
      user.verificationTokenExpireAt = undefined
      await user.save()
      await sendWelcomeEmail(user.email,user.name)
      res.status(200).json({
        message:"Email verified successfully",
        user:{
          ...user._doc,
          password:undefined,
          verificationToken:undefined,
          verificationTokenExpireAt:undefined
        }
      })
      
    } catch (error) {
      res.status(500).json({
        message:"Internal server error",
        error:error.message
      })
    }
  }  

export const login = async ( req, res) =>{
  const {email,password}=req.body
  try {
    if(!email || !password){
      return res.status(400).json({message:"all fields are required"})
    }
    const user = await User.findOne({email:email.toLowerCase()})
    if(!user){
      return res.status(400).json({message:"user not found"})
    }
    const isValidPassword = await bcryptjs.compare(password,user.password)
    if(!isValidPassword){
      return res.status(400).json({message:"invalid credential"})
    }
      generateTokenAndSetCookie(res,user._id)
      user.lastlogin=new Date()
      await user.save()

      res.status(200).json({
        message:"login successfully",
        user:{
          ...user._doc,
        password:undefined,
        }
       

      })
  } catch (error) {
    res.status(500).json({
        message:"Internal server error",
        error:error.message
      })
  }
}
export const logout = async ( req, res) =>{
  try {
   res.clearCookie("token")
   res.status(200).json({success:true,message:"logged out successfully"})
  } catch (error) {
   res.status(500).json({
        message:"Internal server error",
        error:error.message
      })
  }

}

export const forgotPassword = async ( req , res ) => {
  const {email} = req.body
  try {
    if(!email) {
      return res.status(400).json({message:"email is required"})
    }
    const user = await User.findOne({email:email.toLowerCase()})
    if(!user) {
      return res.status(400).json({message:"user not found"})
    }
    const resetToken =  crypto.randomBytes(32).toString("hex")
    user.resetpasswordToken = resetToken
    user.resetpasswordTokenExpireAt = Date.now() + 24 * 60 * 60 * 1000 
     await user.save()
     await sendResetPasswordEmail(user.email,user.name,`${process.env.CLIENT_URL}/reset-password/${resetToken}`)
     res.status(200).json({message:"Reset password link is sent to your email"})

  } catch (error) {
    res.status(500).json({
        message:"Internal server error",
        error:error.message
      })
  }
}
export const resetPassword = async ( req , res ) =>{
  const { token } = req.params
  const { password } = req.body
  try {
     const user = await User.findOne({
      resetpasswordToken:token,
      resetpasswordTokenExpireAt:{$gt:Date.now()}
     })
     if(!user){
      return res.status(400).json({Message:"invalid or expired token used"})
     }
     const hashedPassword = await bcryptjs.hash(password,10)
     user.password=hashedPassword
     user.resetpasswordToken=undefined
     user.resetpasswordTokenExpireAt=undefined
     await user.save()
     await sendPasswordChangedEmail (user.email,user.name)
     res.status(200).json({message:"password changed successfully"})

  } catch (error) {
    res.status(500).json({
        message:"Internal server error",
        error:error.message
      })
  }
}
export const authCheck = async ( req , res ) => {
  try {
    const user = await User.findById(req.userId)
    if(!user) return res.status(401).json({message:"user not found"})
      res.status(200).json({
       user:{
        ...user._doc,
        password:undefined
       }
      })
  } catch (error) {
    res.status(500).json({message:"Internal server error", error:error.message})
  }
}