import React from 'react'
import  Background from '../assets/bg.jpg'

const Login = () => {
  return (
    <div className='  relative h-screen bg-cover bg-center'>
       <img src={ Background} alt='bg' className=' blur-sm' />
    
       <div className="absolute inset-0 flex items-center justify-center font-poppins bg-black bg-opacity-50">
        <div className='grid grid-cols-1  '>
          <div className='  bg-primary w-96 h-100 shadow-lg rounded-md'>
              <div>
                <p className='text-center mt-8 text-3xl text-secondary font-semibold'>FLIXPAL</p>
              </div>

              
              <div className='grid grid-rows-3 gap-4 mt-16  justify-center'>
              
                
                <div>
                    <input type='email'  className='w-72 h-10 px-2 rounded-md bg-gray-300' placeholder='email' required />
                </div>
                <div>
                    <input type='password'  className='w-72 h-10 px-2 rounded-md bg-gray-300' placeholder='password' required />
                </div>
              </div>

              <div className='-mt-5 text-center  font-semibold text-white'>
                <button type="submit" className=' bg-button px-10 py-2 rounded-lg shadow-md hover:bg-secondary  '>Sign In</button>
              </div>
              

              <div className='mt-4 text-center'>
                <p className='text-gray-300'>if you don't have an Account <a href='/register' className='text-secondary'>Sign Up</a> </p>
              </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login