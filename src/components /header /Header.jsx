import React from 'react'
import homewallpaper from "../assets/moon_tree_starry_sky_132139_3840x2160.jpg"
function Header() {
  return (
    <div className=''>
       <div className=' flex flex-col items-center font-lora'>
            <span className=' absolute top-18 text-5xl text-white md:top-20'>Tech Trends  </span>
            <span className=' absolute top-20 text-8xl text-white mt-8 md:mt-10'> Blogs</span>
       </div>
       <img className=" w-full  h-96 object-cover bg-opacity-45" src={homewallpaper} alt='' />
    </div>
  )
}

export default Header