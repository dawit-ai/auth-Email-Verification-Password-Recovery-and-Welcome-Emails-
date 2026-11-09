import { motion } from "framer-motion";
import { useState } from "react";
import Input from "../components/Input";
import { Lock, Mail, Loader} from "lucide-react";
import { Link } from "react-router-dom";
import { useAuthStore } from "../store/authStore";
import toast from "react-hot-toast";
function Login() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
   const {login,error,isLoading} = useAuthStore()
  const handleSubmmite = async(e) => {
    e.preventDefault();
    try {
       await login(email,password)
      toast.success("login successfully")
    } catch (error) {
      console.log(error)
    }
  
  }
  return (
    <motion.div
    initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-md overflow-hidden rounded-2xl border border-white/10 bg-white/10 shadow-2xl backdrop-blur-xl">
         <div className="p-8">
        <h1 className="mb-6 text-center text-3xl font-bold text-white">
         Welcome Back
        </h1>
        <form onSubmit={handleSubmmite}>
           <Input
            icon={Mail}
            type="email"
            placeholder="Email address"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            icon={Lock}
            type="password"
            placeholder="Password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <div className="flex ">
        <Link to = "/forgot-Password"  className="font-medium text-blue-500 transition hover:text-purple-200 hover:underline"> 
        Forgot Password?
        </Link>
        </div>
         {error && <p className="text-red-500 font-semibold mt-2">{error}</p> }
         <motion.button
            type="submit"
            disabled={isLoading}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="w-full rounded-xl bg-linear-to-r from-purple-600 to-blue-600 py-3 font-semibold text-white shadow-lg shadow-purple-500/20 transition mt-6"
          >
          { isLoading ? <Loader className = " size-5 animate-spin mx-auto"/> : "Login"}
          </motion.button>
        </form>
          
  </div>
  <div className="flex justify-center border-t border-white/10 bg-white/5 px-8 py-4">
        <p className="text-sm text-white/70">
          don't have an account?{" "}
          <Link
            to="/signup"
            className="font-medium text-blue-500 transition hover:text-purple-200 hover:underline"
          >
            Sign Up
          </Link>
        </p>
      </div>
    </motion.div>
  )
}

export default Login
