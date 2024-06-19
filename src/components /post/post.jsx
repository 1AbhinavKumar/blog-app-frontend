import React from "react";
import {Link} from "react-router-dom"

function post({ post }) {
  const PF = "http://localhost:5000/images/"

  return (
    <div className="lg:w-96 mt-4 mb-10 mx-6 ">
      {post.photo && (
        <img
          src={PF + post.photo}
          alt=""
          className=" w-full object-cover rounded-md h-60"
        />
      )}

      <div className=" flex flex-col items-center">
        <div className=" font-varela cursor-pointer">
          {post.categories.map((category) => (
            <span 
            className=" font-varela text-xs text-yellow-700 leading-5 mt-5 mr-3 cursor-pointer">
              {category.name}
            </span>
          ))}
        </div>
        <span className=" font-Js-Ss text-xl font-black mt-4 cursor-pointer">
        <Link to={`/post/${post._id}`}>
          {post.title}
        </Link>
        </span>
        <hr />
        <span className=" font-lora italic text-sm font-normal mt-3">
          {new Date(post.createdAt).toDateString()}
        </span>
      </div>
      <p className=" font-varela text-sm font-normal leading-5 mt-4 overflow-hidden text-ellipsis line-clamp-4">
        {post.desc}
      </p>
    </div>
  );
}

export default post;
