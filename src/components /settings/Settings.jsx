import React, { useContext, useState } from "react";
import Sidebar from "../sidebar/sidebar";
import User_img from "../assets/usr_img.jpeg";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleUser } from "@fortawesome/free-solid-svg-icons";
import { Context } from "../../context/Context";
import axios from "axios";


function Settings() {

  const {user,dispatch} = useContext(Context)
  const [file, setFile] = useState(null)
  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [success, setSuccess] = useState(false)
  const PF = "http://localhost:5000/images/"
  const handleSubmit = async(e) =>{
    e.preventDefault()
    dispatch({type:"UPDATE_START"})
    const updatedUser = {
      userId : user._id, 
      username, 
      email, 
      password 
    }

    if (file){
      const data = new FormData(); 
      const filename = Date.now() + file.name;
      data.append("name",filename)
      data.append("file",file)
      updatedUser.profilePic = filename; 
      try {
        await axios.post("/upload", data)
      }catch(err){
        console.log(err)
      }
    }
    
    try {
      const res = await axios.put("/users/"+user._id, updatedUser)
      setSuccess(true)
      dispatch({type:"UPDATE_SUCCESS", payload: res.data})
    }catch(err){
      dispatch({type: "UPDATE_FAILURE"})
    }
  }

  return (
    <div className=" flex ">
      <div className=" flex-9 p-5">
        <div className=" flex items-center justify-between">
          <span className=" text-2xl mb-5"> Update your account</span>
          <span className=" text-red-800 text-xs cursor-pointer">
            Delete account
          </span>
        </div>

        {/* --------------- form part ---------------------- */}
        <form className=" flex flex-col" onSubmit={handleSubmit}>
          <label className=" text-lg mt-5"> Profile Picture</label>

          <div className=" flex items-center mt-3 mb-3">
            <img
              src={file ? URL.createObjectURL(file): user.profilePic.length > 0 ? PF+user.profilePic : User_img}
              alt=""
              className=" h-24 w-20 rounded-md object-cover"
            />
            <label htmlFor="fileInput">
              <FontAwesomeIcon
                icon={faCircleUser}
                className=" w-6 h-6 p-1 flex justify-center items-center border-none rounded-full ml-2 text-white bg-teal-400 cursor-pointer"
              />
            </label>
            <input
              id="fileInput"
              type="file"
              style={{ display: "none" }}
              className=" w-1/3 "
              onChange={(e)=> setFile(e.target.files[0])}
            />
          </div>

          {/* --------text area and labels -------------- */}
          <label className=" text-lg mt-5"> Username</label>
          <input
            type="text"
            name="name"
            placeholder={user.username}
            className=" text-gray-700 mt-3 mb-3 h-7 border-gray-500 border-b focus:outline-none"
            onChange={(e) => setUsername(e.target.value)}
          />

          <label className=" text-lg mt-5">Email</label>
          <input
            type="email"
            placeholder={user.email}
            name="email"
            className=" text-gray-700 mt-3 mb-3 h-7 border-gray-500 border-b  focus:outline-none"
            onChange={(e) => setEmail(e.target.value)}
          />

          <label className=" text-lg mt-5"> Password</label>
          <input
            type="password"
            placeholder="password"
            name="password"
            className=" text-gray-700 mt-3 mb-3 h-7 border-b border-gray-400 focus:outline-none"
            onChange={(e) => setPassword(e.target.value)}
          />

          <button
            type="submit"
            className=" items-center w-28  border-none  rounded-lg text-white bg-teal-600 p-2 mt-5 cursor-pointer flex justify-center hover:bg-teal-500 self-center"
          >
            Update
          </button>
          {success && <span className="text-green-700 text-center mt-3">Your Profile has been Updated...</span>}
        </form>
      </div>
      <Sidebar />
    </div>
  );
}

export default Settings;
