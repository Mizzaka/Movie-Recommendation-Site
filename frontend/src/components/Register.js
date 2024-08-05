import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import  Background from '../assets/bg.jpg'

const Register = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { register } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
    await register (username, email, password);
    navigate('/testlogin');
    } catch (error) {
        console.error('Registration error:', error);
    }
  };

  return (

    //Update
    <div className='  relative h-screen bg-cover bg-center'>
       <img src={ Background} alt='bg' className=' blur-sm' />
    
       <div className="absolute inset-0 flex items-center justify-center font-poppins bg-black bg-opacity-50">
        <div className='grid grid-cols-1  '>
          <div className='  bg-card w-96 h-128 shadow-lg rounded-md'>
              <div>
                <p className='text-center mt-8 text-3xl text-secondary font-semibold'>FLIXPAL</p>
              </div>

              <form onSubmit={handleSubmit}>
              <div className='grid grid-rows-3 gap-4 mt-20  justify-center'>
              
                <div>
                    <input type='text' value={username} onChange={(e) => setUsername(e.target.value)} className='w-72 h-10 px-2 rounded-md bg-gray-300' placeholder='username'  required/>
                </div>
                <div>
                    <input type='email' value={email} onChange={(e) => setEmail(e.target.value)} className='w-72 h-10 px-2 rounded-md bg-gray-300' placeholder='email' required />
                </div>
                <div>
                    <input type='password' value={password} onChange={(e) => setPassword(e.target.value)} className='w-72 h-10 px-2 rounded-md bg-gray-300' placeholder='password' required />
                </div>
              </div>

              <div className='mt-10 text-center  font-semibold text-white'>
                <button type="submit" className=' bg-button px-10 py-2 rounded-lg shadow-md hover:bg-secondary  '>Sign Up</button>
              </div>
              </form>

              <div className='mt-10 text-center'>
                <p className='text-gray-300'>if you are alredy Sign Up? <a href='/login' className='text-secondary'>Login</a> </p>
              </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Register