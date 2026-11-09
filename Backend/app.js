import "dotenv/config"
import express from "express"
import cookieParser from "cookie-parser"
import cors from "cors"
import authRoute from "./src/routes/auth.route.js"

const app = express()

app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  })
)

app.use(express.json())
app.use(cookieParser())
app.use("/api/auth",authRoute)

export default app
