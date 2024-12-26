// import React from 'react'

import { useState } from "react";
import { Link } from "react-router-dom";


const UserLogin = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const [userData, setUserData] = useState({})

    const submitHandler = (e) =>{
        e.preventDefault();
        setUserData({
            email:email,
            password:password
        })
        // console.log(userData)
        setEmail('')
        setPassword('')
    }
  return (
    <>
   <div className='p-7 h-screen flex-col justify-between'>
   <div>
     <div className='p-7'>
        <h2 className='text-3xl font-bold text-left w-16 mb-10'>Keshav</h2>
      <form onSubmit={(e)=>{
        submitHandler(e)
    }}>

        <h3 className='text-lg font-medium mb-2'> What is your email</h3>
        <input 
         required
         value={email}
         onChange={(e)=>{
          setEmail(e.target.value);
         }}
         className='bg-[#eeeeee] mb-7 rounded px-4 py-2 border w-full text-lg placehoder:text-base'
         type="email" 
         placeholder="email@example.com"
          />

        <h3 className='text-lg  font-medium mb-2'>Enter your password</h3>
        
        <input 
        required
        value={password}
        onChange={(e)=>{
         setPassword(e.target.value);
        }} 
        className='bg-[#eeeeee] mb-7 rounded px-4 py-2 border w-full text-lg placehoder:text-base'
        type="password"
        placeholder="password"
         />

          <button className='bg-[#111] text-white font-semibold mb-7 rounded px-4 py-2  w-full text-lg placehoder:text-base'>Login</button>
          
        </form>
        <p className='text-center'>New here? <Link to='/signup' className='text-blue-600'>Create new Account </Link></p>
       </div>
   </div>

   <div> 
     <Link  to='/captain-login'className='bg-[#808080] flex item-center justify-center text-white font-semibold mb-5 rounded px-4 py-2  w-full text-lg placehoder:text-base'>Signin as Captain</Link>
   </div>

   </div>
  </>
  );
};

export default UserLogin;
