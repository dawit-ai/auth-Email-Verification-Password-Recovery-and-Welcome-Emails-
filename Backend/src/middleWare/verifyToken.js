import jwt from "jsonwebtoken"
 export const verifyToken = async (req,res,next) => {
  const token = req.cookies.token
  if(!token) return res.status(401).json({message:"Unauthrized-no token provided"})
 try {
  const decoded = jwt.verify(token ,process.env.JWT_SECRET)
  req.userId = decoded.userId
  if(!decoded)  return res.status(401).json({message:"Unauthrized- invalid token "})
  next()
 } catch (error) {
   res.status(500).json({message:"Internal server error", error:error.message})
 }
}