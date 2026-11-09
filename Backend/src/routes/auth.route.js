import express, {Router} from "express"
import { signup,login,logout,verifyEmail, forgotPassword, resetPassword ,authCheck} from "../controller/auth.controller.js"
import { verifyToken } from "../middleWare/verifyToken.js"

const router = express.Router()
router.get("/auth-check",verifyToken,authCheck)
router.post("/signup",signup)
router.post("/login",login)
router.post("/logout",logout)
router.post("/verify-email",verifyEmail)
router.post("/forgot-password",forgotPassword)
router.post("/reset-password/:token",resetPassword)
export default router





