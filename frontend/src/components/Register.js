import React from 'react'
import  Background from '../assets/bg.jpg'

const Register = () => {
  return (
    <div className='  relative h-screen bg-cover bg-center'>
       <img src={ Background} alt='bg' className=' blur-sm' />
    
       <div className="absolute inset-0 flex items-center justify-center font-poppins bg-black bg-opacity-50">
        <div className='grid grid-cols-1  '>
          <div className='  bg-primary w-96 h-128 shadow-lg rounded-md'>
              <div>
                <p className='text-center mt-8 text-3xl text-secondary font-semibold'>FLIXPAL</p>
              </div>

              <div className='grid grid-rows-3 gap-4 mt-20  justify-center'>
                <div>
                    <input type='text' className='w-72 h-10 px-2 rounded-md bg-gray-300' placeholder='username' />
                </div>
                <div>
                    <input type='email' className='w-72 h-10 px-2 rounded-md bg-gray-300' placeholder='email' />
                </div>
                <div>
                    <input type='password' className='w-72 h-10 px-2 rounded-md bg-gray-300' placeholder='password' />
                </div>
              </div>

              <div className='mt-10 text-center  font-semibold text-white'>
                <button className=' bg-button px-10 py-2 rounded-lg shadow-md hover:bg-secondary  '>Sign Up</button>
              </div>

              <div className='mt-10 text-center'>
                <p className='text-gray-300'>if you are alredy Sign Up? <a href='#' className='text-secondary'>Login</a> </p>
              </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Register