import dbConnect from "./src/config/databse.js"
import app from "./app.js"

const port = process.env.PORT || 7000

const startServer = async () =>{
  await dbConnect()
  app.listen(port,()=>{
    console.log(`Server running at http://localhost:${port}`)
  })
}

startServer().catch((error) => {
  console.error("Failed to start server:", error.message)
  process.exit(1)
})
