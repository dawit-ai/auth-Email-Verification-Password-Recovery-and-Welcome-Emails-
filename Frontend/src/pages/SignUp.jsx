import { motion } from "framer-motion";
import { useState } from "react";
import Input from "../components/Input";
import { Loader, Lock, Mail, User } from "lucide-react";
import { Link } from "react-router-dom";
import PasswordStrenghMeter from "../components/PasswordStrenghMeter";
import { useAuthStore } from "../store/authStore";
import { useNavigate } from "react-router-dom";
 
function SignUp() {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { signup, error, isLoading } = useAuthStore()
  const navigate = useNavigate()
  const handleSubmit = async (e) => {
     e.preventDefault();
    try {
     await signup(name,email,password)
     navigate("/verify-email")
    } catch (error) {
    console.log(error)
    }
    
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-md overflow-hidden rounded-2xl border border-white/10 bg-white/10 shadow-2xl backdrop-blur-xl"
    >
      <div className="p-8">
        <h1 className="mb-6 text-center text-3xl font-bold text-white">
          Create Account
        </h1>

        <form onSubmit={handleSubmit}>
          <Input
            icon={User}
            type="text"
            placeholder="Username"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

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
          {error &&  <p className="text-red-500 font-semibold -mt-0.5  text-1xl">{error}</p>}
             <PasswordStrenghMeter password={password} />
          <motion.button
            type="submit"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            disabled={isLoading}
            className="w-full rounded-xl bg-linear-to-r from-purple-600 to-blue-600 py-3 font-semibold text-white shadow-lg shadow-purple-500/20 transition mt-6"
          >
            {isLoading ? <Loader className=" animate-spin mx-auto w-5 h-6" /> : "Sign Up"}

          </motion.button>
        </form>
      </div>

      <div className="flex justify-center border-t border-white/10 bg-white/5 px-8 py-4">
        <p className="text-sm text-white/70">
          Already have an account?{" "}
          <Link
            to="/login"
            className="font-medium text-blue-500 transition hover:text-purple-200 hover:underline"
          >
            Login
          </Link>
        </p>
      </div>
    </motion.div>
  );
}

export default SignUp;