import React from 'react'

import New from "../assets/new.jpg";
const NavBar = () => {
  return (
    
        <div className="grid grid-cols-1 md:grid-cols-2 mx-10 mr-0 mb-5 ">
            <div className="col-span-1 md:col-span-1 flex justify-center md:justify-start relative ">
              <input
                type="text"
                name="movie"
                className="w-full md:w-1/2 lg:w-96 h-10 px-4 py-2 rounded-lg text-gray-600 bg-gray-300"
                placeholder="Search Your Movie"
              />
              
            </div>
           
          

          <div className='flex gap-10 justify-end '>
             <div className='mt-3'>
                <a href='#' className='text-secondary' >Login</a>
             </div>

             <div>
             <a href='#'><img
            src={New}
            alt="Description of image"
            className="w-12 h-12 object-cover rounded-full opacity-80"
          /></a>
             </div>
          </div>
          
          </div>
    
  )
}

export default NavBar