import React, { useEffect, useState } from 'react'
import Header from '../../components /header /Header'
import Posts from '../../components /posts/Posts'
import Sidebar from '../../components /sidebar/sidebar'
import axios from 'axios'
import {  useLocation } from 'react-router-dom'

function Home() {
  const [posts, setPosts] = useState([]);
  // Intially our posts are empty . 
  // now we are using useffect and fetchpost to fetch the posts . 
  const {search} = useLocation();  // used to get the search property 
  

  useEffect(()=>{
    const fetchPosts = async () => {
      const res = await axios.get("/posts"+ search);
      setPosts(res.data);
    }
    fetchPosts();
  },[search])

  return (
    <>
        <Header />
        <div className=' flex '>
            <Posts posts={posts}/>  
            {/* here posts passed as prop */}
            <Sidebar />
        </div>
    </>
  )
}

export default Home