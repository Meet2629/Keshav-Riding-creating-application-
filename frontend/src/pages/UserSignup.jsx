// import React from 'react'

import { useState } from "react"
import { Link } from "react-router-dom"


const UserSignup = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [firstname, setfirstname] = useState('')
  const [lastname, setlastname] = useState('')
  const [userData, setUserData] = useState({})

  const submitHandler=(e)=>{
    e.preventDefault()
    setUserData({
      fullname:{
        firstname:firstname,
        lastname:lastname
      },
      email:email,
    password:password 
    })

    

    setEmail('')
    setPassword('')
    setfirstname('')
    setlastname('')
    
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

     <h3 className='text-lg font-medium mb-2'> What is your name</h3>
      <div className='flex gap-4 mb-6'>
      <input 
         required
         className='bg-[#eeeeee] w-1/2 rounded px-4 py-2 border  text-lg placehoder:text-base'
         type="text" 
         placeholder="First name"
         value={firstname}
         onChange={(e)=>{
          setfirstname(e.target.value)
         }}
           />

           <input 
         required
         className='bg-[#eeeeee] w-1/2 rounded px-4 py-2 border text-lg placehoder:text-base'
         type="text" 
         placeholder="Last name"
         value={lastname}
         onChange={(e)=>{
          setlastname(e.target.value)
         }}
           />
      </div>

        <h3 className='text-lg font-medium mb-2'> What is your email</h3>
        <input 
         required
         className='bg-[#eeeeee] mb-6 rounded px-4 py-2 border w-full text-lg placehoder:text-base'
         type="email" 
         placeholder="email@example.com"
         value={email}
         onChange={(e)=>{
          setEmail(e.target.value)
         }}
          />

        <h3 className='text-lg font-medium mb-2'>Enter your password</h3>
        
        <input 
        required
        className='bg-[#eeeeee] mb-6 rounded px-4 py-2 border w-full text-lg placehoder:text-base'
        type="password"
        placeholder="password"
        value={password}
         onChange={(e)=>{
          setPassword(e.target.value)
         }}
         />

          <button className='bg-[#111] text-white font-semibold mb-6 rounded px-4 py-2  w-full text-lg placehoder:text-base'>Signup</button>
          
        </form>
        <p className='text-center'>Already have a Account? <Link to='/login' className='text-blue-600 mb-7 '>Login here</Link></p>
       </div>
   </div>

   <div className="text-[10px] leading-tight"> 
     <p>This site is protected by reCAPTCHA and the <span className="underline">Google Privacy Policy</span> and <span className="underline">Terms of Service apply</span>.</p>
   </div>

   </div>
  </>
  )
}

export default UserSignup