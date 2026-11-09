import { useState } from "react"
import { useAuthStore } from "../store/authStore"
import { motion } from "framer-motion"
import Input from "../components/Input"
import { ArrowLeft, Mail, Loader } from "lucide-react"
import { Link } from "react-router-dom"
import toast from "react-hot-toast"

function ForgotPassword() {

  const [email, setEmail] = useState("")
  const [isSubmited, setIsSubmited] = useState(false)

  const { forgotpassword, isLoading } = useAuthStore()

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      await forgotpassword(email)

      setIsSubmited(true)

      toast.success("Reset link sent successfully!")
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-md overflow-hidden rounded-2xl border border-white/10 bg-white/10 shadow-2xl backdrop-blur-xl"
    >

      <div className="p-8">

        <h2 className="mb-6 text-center text-3xl font-bold text-white">
          Forgot Password?
        </h2>

        {!isSubmited ? (

          <form onSubmit={handleSubmit}>

            <p className="mb-6 text-center text-sm text-white/60">
              Enter your email and we will send you a link to reset your password.
            </p>

            <Input
              icon={Mail}
              type="email"
              placeholder="Email address"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <motion.button
              type="submit"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              disabled={isLoading}
              className="mt-6 w-full rounded-xl bg-linear-to-r from-purple-600 to-blue-600 py-3 font-semibold text-white shadow-lg shadow-purple-500/20 transition"
            >

              {isLoading ? (
                <Loader className="mx-auto size-5 animate-spin" />
              ) : (
                "Send Reset Link"
              )}

            </motion.button>

          </form>

        ) : (

          <div className="text-center">

            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="mx-auto mb-5 flex size-16 items-center justify-center rounded-full bg-purple-500/20"
            >
              <Mail className="size-8 text-purple-400" />
            </motion.div>

            <h3 className="mb-3 text-xl font-semibold text-white">
              Check your email
            </h3>

            <p className="text-sm leading-6 text-white/60">
              If an account exists for{" "}
              <span className="font-semibold text-white">
                {email}
              </span>
              , you will receive a password reset link shortly.
            </p>

          </div>

        )}

        <div className="mt-8 border-t border-white/10 pt-6 text-center">

          <Link
            to="/login"
            className="inline-flex items-center gap-2 text-sm font-medium text-blue-400 transition hover:text-purple-300"
          >
            <ArrowLeft size={18} />
            Back to login
          </Link>

        </div>

      </div>

    </motion.div>
  )
}

export default ForgotPassword