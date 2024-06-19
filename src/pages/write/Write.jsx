import React, { useContext, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSquarePlus } from "@fortawesome/free-solid-svg-icons";
import {Context} from "../../context/Context"
import axios from "axios";

function Write() {
  const [title, setTitle] = useState("")
  const [desc, setDesc] = useState("")
  const [file , setFile ] = useState(null)

  const {user} = useContext(Context)

  const handleSubmit = async (e) =>{
    e.preventDefault()

    const newPost = { 
      username : user.username , 
      title, 
      desc 
    }

    if (file){
      const data = new FormData()
      const filename = Date.now() + file.name   // in order to prevent the user from giving two diff. files same name . 
      data.append("name",filename)
      data.append("file",file)
      newPost.photo = filename

      try {
        await axios.post("upload",data)
      }catch(err){}
    }
    try{
      const res = await axios.post("/posts", newPost)
      window.location.replace("/post/" + res.data._id)
    }catch(err){}
  }

  return (
    <div className=" pt-12 flex flex-col md:pl-40 pl-2">
      {file && <img
        src={URL.createObjectURL(file)}
        alt=""
        className="  md:w-3/4 pr-2 h-96 rounded-xl object-cover w-full"
      />} 
      {/* URL.createObjectURL creates a URL that represents the given file object */}
      <form className=" relative" onSubmit={handleSubmit}>
        <div className=" flex items-center ">
          <label htmlFor="fileInput">
            <FontAwesomeIcon
              icon={faSquarePlus}
              className=" w-7 h-7 text-lg flex items-center cursor-pointer text-gray-700 rounded-full justify-end "
            />
          </label>

          <input id="fileInput" type="file" style={{ display: "none" }} onChange={e=> setFile(e.target.files[0])}/>

          <input
            placeholder="Title ..."
            type=" text"
            autoFocus={true}
            className=" text-xl border-none p-5  w-3/4 placeholder:text-gray-500 font-normal focus:outline-none "
            onChange={e=> setTitle(e.target.value)}
          />
        </div>
        <div>
          <textarea
            placeholder="Tell your story.... "
            type="text"
            rows={6}
            autoFocus={true}
            className=" text-2xl border-none p-5 w-3/4 placeholder:text-gray-500 font-normal  focus:outline-none"
            onChange={e=> setDesc(e.target.value) }
          />
        </div>
        <button type=" submit" className=" absolute top-5 right-11 border-none rounded-md text-white text-xl cursor-pointer flex items-center bg-teal-500 p-1 hover:bg-teal-400">Publish</button>
      </form>
    </div>
  );
}

export default Write;
