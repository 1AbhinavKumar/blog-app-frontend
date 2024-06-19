import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

export default function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState(""); 
  const [error, setError] = useState(""); 

  const handleSubmit = async (e) =>{
    e.preventDefault(); 
    setError(false); 
    try{
      const res = await axios.post("/auth/register",{
        username, 
        email,
        password,
      });
      res.data && window.location.replace("/login") // to redirect to login page if everything goes fine 
    }catch(err){
      setError(true); 
    }
  }

  
  return (
    <div className=" h-screen flex flex-col  justify-center bg-cover items-center bg-login-page">
      <div className=" bg-slate-400 p-5 flex flex-col items-center rounded-3xl bg-opacity-35">

      <span className=" text-4xl font-lora font-black text-black p-2 rounded-2xl">
        Register
      </span>

      <form className=" mt-2 flex flex-col" onSubmit={handleSubmit}>
        <label className=" mt-3 mb-3 font-black font-lora font-2xl ">Username</label>
        <input
          className=" p-3 bg-white border-none rounded-2xl focus:outline-none bg-opacity-95"
          type="text"
          placeholder="Enter your username..."
          onChange={(e)=> setUsername(e.target.value)}
          />

        <label className=" mt-3 mb-3 font-black font-lora font-2xl ">Email</label>
        <input
          className=" p-3 bg-white border-none rounded-2xl focus:outline-none bg-opacity-95"
          type="text"
          placeholder="Enter your email..."
          onChange={(e)=> setEmail(e.target.value)}
          />

        <label className=" mt-3 mb-3 font-black font-lora font-2xl ">Password</label>
        <input
          className=" p-3 bg-white border-none rounded-2xl focus:outline-none bg-opacity-95"
          type="password"
          placeholder="Enter your password..."
          onChange={(e)=>setPassword(e.target.value)}
          />

        <button className="mt-5 cursor-pointer bg-teal-600 text-white p-3 border-none rounded-lg text-center hover:bg-teal-400">Register</button>
      </form>

      <button className="block  absolute top-14 right-5 bg-slate-600 cursor-pointer p-2 text-white rounded-lg mt-2 hover:bg-slate-400">
        <Link to='/login'> Login </Link>
      </button>
        </div>
        {error && <span className=" text-red-600 font-black pt-2">Something went wrong!</span>}
    </div>
  );
}