import { useState } from "react"
import { motion } from "framer-motion"
import { useAuthStore } from "../store/authStore"
import { useNavigate, useParams } from "react-router-dom"
import { Lock, Loader } from "lucide-react"
import toast from "react-hot-toast"

function ResetPassword() {

  const [password, setPassword] = useState("")
  const [confirmNewPassword, setConfirmNewPassword] = useState("")

  const { resetpassword, isLoading, error } = useAuthStore()

  const { token } = useParams()
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (password !== confirmNewPassword) {
      toast.error("Passwords do not match")
      return
    }

    try {

      await resetpassword(token, password)

      toast.success(
        "Password reset successfully! Redirecting to login..."
      )

      setTimeout(() => {
        navigate("/login")
      }, 3000)

    } catch (error) {

      console.log(error)

      toast.error(
        error.response?.data?.message ||
        error.response?.data?.error ||
        error.message ||
        "Error resetting password"
      )
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

        <h1 className="mb-2 text-center text-3xl font-bold text-white">
          Reset Password
        </h1>

        <p className="mb-6 text-center text-sm text-white/60">
          Enter your new password below.
        </p>

        <form onSubmit={handleSubmit}>

          {/* New password */}
          <div className="relative mb-4">

            <Lock
              className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40"
              size={20}
            />

            <input
              type="password"
              placeholder="New password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-xl border border-white/10 bg-white/5 py-3 pl-12 pr-4 text-white outline-none placeholder:text-white/40 focus:border-purple-500"
            />

          </div>


          {/* Confirm password */}
          <div className="relative">

            <Lock
              className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40"
              size={20}
            />

            <input
              type="password"
              placeholder="Confirm new password"
              required
              value={confirmNewPassword}
              onChange={(e) => setConfirmNewPassword(e.target.value)}
              className="w-full rounded-xl border border-white/10 bg-white/5 py-3 pl-12 pr-4 text-white outline-none placeholder:text-white/40 focus:border-purple-500"
            />

          </div>


          {/* Error */}
          {error && (
            <p className="mt-3 text-sm font-semibold text-red-400">
              {error}
            </p>
          )}


          {/* Submit */}
          <motion.button
            type="submit"
            disabled={isLoading}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="mt-6 w-full rounded-xl bg-linear-to-r from-purple-600 to-blue-600 py-3 font-semibold text-white shadow-lg shadow-purple-500/20 transition disabled:cursor-not-allowed disabled:opacity-60"
          >

            {isLoading ? (
              <Loader className="mx-auto size-5 animate-spin" />
            ) : (
              "Reset Password"
            )}

          </motion.button>

        </form>

      </div>

    </motion.div>
  )
}

export default ResetPassword