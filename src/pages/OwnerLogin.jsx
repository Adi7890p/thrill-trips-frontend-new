import React, { useState } from 'react'
import { fireapp } from '../../backend/firebase'
import Header from '../components/Header'
import axios from 'axios';
import { GoogleAuthProvider, signInWithRedirect, onAuthStateChanged, getAuth, signInWithPopup } from 'firebase/auth'
import { useNavigate } from 'react-router-dom';
const auth = getAuth(fireapp);
const googleProvider = new GoogleAuthProvider();

const OwnerLogin = () => {
    const [email, setEmail] = useState('');
    const [pwd, setPwd] = useState('');
    const [msg, setMsg] = useState('');
    const [state, setState] = useState("Login");
    const navigate = useNavigate();

    const submitHandler = async (e) => {
        e.preventDefault();
        setMsg('');
        console.log(email, pwd);
        if (state == "SignUp") {
            await axios.post("https://nodejs-production-42f2.up.railway.app/owner-signup-email", {
                email: email,
                pwd: pwd
            }).then((res) => {
                console.log(res.data);
                if (res.data.message?.code?.includes("weak-password")) {
                    setMsg("Password should be at least 6 characters long");
                }
                if (res.data.success) {
                    alert("SignUp Successful");
                    setState("Login");
                    setEmail('');
                    setPwd('');
                }
                if (res.data.message?.code?.includes("email-already-in-use")) {
                    alert("Email already in use!");
                    setEmail('');
                    setPwd('');
                }
            }).catch((err) => {
                console.log(err);
            })
        } else {
            await axios.post("https://nodejs-production-42f2.up.railway.app/owner-login-email", {
                email: email,
                pwd: pwd
            }).then((res) => {
                console.log(res.data);
                if (res.data.message?.includes("email not found")) {
                    alert("User not found. Please SignUp");

                }
                if (res.data.success) {
                    sessionStorage.setItem("token", res.data.token);
                    sessionStorage.setItem("owner", email);
                    alert(res.data.message);
                    navigate("/owner-dashboard");
                }
                if (res.data.message?.includes("wrong")) {
                    setMsg("Wrong Password Entered!");
                }
            }).catch((err) => {
                console.log(err);
            })
        }

    }
    // const [em,setEm] = useState("");
    const googleSign = async () => {
        let em = "";
        await signInWithPopup(auth, googleProvider).then((result) => {
            console.log(result);
            // setEm(result.user.email);
            em = result.user.email;
            console.log(em);
        }).catch((error) => {
            // console.log(error);
        })
        if (em != "") {

            await axios.post("https://nodejs-production-42f2.up.railway.app/google-signin", {
                email: em
            }).then((res) => {
                console.log(res.data);
                sessionStorage.setItem("token", res.data.token);
                sessionStorage.setItem("owner", em);
                alert(res.data.message);
                navigate("/owner-dashboard");
            }).catch((err) => {
                console.log(err);
            })
        }
        // setEm("");
        em = "";


    }
    return (
        <div>
            <Header />
            <div className='flex w-full h-full justify-center'>
                <div className='bg-amber-100 w-[80vw] rounded-3xl p-5 mb-10'>
                    <h1 className='text-[#151623] font-extrabold mb-[30vh]' style={{ fontFamily: 'rpf', color: '#151623' }}>{state} to Thrill Trips</h1>
                    <div className='flex w-full mb-[-30vh] justify-center relative'>

                        <p className=' text-amber-900 w-fit bg-amber-100 font-[rpf] tracking-[0.2vw]'>Or</p>
                    </div>
                    <div className='flex w-full'>
                        <div className="left w-1/2 border-r-2 border-amber-900 px-4">
                            <h4 className='text-yellow-800 '>{state} with Email</h4>
                            <form onSubmit={(e) => { submitHandler(e) }}>
                                <h6 className='my-4 text-red-800'>Email</h6>

                                <input value={email} onChange={(e) => { setEmail(e.target.value) }} type="email" title='Username Required' required placeholder='Enter Username' style={{ fontFamily: 'verdana' }} className='w-full placeholder:text-gray-500 font-semibold text-[#053345] rounded-2xl border-2 bg-[#BEDBFF] py-1 px-3' min={1} />
                                <h6 className='my-4 text-red-800'>{state == "SignUp" ? "Create " : ""}Password</h6>

                                <input value={pwd} onChange={(e) => { setPwd(e.target.value) }} type="password" required placeholder='Enter Password' style={{ fontFamily: 'verdana' }} className='w-full placeholder:text-gray-500 text-[#053345] rounded-2xl border-2 bg-[#BEDBFF] py-1 px-3' min={1} />
                                <span className='text-black' >{msg}</span>

                                <br />
                                <button type='submit' className='bg-amber-500 hover:bg-green-500 transition-all duration-500 text-white  py-2 px-4 font-medium rounded-2xl mt-3 tracking-wider'>{state}</button>
                            </form>
                        </div>
                        <div className="right w-1/2 h-full ">
                            <h4 className='text-yellow-800 px-4'>{state} with Google</h4>
                            <div className=' flex h-[30vh] w-full items-start'>
                                <div className='flex items-start mt-[5vh] ml-[2vw] text-red-500 hover:text-blue-400 transition-all duration-300 active:scale-105' onClick={googleSign}>
                                    <img src="/google.png" className='w-[4.2vw]  border-2 border-amber-300 rounded-l-2xl px-2 py-2 h-[9.5vh] ' alt="" />
                                    <div className='  bg-amber-300 w-fit p-3 rounded-r-2xl'>{state} with Google</div>
                                </div>

                            </div>
                        </div>
                    </div>
                    <div className='flex  items-center  w-full flex-col'>
                        <p className='text-black text-center mb-[-1vh]'>{state == "Login" ? "Don't have an account?" : "Already have an account?"}</p>
                        <p className=' text-red-500 text-xl cursor-pointer hover:text-blue-400 transition-all duration-300 active:scale-x-105' onClick={() => { setState(state == "Login" ? "SignUp" : "Login") }}>{state == "Login" ? "SignUp" : "Login"}</p>
                    </div>

                </div>
            </div>

        </div>
    )
}

export default OwnerLogin
