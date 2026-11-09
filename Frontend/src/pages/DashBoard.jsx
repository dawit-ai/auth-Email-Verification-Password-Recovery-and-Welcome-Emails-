import { LogOut, User, Mail, ShieldCheck } from "lucide-react"
import { useAuthStore } from "../store/authStore"
import toast from "react-hot-toast"

function DashBoard() {
  const { user, logout, isLoading } = useAuthStore()

  const handleLogout = async () => {
    try {
      await logout()
      toast.success("logged out successfully")
    } catch (error) {
      toast.error("failed to logout")
      console.log(error)
    }
    
    
  }

  return (  
    <div className="w-full max-w-4xl">
      
      {/* Header */}
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">
            Welcome, {user?.name} 
          </h1>

          <p className="mt-1 text-white/60">
            Welcome to your dashboard
          </p>
        </div>

        <button
          onClick={handleLogout}
          disabled={isLoading}
          className="flex items-center gap-2 rounded-lg bg-red-500/20 px-4 py-2 text-red-400 transition hover:bg-red-500/30"
        >
          <LogOut size={18} />
          {isLoading ? "Logging out..." : "Logout"}
        </button>
      </div>


      {/*  User information  */}
      <div className="grid gap-5 md:grid-cols-3">

        {/* Name */}
        <div className="rounded-2xl border border-white/10 bg-white/10 p-6 backdrop-blur-xl">
          <User className="mb-4 text-purple-400" size={28} />

          <p className="text-sm text-white/50">
            Name
          </p>

          <h2 className="mt-1 text-lg font-semibold text-white">
            {user?.name}
          </h2>
        </div>


        {/* Email */}
        <div className="rounded-2xl border border-white/10 bg-white/10 p-6 backdrop-blur-xl">
          <Mail className="mb-4 text-blue-400" size={28} />

          <p className="text-sm text-white/50">
            Email
          </p>

          <h2 className="mt-1 break-all text-lg font-semibold text-white">
            {user?.email}
          </h2>
        </div>


        {/* Verification */}
        <div className="rounded-2xl border border-white/10 bg-white/10 p-6 backdrop-blur-xl">
          <ShieldCheck className="mb-4 text-green-400" size={28} />

          <p className="text-sm text-white/50">
            Account Status
          </p>

          <h2 className="mt-1 text-lg font-semibold text-green-400">
            {user?.isVerified ? "Verified ✓" : "Not Verified"}
          </h2>
        </div>

      </div>


      {/* Main card */}
      <div className="mt-6 rounded-2xl border border-white/10 bg-white/10 p-8 backdrop-blur-xl">

        <h2 className="text-2xl font-bold text-white">
          Dashboard
        </h2>

        <p className="mt-2 text-white/60">
          You are successfully logged in and your account is verified.
        </p>

        <div className="mt-6 rounded-xl bg-white/5 p-5">
          <p className="text-sm text-white/50">
            Last Login
          </p>

          <p className="mt-1 text-white">
           
             {new Date(user?.lastlogin).toLocaleString()}
              
          </p>
        </div>

      </div>

    </div>
  )
}

export default DashBoard