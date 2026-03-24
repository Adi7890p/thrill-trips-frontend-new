import React, { useEffect, useRef, useState } from 'react'
import Header from '../components/Header'
import { LogOut, PanelLeftClose, PanelLeftOpen } from 'lucide-react'
import gsap from 'gsap';
import Dashboard from '../components/Dashboard';
import Bookings from '../components/Bookings';
import Trips from '../components/Trips';
import Changepwd from '../components/Changepwd';
import Editpro from '../components/Editpro';
import { useNavigate } from 'react-router-dom';

const User = () => {
  const [sidepnl, setSidepnl] = useState(true);
  const [sel, setSel] = useState('Dashboard')
  const left = useRef();
  const right = useRef();
  const navigate = useNavigate();

  useEffect(() => {
    if (!sessionStorage.getItem('username')) {
      navigate('/login', { replace: true });
    }
  }, [navigate]);


  // useEffect(
  //   () =>{
  //     console.log(sel);
  //     if(sel=='dashboard'){
  //       d.current.click();
  //     }
  // else if(sel=='bookings'){
  //   b.current.style.backgroundColor="#1C398E";
  //   b.current.style.borderColor="#1C398E";
  //   b.current.style.color="#BEDBFF";
  // }
  // else if(sel=='trips'){
  //   t.current.style.backgroundColor="#1C398E";
  //   t.current.style.borderColor="#1C398E";
  //   t.current.style.color="#BEDBFF";
  // }
  // else if(sel=='cngpwd'){
  //   c.current.style.backgroundColor="#1C398E";
  //   c.current.style.borderColor="#1C398E";
  //   c.current.style.color="#BEDBFF";
  // }
  // else if(sel=='edit'){
  //   e.current.style.backgroundColor="#1C398E";
  //   e.current.style.borderColor="#1C398E";
  //   e.current.style.color="#BEDBFF";
  // }
  // else if(sel=='bookings'){
  //   b.current.click();
  // } 
  //   },[sel]
  // )


  useEffect(() => {
    if (sidepnl) {
      gsap.to(left.current, { width: '0vw', duration: 0.5, ease: 'power2.out' });
      Array.from(left.current.children).forEach(child => {
        child.style.display = 'none';
      });
      gsap.to(right.current, { width: '100vw', duration: 0.5, ease: 'power2.out' });
    }
    else {
      gsap.to(left.current, { width: '30vw', duration: 0.5, ease: 'power2.out' });
      Array.from(left.current.children).forEach(child => {
        child.style.display = 'block';
      });
      gsap.to(right.current, { width: 'full', duration: 0.5, ease: 'power2.out' });

    }
  }, [sidepnl]);


  const logout = () => {
    if (confirm("Are you sure to logout? click OK to logout...")) {
      sessionStorage.clear();
      navigate('/login');
    }

  }



  return (
    <div>
      <Header />
      <div className='flex w-full h-[82vh] p-2 gap-2 '>
        <div ref={left} className="leftpanel h-full w-[30vw] bg-blue-200 rounded-2xl p-2 flex flex-col justify-center items-center gap-3">

          <label htmlFor='dashboard'

            className={(sel == 'Dashboard' ? 'bg-blue-900 text-blue-200 p-2 border-2 rounded font-extrabold w-full text-center  text-2xl border-blue-900'
              :
              'text-blue-900  p-2 border-2 rounded font-extrabold w-full text-center hover:bg-blue-900 hover:border-2 hover:border-blue-900 hover:text-blue-200 transition-all duration-400 text-2xl')}

            style={{ fontFamily: 'titlef' }}>Dashboard<input type="radio" name="panel" className='hidden' id="dashboard" value="Dashboard" onChange={(e) => setSel(e.target.value)} /></label>

          <label htmlFor='mybookings' className={(sel == 'My Bookings' ? 'bg-blue-900 text-blue-200 p-2 border-2 rounded font-extrabold w-full text-center  text-2xl border-blue-900'
            :
            'text-blue-900  p-2 border-2 rounded font-extrabold w-full text-center hover:bg-blue-900 hover:border-2 hover:border-blue-900 hover:text-blue-200 transition-all duration-400 text-2xl')} style={{ fontFamily: 'titlef' }}>My Bookings<input type="radio" name="panel" className='hidden' id="mybookings" value='My Bookings' onChange={(e) => setSel(e.target.value)} /></label>

          <label htmlFor='trips' className={(sel == 'Trips' ? 'bg-blue-900 text-blue-200 p-2 border-2 rounded font-extrabold w-full text-center  text-2xl border-blue-900'
            :
            'text-blue-900  p-2 border-2 rounded font-extrabold w-full text-center hover:bg-blue-900 hover:border-2 hover:border-blue-900 hover:text-blue-200 transition-all duration-400 text-2xl')} style={{ fontFamily: 'titlef' }}>Trips<input type="radio" name="panel" className='hidden' id="trips" value='Trips' onChange={(e) => setSel(e.target.value)} /></label>

          <label htmlFor='changepwd' className={(sel == 'Change Password' ? 'bg-blue-900 text-blue-200 p-2 border-2 rounded font-extrabold w-full text-center  text-2xl border-blue-900'
            :
            'text-blue-900  p-2 border-2 rounded font-extrabold w-full text-center hover:bg-blue-900 hover:border-2 hover:border-blue-900 hover:text-blue-200 transition-all duration-400 text-2xl')} style={{ fontFamily: 'titlef' }}>Change Password<input type="radio" name="panel" className='hidden' id="changepwd" value='Change Password' onChange={(e) => setSel(e.target.value)} /></label>

          <label htmlFor='edit' className={(sel == 'Edit Profile' ? 'bg-blue-900 text-blue-200 p-2 border-2 rounded font-extrabold w-full text-center  text-2xl border-blue-900'
            :
            'text-blue-900  p-2 border-2 rounded font-extrabold w-full text-center hover:bg-blue-900 hover:border-2 hover:border-blue-900 hover:text-blue-200 transition-all duration-400 text-2xl')} style={{ fontFamily: 'titlef' }}>Edit Profile<input type="radio" name="panel" className='hidden' id="edit" value='Edit Profile' onChange={(e) => setSel(e.target.value)} /></label>

          <div onClick={logout} className='text-blue-900 w-11 overflow-hidden h-11   font-extrabold hover:w-40 transition-all cursor-pointer duration-500  text-2xl' style={{ fontFamily: 'titlef' }}
          ><div className='flex flex-wrap items-center gap-2' style={{ fontFamily: 'titlef' }}><LogOut color="#1C398E" className=' px-1.5 border-2 rounded-full' strokeWidth={3.5} size={40} />Log Out</div></div>


        </div>
        <div ref={right} className="rightpanel h-full w-full bg-amber-100 rounded-2xl py-3 px-3 text-amber-800">
          <div className='w-fit h-fit'>
            <div className='absolute bg-transparent w-[22px] h-[22px]  ' onClick={() => setSidepnl(!sidepnl)} ></div>{sidepnl ?
              <PanelLeftOpen strokeWidth={3} />
              :
              <PanelLeftClose strokeWidth={3} />
            }
          </div>
          <div className='text-center border-b-3 font-medium border-amber-700 border-dotted tracking-wide text-4xl text-yellow-800 -mt-7' style={{ fontFamily: 'mouldy' }}>{sel}</div>
          <div className='w-full h-[68.2vh] pt-2 '>

            {sel == 'Dashboard' ? <Dashboard />
              :
              sel == 'My Bookings' ? <Bookings />
                :
                sel == "Trips" ? <Trips />
                  :
                  sel == "Change Password" ? <Changepwd />
                    :
                    sel == "Edit Profile" ? <Editpro />
                      : ""
            }
          </div>
        </div>
      </div>
    </div>
  )
}

export default User
