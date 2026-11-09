import { Routes ,Route, Navigate} from "react-router-dom"
import SignUp from "./pages/SignUp";
import Login from "./pages/login";
import VerifyEmail from "./pages/VerifyEmail";
import { Toaster } from "react-hot-toast";
import { useAuthStore } from "./store/authStore";
import { useEffect } from "react";
import DashBoard from "./pages/DashBoard";
import LoadingSpinner from "./components/LoadingSpinner";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";


const ProtectedRoute = ({children}) =>{
  const {isAuthenticated,user,isChekingAuth} = useAuthStore()
  if (isChekingAuth) return null
  if (!isAuthenticated) return <Navigate to="/login" replace/>
  if (!user?.isVerified) return <Navigate to="/verify-email" replace/>
  return children
}
const RedirectAuthentucatedUser = ({children}) => {
   const {isAuthenticated,user,isChekingAuth} = useAuthStore()
  if (isChekingAuth) return null
  return isAuthenticated && user?.isVerified ? <Navigate to="/" replace/>:children
   }    
function App() {
   const {checkAuth,isChekingAuth,isAuthenticated,user } = useAuthStore()
   useEffect(()=>{
    checkAuth()
   },[checkAuth])
   console.log("isAuthenticated",isAuthenticated)
   console.log("user",user)
    
if(isChekingAuth) return <LoadingSpinner/>

  return (
   <div className="min-h-screen bg-linear-to-br from-gray-950 via-purple-950 to-blue-950 flex items-center justify-center px-4 relative overflow-hidden">
    <Routes>
      <Route path="/" element={
        <ProtectedRoute>
        <DashBoard/>
        </ProtectedRoute>
        } />
      <Route path="/signup" element={
        <RedirectAuthentucatedUser>
           <SignUp/>
        </RedirectAuthentucatedUser>
        } />
      <Route path ="/login" element={
         <RedirectAuthentucatedUser>
          <Login/>
        </RedirectAuthentucatedUser>
        } />
      <Route path ="/verify-email" element={ <VerifyEmail/>} />
      <Route path ="/forgot-password" element={ 
        <RedirectAuthentucatedUser>
          <ForgotPassword/>
        </RedirectAuthentucatedUser> 
      } 
        />

        <Route path ="/reset-password/:token" element={ 
        <RedirectAuthentucatedUser>
          <ResetPassword/>
        </RedirectAuthentucatedUser> 
      } 
        />
      
    </Routes>
    <Toaster />
    </div>
  );
}

export default App;