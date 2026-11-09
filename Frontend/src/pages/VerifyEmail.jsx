import { useState, useRef, useEffect, } from "react";

import { motion } from "framer-motion";

import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/authStore";
import toast from "react-hot-toast";

function VerifyEmail() {
  const codeLength = 6;
  const [code, setCode] = useState(new Array(codeLength).fill(""));
  const inputRefs = useRef([]);
  const navigate = useNavigate();
  const { verifyEmail, error, isLoading } = useAuthStore()
  const handleChange = (value,index) => {
    if(isNaN(value)) return
    const newValue = value.trim()
    const newCode = [...code] 
    if (value.length > 1) {
     const pastedCode = value.slice(0,6).split("");
     for( let i = 0; i < pastedCode.length; i++) {
      newCode[i] = pastedCode[i] || ""
     }
     setCode(newCode)
     const lastFilledIndex = newCode.findIndex((digit) => digit === "");
     const focusIndex = lastFilledIndex < 5 ? lastFilledIndex : 5;
      inputRefs.current[focusIndex]?.focus();
      return
    }
    else {
      newCode[index] = newValue.slice(-1); // Ensure only one character is entered
      setCode(newCode)
      newValue && inputRefs.current[index + 1]?.focus() // Move focus to the next input field
    }
    
   
  };

  const handleOnKeyDown = ( e , index ) => {
     if(e.key === "Backspace"  && !code[index] ) {
      inputRefs.current[index - 1]?.focus() 
     }
  };   

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        const verifcationCode = code.join("") ;
        await verifyEmail(verifcationCode)
        toast.success("Email verified  successfully")
        console.log(`your verifcationCode is submited ${verifcationCode}`)
        navigate("/")
    } catch (error) {
      console.log(error)
      toast.error(error.response?.data?.message || "Email verification failed")
    }
  
  };

  useEffect(()=>{
    inputRefs.current[0]?.focus()
  },[])

  useEffect(()=>{
    if(code.every((digit) => digit !== "")){
      handleSubmit(new Event("submit"))
    }
  },[code])

  return (
   <div className="min-h-screen flex items-center justify-center px-4">
      <motion.div
        className="w-full max-w-md overflow-hidden rounded-2xl border border-white/10 bg-white/10 p-8 shadow-2xl backdrop-blur-xl"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Heading */}
        <h2 className="text-2xl font-bold text-center text-white">
          Verify Your Email 
        </h2>
                                                                                
        {/* Description */}
        <p className="mt-3 text-center text-sm leading-6 text-white/60">
          Please enter the 6 digit code sent to your email address to verify
          your account.
        </p>

        <form onSubmit={handleSubmit} className="mt-8 space-y-6">
          {/* OTP inputs */}
          <div className="flex justify-center gap-3">
            {code.map((digit, index) => (
              <input
                key={index}
                type="text"
                ref={(input) => (inputRefs.current[index] = input)}
                value={code[index]}
                onChange={(e) => handleChange(e.target.value,index )}
                onKeyDown={(e) => handleOnKeyDown(e, index)}
                className="h-14 w-12 rounded-xl border border-white/10 bg-black/20 text-center text-xl font-bold text-white outline-none transition duration-200 focus:border-purple-400/60 focus:bg-white/5 focus:ring-2 focus:ring-purple-500/20"
              />
            ))}
          </div>

          {/* Submit button */}
          {error && <p className="text-red-500 font-semibold mt-1">{error}</p>}
          <motion.button
            type="submit"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="w-full rounded-xl bg-linear-to-r from-purple-600 to-blue-600 py-3 font-semibold text-white shadow-lg shadow-purple-500/20 transition"
          >
             {isLoading ? "Verifying...": "Verify Email"} 
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
}

export default VerifyEmail;

