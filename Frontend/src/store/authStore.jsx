import { create } from "zustand"
import axios from "axios"

const API_URL = "/api/auth"

axios.defaults.withCredentials = true

export const useAuthStore = create((set)=> ({
  user:null,
  isAuthenticated:false,
  error:null,
  isLoading:false,
  isChekingAuth:false,
  message:null,
   signup:async (name,email,password) => {

    set({isLoading:true,error:null})

    try {

      const response = await axios.post(`${API_URL}/signup`,{name,email,password})
       set({user:response.data.user, isAuthenticated:true,isLoading:false})
      return response.data
    } catch (error) {
      set({
             error: error.response?.data?.error || error.response?.data?.message || "Error to signup",
                isLoading: false
              })
      throw error
    }
  },
  verifyEmail: async (code) => {
    set({error:null,isLoading:true})
    try {
      const response = await axios.post(`${API_URL}/verify-email`,{code})
      set({user:response.data.user,isAuthenticated:true,isLoading:false})
      return response.data
    } catch (error) {
       set({
             error: error.response?.data?.error || error.response?.data?.message || "Error to signup",
                isLoading: false
              })
      throw error
    }
  },
  checkAuth : async () => {
    // await new Promise ( (resolve)=>setTimeout(resolve,2000) )
    set({isChekingAuth:true})
    try {
      const response = await axios.get(`${API_URL}/auth-check`)
      set({user:response.data.user,isAuthenticated:true,isChekingAuth:false})
      return response.data
    } catch {
      // A missing or expired session is an expected result during app startup.
      set({error:null,isAuthenticated:false,isChekingAuth:false})
    }
  },
  login:async (email,password) => {
    set({error:null , isLoading:true})
    try {
      const response = await axios.post(`${API_URL}/login`,{email,password})
      set({user:response.data.user,isAuthenticated:true,isLoading:false})
      return response.data
    } catch (error) {
             set({
             error: error.response?.data?.error || error.response?.data?.message || "Error to login",
                isLoading: false
              })
      throw error
    }
    
  },
  logout:async () =>{
    set({error:null,isLoading:true})
    try {
      const response = await axios.post(`${API_URL}/logout`)
      set({user:response.data.user,isAuthenticated:false,isLoading:false})
      return response.data
    } catch (error) {
      set({error:null,isLoading:false})
      throw error
    }
  },
  forgotpassword: async (email) => {
    set({isLoading:false,error:null})
    try {
      const response = await axios.post(`${API_URL}/forgot-password`,{email})
      set({message:response.data.message,isLoading:false})
    } catch (error) {
      set({error:error.response?.date?.message || error.response?.data?.error || "error to forgot password" ,  isLoading:false})
    }
    
  },
  resetpassword: async (token, password) => {
    set({isLoading:true,error:null})
    try {
        const response = await axios.post(`${API_URL}/reset-password/${token}`,{password})
        set({message:response.data.message,isLoading:false})
    } catch (error) {
       set({error:error.response?.date?.message || error.response?.data?.error || "error to forgot password" ,  isLoading:false})
    }
  }

  

}))
