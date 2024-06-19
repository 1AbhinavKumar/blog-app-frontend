import React from 'react'
import Post from '../post/post'


function posts({posts}) {
  return (
    <div className=' flex flex-9 flex-wrap m-4 justify-center'>
      {posts.map((post)=>(
        <Post key={post._id} post={post}/>
      ))}
    
    </div>
  )
}

export default posts