import React, { useEffect, useState, useMemo, useRef } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import Header from '../components/Header';
import axios from 'axios';
import { MousePointer2, IndianRupee, MessageSquareHeart } from 'lucide-react';
import { gsap } from 'gsap'
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
gsap.registerPlugin(ScrollToPlugin);

const Booking = () => {
  const params = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (!sessionStorage.getItem('username')) {
      navigate('/login', { state: { navig: 'explore' }, replace: true });
    }
  }, [navigate]);

  if(sessionStorage.getItem('status')!='edit'){
    console.log(params.state?.pid);
  }
  
  
  const [park, setPark] = useState();
  const [persons, setPersons] = useState(1);
  const todayStr = useMemo(() => {
    const d = new Date();
    const yyyy = d.getFullYear();
    const mm = String(d.getMonth() + 1).padStart(2, '0');
    const dd = String(d.getDate()).padStart(2, '0');
    return `${yyyy}-${mm}-${dd}`;
  }, []);

  // convert ISO (yyyy-mm-dd) to display (dd-mm-yyyy)
  const isoToDisplay = (iso) => {
    if (!iso) return '';
    const [yyyy, mm, dd] = iso.split('-');
    return `${dd}-${mm}-${yyyy}`;
  };

  // convert display (dd-mm-yyyy) to ISO (yyyy-mm-dd)
  const displayToIso = (disp) => {
    if (!disp) return '';
    const [dd, mm, yyyy] = disp.split('-');
    return `${yyyy}-${mm}-${dd}`;
  };
  useEffect(
    () => {
      console.log('booking page loaded');
      gsap.to(window, {
        scrollTo: { y: 0 },
        duration: 0.2,
        ease: "none"
      });
    }
    , [Infinity])
  // store date in DD-MM-YYYY format as requested
  const [selectedDate, setSelectedDate] = useState(() => isoToDisplay(todayStr));
  const dateInputRef = useRef(null);

  // console.log(params);
  const [tickets, setTickets] = useState([]);

  useEffect(
    () => {
      if (sessionStorage.getItem('status') != 'edit' && params.state.state === 'book') {
        axios.get('https://react.adityakuril.me/bookpark/' + params.state.pid).then((res) => {
          setPark(res.data);
          console.log(res.data);
        })
      }else if(sessionStorage.getItem('status') == 'edit' && !(params?.state?.pid) ){
        axios.get('https://react.adityakuril.me/bookpark/' + sessionStorage.getItem('pid')).then((res) => {
          setPark(res.data);
          console.log(res.data);
        })
      }else{
        axios.get('https://react.adityakuril.me/bookpark/' + params?.state?.pid).then((res) => {
          setPark(res.data);
          sessionStorage.setItem('pid',res.data.pid);
          console.log(res.data);
        })
      }

    }, []
  )
  const changePark = () => {
    navigate('/explore');
  }
  const checkhandler = (target) => {
    console.log(target.value);

    setTickets(
      (prev) => {
        prev.includes(target.value) ? target.parentElement.style.backgroundColor = ''
          : target.parentElement.style.backgroundColor = 'yellow';

        return prev.includes(target.value)
          ? prev.filter((item) => item !== target.value)
          : [...prev, target.value];
      }
    )

  }
  const billref = useRef();


  const calc = () => {
    let bill = 0;
    bill += Number(park.price);
    tickets.forEach((ticket) => {
      if (ticket === 'express pass') {
        bill += 250;
      }
      else if (ticket === 'meal pass') {
        bill += 180;
      }
      else if (ticket === 'locker pass') {
        bill += 100;
      }
    })
    bill *= persons;
    console.log(bill);
    billref.current.value = '';
    billref.current.value = bill;


  }

  const finalbill = async () => {
    calc();
    let addons = '';
    tickets.map((elem, idx) => {
      if (idx != tickets.length - 1) {
        addons += elem + ", ";
      }
      else {
        addons += elem;
      }


    })
    console.log(addons);
    if (sessionStorage.getItem('status') == 'edit') {
      if (confirm('Total bill is : ' + billref.current.value + '. click ok to Edit booking.')) {
        await axios.post('https://react.adityakuril.me/editbook', {
          uid : sessionStorage.getItem('uid'),
          pid: sessionStorage.getItem('pid'),
          username: sessionStorage.getItem('username'),
          date: selectedDate,
          persons: persons,
          addons: addons,
          bill: billref.current.value
        }).then((res) => {
          console.log(res.data);
          if (res.data.message) {
            alert(res.data.message);
            sessionStorage.removeItem('status');
            sessionStorage.removeItem('pid');
            sessionStorage.removeItem('uid');
            navigate('/user');
          } else {
            alert("Booking Failed!!!");
          }
        })

      }
    } else {
      if (confirm('Total bill is : Rs.' + billref.current.value + '. Click OK to proceed to payment.')) {
        navigate('/payment', {
            state: {
                title: `Booking for ${park.pname}`,
                description: `You are booking for ${persons} person(s) on ${selectedDate}. Fastpass/Addons: ${addons || 'None'}.`,
                amount: billref.current.value,
                btnText: "Pay & Confirm Booking",
                apiRoute: "/book",
                accountNumber: park.accountNumber || "Not Available",
                payload: {
                    pid: params.state?.pid || park.pid,
                    username: sessionStorage.getItem('username'),
                    date: selectedDate,
                    persons: persons,
                    addons: addons,
                    bill: billref.current.value
                },
                successPath: "/user" // Redirect to My Bookings directly natively
            }
        });
      }
    }

  }

  return (
    <div className='h-100vh w-100vw'>
      {sessionStorage.getItem('status') != 'edit'?<Header />:<div className='w-full p-3 border-2 flex justify-center items-center rounded-2xl gap-3 bg-blue-100 text-amber-900'>You are in Edit Mode....<button className='border-2 rounded p-1 hover:bg-yellow-400 transition-all duration-300' onClick={()=>{sessionStorage.removeItem('status');sessionStorage.removeItem('pid');sessionStorage.removeItem('uid');navigate('/user')}}>Cancel Editing</button></div>}
      

      <div className='w-full h-full flex flex-col items-center' style={{  color: 'black' }}>
        <div className='bg-amber-100 w-[80vw] rounded-3xl p-5 mb-10'>
          <h1 className='text-[#151623] font-extrabold' style={{ fontFamily: 'rpf', color: '#151623' }}>Book Your Trip</h1>
          <div className='flex flex-row items-start  gap-5'>
            <img src={"https://react.adityakuril.me/uploads/" + (park && (park.parkImage || park.pimage))} className='w-[350px] h-[250px] mt-10 mb-3 border-dashed border-3 rounded-2xl p-1 border-amber-900' alt="" />

            <div className='flex flex-col mt-10 p-1 '>
              <h2 className='text-4xl text-yellow-800'>{park && park.pname}</h2>
              <h2 className='text-2xl text-amber-800 flex items-center gap-1'><IndianRupee color="#973C00" strokeWidth={3} />Price : {park && park.price}</h2>
              <h2 className='text-2xl text-amber-800 flex items-center gap-1'><MousePointer2 color="#973C00" strokeWidth={3} />City : {park && park.pcity}</h2>
              <h2 className='text-2xl text-amber-800 flex items-center gap-1' ><MessageSquareHeart size={24} color="#973C00" strokeWidth={3} />{park && park.description}</h2>
              <button className='bg-amber-500 hover:bg-blue-500 transition-all duration-500 text-white  py-2 px-4 font-medium rounded-2xl mt-5 tracking-wider' onClick={changePark}>Change Park</button>
            </div>
          </div>

          <hr className='border-2 border-amber-600 opacity-100 rounded' />


          <div style={{ fontFamily: 'rpf' }}>
            <h6 className='my-4 text-red-800'>Add-Ons</h6>
            <div className='flex justify-between gap-3'>
              <label htmlFor='express' className='border-3 overflow-y-hidden  border-dashed border-amber-700 p-4 rounded-2xl flex items-center flex-col w-[25vw] h-[245px] bg-blue-200 hover:h-[360px] transition-all duration-500'>
                <input type="checkbox" id="express" value='express pass' className='hidden' onChange={(e) => checkhandler(e.target)
                } />
                <img src={'../src/assets/images/express.png'} className='mb-4 h-30 w-30' alt="" />
                <h4 className='text-xl text-cyan-950' style={{ fontFamily: 'mouldy' }}>Express Pass</h4>
                <h4 className='text-xl  border-dashed border-x-2 border-amber-950 rounded  px-1 font-extrabold text-cyan-700' style={{ fontFamily: 'verdana' }}>₹250</h4>

                <p className='text-red-800 leading-4.5'>Express Pass lets you skip the regular lines at select rides and attractions, so you spend less time waiting and more time enjoying the park.(services by Thrill Trips,not particular park)</p>

              </label>
              <label htmlFor='meal' className='border-3 overflow-y-hidden  border-dashed p-4 border-amber-700 rounded-2xl flex items-center flex-col w-[25vw] h-[225px] bg-blue-200 hover:h-[325px] transition-all duration-500'>
                <input type="checkbox" id="meal" value='meal pass' className='hidden' onChange={(e) => checkhandler(e.target)
                } />
                <img src={'../src/assets/images/meal.png'} className='mb-4 h-30 w-30' alt="" />
                <h4 className='text-xl text-cyan-950' style={{ fontFamily: 'mouldy' }}>Meal Pass </h4>
                <h4 className='text-xl  border-dashed border-x-2 border-amber-950 rounded  px-1 font-extrabold text-cyan-700' style={{ fontFamily: 'verdana' }}>₹180</h4>
                <p className='text-red-800 leading-4.5'>Enjoy hassle-free dining with prepaid meals at participating thrill trips restaurant inside the park.(services by Thrill Trips,not particular park)</p>

              </label>
              <label htmlFor='locker' className='border-3 overflow-y-hidden  border-dashed p-4 border-amber-700 rounded-2xl flex items-center flex-col w-[25vw] h-[245px] bg-blue-200 hover:h-[325px] transition-all duration-500'>
                <input type="checkbox" id="locker" value='locker pass' className='hidden' onChange={(e) => checkhandler(e.target)
                } />
                <img src={'../src/assets/images/locker.png'} className='mb-4 h-30 w-30' alt="" />
                <h4 className='text-xl text-cyan-950' style={{ fontFamily: 'mouldy' }}>Locker Pass </h4>
                <h4 className='text-xl  border-dashed border-x-2 border-amber-950 rounded  px-1 font-extrabold text-cyan-700' style={{ fontFamily: 'verdana' }}>₹100</h4>
                <p className='text-red-800 leading-4.5'>Store your valuables like phones, wallets, or bags safely while you enjoy the park.(services by Thrill Trips,not particular park)</p>

              </label>
            </div>
            <h6 className='my-4 text-red-800'>Persons</h6>
            <input type="number" style={{ fontFamily: 'verdana' }} className='w-full font-semibold text-[#053345] rounded-2xl border-2 bg-[#BEDBFF] py-1 px-3' min={1} value={persons} onChange={(e) => setPersons(e.target.value)} />

            <h6 className='my-4 text-red-800'>Date</h6>

            <div className="relative w-full">
              {/* Visible formatted display (DD-MM-YYYY) */}
              <div
                role="button"
                tabIndex={0}
                onClick={() => {
                  // Try to open native picker on the input element directly (user gesture)
                  if (dateInputRef.current) {
                    try {
                      dateInputRef.current.showPicker && dateInputRef.current.showPicker();
                    } catch (err) {
                      // some browsers may still block showPicker; focus as fallback
                      dateInputRef.current.focus();
                    }
                  }
                }}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    dateInputRef.current && dateInputRef.current.showPicker && dateInputRef.current.showPicker();
                  }
                }}
                className='w-full font-semibold text-[#053345] rounded-2xl border-2 bg-[#BEDBFF] py-1 px-3 cursor-pointer'
              >
                {selectedDate || isoToDisplay(todayStr)}
              </div>


              <input
                ref={dateInputRef}
                type="date"
                style={{ fontFamily: 'verdana' }}
                className='absolute inset-0 w-full h-full opacity-0 pointer-events-none'
                min={todayStr}
                value={displayToIso(selectedDate) || todayStr}
                onChange={(e) => setSelectedDate(isoToDisplay(e.target.value))}
              />
            </div>


            <h6 className='my-4 text-red-800'>Bill</h6>

            <input type="text" ref={billref} className='w-full font-semibold text-[#053345] rounded-2xl border-2 bg-[#BEDBFF] py-1 px-3' disabled={true} style={{ fontFamily: 'verdana' }} />
            <button className='bg-[#BEDBFF] hover:bg-amber-600 text-[#053345] transition-all duration-300 font-bold border-2 py-1 px-4 rounded-2xl mt-1 tracking-wide' onClick={calc} style={{ fontFamily: 'mouldy' }}>Calculate Bill</button>

            <br />
            <button className='bg-amber-500 hover:bg-green-500 transition-all duration-500 text-white  py-2 px-4 font-medium rounded-2xl mt-5 tracking-wider' onClick={finalbill}>Confirm Booking</button>
          </div>





        </div>
      </div>
    </div>
  )
}

export default Booking

