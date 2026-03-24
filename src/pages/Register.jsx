import React, { useEffect, useState, useMemo, useRef } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import Header from '../components/Header';
import axios from 'axios';
import { MousePointer2, IndianRupee, MessageSquareHeart, Fullscreen } from 'lucide-react';
import { gsap } from 'gsap'
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
gsap.registerPlugin(ScrollToPlugin);

const Register = () => {
  const navigate = useNavigate();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [fullname, setFullname] = useState('');
  const [city, setCity] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');








  const submitHandler = async (e) => {
    e.preventDefault();
    await axios.post('https://nodejs-production-42f2.up.railway.app/register', {
      username: username,
      password: password,
      fullname: fullname,
      email: email,
      phone: phone,
      city: city

    }).then((res) => {
      res.data
      if (res.data.message === "Username already exists") {
        alert("Username already exists")
      }
      else {
        alert("Registered Successfully");
        navigate('/login');

      }
    })


  }
  return (
    <div className='h-100vh w-100vw'>
      <Header />

      <div className='w-full h-full flex flex-col items-center' style={{  color: 'black' }}>
        <div className='bg-amber-100 w-[80vw] rounded-3xl p-5 mb-10'>
          <h1 className='text-[#151623] font-extrabold' style={{ fontFamily: 'rpf', color: '#151623' }}>Register to Thrill Trips</h1>

          <form onSubmit={submitHandler}>
            <h6 className='my-4 text-red-800'>Username</h6>

            <input type="text" title='Username Required' required placeholder='Enter Username' style={{ fontFamily: 'verdana' }} className='w-full placeholder:text-gray-500 font-semibold text-[#053345] rounded-2xl border-2 bg-[#BEDBFF] py-1 px-3' min={1} value={username} onChange={(e) => setUsername(e.target.value)} />
            <h6 className='my-4 text-red-800'>Password</h6>

            <input type="password" required placeholder='Enter Password' value={password} onChange={(e) => setPassword(e.target.value)} style={{ fontFamily: 'verdana' }} className='w-full placeholder:text-gray-500 text-[#053345] rounded-2xl border-2 bg-[#BEDBFF] py-1 px-3' min={1} />

            <h6 className='my-4 text-red-800'>Fullname</h6>

            <input type="text" required placeholder='Enter Fullname' value={fullname} onChange={(e) => setFullname(e.target.value)} style={{ fontFamily: 'verdana' }} className='w-full  placeholder:text-gray-500 rounded-2xl border-2 bg-[#BEDBFF] py-1 px-3' min={1} />

            <h6 className='my-4 text-red-800'>Email</h6>

            <input type="email" required placeholder='Enter Email' value={email} onChange={(e) => setEmail(e.target.value)} style={{ fontFamily: 'verdana' }} className='w-full  placeholder:text-gray-500 rounded-2xl border-2 bg-[#BEDBFF] py-1 px-3' min={1} />

            <h6 className='my-4 text-red-800'>Phone Number</h6>

            <input type='tel' minLength={10} pattern='^[0-9]{10}$' title='Enter Valid Mobile Number' required placeholder='Enter Phone Number' value={phone} onChange={(e) => setPhone(e.target.value)} maxLength={10} style={{ fontFamily: 'verdana' }} className='w-full  placeholder:text-gray-500 rounded-2xl border-2 bg-[#BEDBFF] py-1 px-3' />

            <h6 className='my-4 text-red-800'>City</h6>

            <input type="text" required placeholder='Enter Fullname' value={city} onChange={(e) => setCity(e.target.value)} style={{ fontFamily: 'verdana' }} className='w-full  placeholder:text-gray-500 rounded-2xl border-2 bg-[#BEDBFF] py-1 px-3' min={1} />

            <br />
            <button type='submit' className='bg-amber-500 hover:bg-green-500 transition-all duration-500 text-white  py-2 px-4 font-medium rounded-2xl mt-5 tracking-wider'>Register</button>
          </form>
        </div>
      </div>
    </div>

  )
}

export default Register
