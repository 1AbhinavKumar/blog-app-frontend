import React, { useContext, useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faTrash } from "@fortawesome/free-solid-svg-icons";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";
import { Context } from "../../context/Context";

function Singlepost() {
  const location = useLocation();
  const path = location.pathname.split("/")[2]; // to get the id of the post we have used location  use print(location .pathname )

  const [post, setPost] = useState({});
  const PF = "https://blog-app-backend-if94.onrender.com/images/";

  const { user } = useContext(Context);
  const [title,setTitle] = useState("")
  const [desc, setDesc] = useState("")
  const [updateMode, setUpdateMode] = useState(false);
  
  useEffect(() => {
    const getPost = async () => {
      const res = await axios.get("/posts/" + path);
      setPost(res.data);
      setTitle(res.data.title); 
      setDesc(res.data.desc);
    };
    getPost();
  }, [path]);

  const handledelete = async (e)=>{
    try{
      await axios.delete(`/posts/${post._id}`, {
        data: {username: user.username} ,
      })
      window.location.replace("/")
    }catch(err){} 
  }

  const handleUpdate = async (e)=>{
    try{
      const res = await axios.put(`/posts/${post._id}`, {
        username: user.username,
        title , 
        desc 
      })
      setPost({
        ...post,
        title: res.data.title,
        desc: res.data.desc,
      })
      setUpdateMode(false)
    }catch(err){
    }
  }


  return (
    <div className=" flex-9">
      <div className=" p-5 ">
        {post.photo && (
          <img
            src={PF + post.photo}
            alt=""
            className=" w-full h-80 rounded-lg object-cover p-1"
          />
        )}
        {updateMode ?(
          <input
          type="text"
          value={title}
          className=" border-none text-2xl text-center w-full mx-1 p-1 font-lora " 
          autoFocus ={true}
          onChange={(e) => setTitle(e.target.value)}
          />
        )
        :(
        <h1 className=" text-center m-3 text-2xl font-lora ">
          {post.title}

          {post.username === user?.username && (
            <div className=" float-right text-xl">
              <FontAwesomeIcon
                icon={faPenToSquare}
                className=" cursor-pointer ml-2 text-green-00 "
                onClick={()=> setUpdateMode(true)}
              />
              <FontAwesomeIcon
                icon={faTrash}
                className=" cursor-pointer ml-2 text-red-500"
                onClick={handledelete}
              />
            </div>
          )}
        </h1>
        )}

        <div className=" mb-5 flex justify-between text-base font-varela">
          <span className=" text-yellow-700">
            Author :
            <Link to={`/?user=${post.username}`}>
              <b className=" ml-1">{post.username}</b>
            </Link>
          </span>
          <span className=" text-yellow-700 mr-2">
            {new Date(post.createdAt).toDateString()}
          </span>
        </div>

        {updateMode ?
        (
          <textarea
          rows={6}
          className=" w-full p-2 "
          value={desc}
          onChange={(e)=> setDesc(e.target.value)}
          />
        ):
         (<p className=" text-gray-800 text-lg leading-6 whitespace-pre-wrap text-justify p-2">{post.desc}</p>)}

        {updateMode && (
        <div className="flex justify-end">
        <button onClick={handleUpdate} className="bg-teal-600 rounded-lg p-1 text-white cursor-pointer mt-2 border-none w-20 ">Update
        </button>
        </div>)}

      </div>
    </div>
  );
}

export default Singlepost;
