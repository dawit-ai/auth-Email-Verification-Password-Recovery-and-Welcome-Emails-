import mongoose from "mongoose";
const dbConnect = async () => {
  try {
    const  conc = await mongoose.connect(process.env.MONGO_URI)
    console.log(`mongodb connected... ${conc.connection.host}`)
  } catch (error) {
    throw new Error(`Database connection failed: ${error.message}`)
  }
  }
  export default  dbConnect
