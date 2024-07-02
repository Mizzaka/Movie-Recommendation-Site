import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import  Background from '../assets/bg.jpg'

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await login(email, password);
            navigate('/');

        } catch (error) {
            console.error('Login failed', error);
        }
    };


  return (
    <div className='  relative h-screen bg-cover bg-center'>
       <img src={ Background} alt='bg' className=' blur-sm' />
    
       <div className="absolute inset-0 flex items-center justify-center font-poppins bg-black bg-opacity-50">
        <div className='grid grid-cols-1  '>
          <div className='  bg-primary w-96 h-100 shadow-lg rounded-md'>
              <div>
                <p className='text-center mt-8 text-3xl text-secondary font-semibold'>FLIXPAL</p>
              </div>

              <form onSubmit={handleSubmit}>
              <div className='grid grid-rows-3 gap-4 mt-16  justify-center'>
              
                
                <div>
                    <input type='email' value={email} onChange={(e) => setEmail(e.target.value)} required  className='w-72 h-10 px-2 rounded-md bg-gray-300' placeholder='email'  />
                </div>
                <div>
                    <input type='password' value={password} onChange={(e) => setPassword(e.target.value) } required className='w-72 h-10 px-2 rounded-md bg-gray-300' placeholder='password'  />
                </div>
              </div>

              <div className='-mt-5 text-center  font-semibold text-white'>
                <button type="submit" className=' bg-button px-10 py-2 rounded-lg shadow-md hover:bg-secondary  '>Sign In</button>
              </div>
              </form>

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