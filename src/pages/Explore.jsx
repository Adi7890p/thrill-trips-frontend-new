import React, { use, useEffect, useRef, useState } from 'react'
import Header from './../components/Header';
import { Search, SquareX } from 'lucide-react'
import { gsap } from 'gsap'
import axios from 'axios';
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { useNavigate } from 'react-router-dom';

gsap.registerPlugin(ScrollToPlugin);

const Explore = () => {
  const touchStartRef = React.useRef(null);
  const cardref = useRef([]);
  const modelref = useRef(null);
  const detailref = useRef(null);
  const [search, setSearch] = useState('');
  const [sortval, setSortval] = useState('none');

  const navigate = useNavigate();

  const [modelvis, setModelvis] = useState('none');
  const [cardidx, setCardidx] = useState();


  useEffect(
    () => {
      console.log(sortval);
      axios.get('https://react.adityakuril.me/sort/' + sortval).then((res) => {
        setPark(res.data);
        console.log(res.data);
      })
    }, [sortval]
  )
  useEffect(
    () => {
      console.log('explore page loaded');
      gsap.to(window, {
        scrollTo: { y: 0 },
        duration: 0.2,
        ease: "none"
      });
    }
    , [Infinity])

  const [park, setPark] = useState();
  useEffect(() => {
    axios.get('https://react.adityakuril.me/parks').then((res) => {
      setPark(res.data);
      console.log(res.data);
    })
  }, []);

  useEffect(() => {
    if (search.length > 0) {
      axios.get('https://react.adityakuril.me/search/' + search).then((res) => {
        if (res.data.length > 0) {
          setPark(res.data);
          console.log(res.data);
        }

      })
    }
    else {
      axios.get('https://react.adityakuril.me/parks').then((res) => {
        setPark(res.data);
        console.log(res.data);
      })
    }


  }, [search])

  useEffect(() => {
    if (detailref.current) {
      detailref.current.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [cardidx]);


  const effects = async (idx) => {
    setCardidx(idx);
    console.log('effect called', idx);
    await gsap.to(cardref.current[idx], { scale: 0.1, duration: 0.2, ease: 'none' });


  }
  const reeffects = async (idx) => {
    console.log('reeffect called', idx);

    await gsap.to(cardref.current[idx], { scale: 0.99, duration: 0.1 });

  }


  let finalflag = true;

  const closure = async () => {

    // if (finalflag) {
    reeffects(cardidx);
    await gsap.to(modelref.current, { scale: 0, duration: 0.1 })
    setModelvis('none');
    // }
    finalflag = true;

  }

  const cardClicked = async () => {
    // console.log('card clicked');
    // detailref.current.scrollTo({ top: 0, behavior: "smooth" });
    setModelvis('flex');
    await gsap.to(modelref.current, { scale: 1, duration: 0.5, ease: 'power2.out' })
  }
  const bookClicked = (pid) => {
    if (sessionStorage.getItem('username')) {
      navigate('/booking/', { state: { pid: pid, state: 'book' } });
    }
    else {
      if (confirm("You have to login first!!!, click ok to login...")) {
        navigate('/login', { state: { navig: 'explore' } });
      }
    }

  }
  return (
    <div className='h-full w-full'>
      {sessionStorage.getItem('status') != 'edit' ? <Header /> : <div className='w-full p-3 border-2 flex justify-center items-center rounded-2xl gap-3 bg-blue-100 text-amber-900'>You are in Edit Mode....<button className='border-2 rounded p-1 hover:bg-yellow-400 transition-all duration-300' onClick={() => { sessionStorage.removeItem('status'); sessionStorage.removeItem('pid'); sessionStorage.removeItem('uid'); navigate('/user') }}>Cancel Editing</button></div>}
      <div className="subheader">
        <div className='w-full h-15 flex items-center justify-evenly '>
          <input type="text" className='h-10 text-neutral-50 bg-linear-to-r from-indigo-500 to-teal-400 w-1/2 rounded-full px-4 border-2 outline-0' style={{ fontSize: '20px' }} placeholder='Search' value={search} onChange={(e) => {
            setSearch(e.target.value);
          }} />

          <select placeholder='Sort By' value={sortval} onChange={(e) => setSortval(e.target.value)} className='h-10 text-neutral-50 bg-linear-to-r from-indigo-500 via-purple-500 to-pink-500 w-1/3  rounded-full px-4 border-2 outline-0' style={{ fontSize: '20px', appearance: 'none' }}  >
            <option value="none" style={{ fontSize: '20px', background: 'purple' }} >Sort By</option>
            <option value="lth" style={{ fontSize: '20px', background: 'purple' }} >Price : Low to High</option>
            <option value="htl" style={{ fontSize: '20px', background: 'purple' }} >Price : High to Low</option>
          </select>

        </div>
      </div>
      <div className=" h-auto w-full flex flex-wrap justify-around mt-1 py-3 px-2 ">

        {park && park.map((elem, idx) => {
          return (
            <div key={idx} className=' bg-[#77B7FA] rounded-2xl hover:shadow-amber-500 hover:shadow-2xl h-[60vh] w-[30%] mb-5 border-2 overflow-hidden hover:bg-yellow-400 hover:border-yellow-400 transition-all duration-300 '
              ref={(e) => { cardref.current[idx] = e; }} onClick={() => { effects(idx); cardClicked(); }} >
              <div className='overflow-hidden h-[75%] '>
                <img src={"https://react.adityakuril.me/uploads/" + (elem.parkImage || elem.pimage)} className=' h-full hover:scale-105 transition-all duration-300 w-full object-cover' alt="" />
              </div>

              <p className='text-2xl bg-[linear-gradient(135deg,#0d6efd,#6610f2,#d63384)] bg-clip-text text-transparent font-serif text-center mt-4' style={{ fontFamily: 'titlef', letterSpacing: 1.5 }} >{elem.pname}</p>
            </div>
          )
        })}


      </div>


      <div style={{ display: modelvis, scale: 0 }} className="model fixed flex items-center justify-center top-10 backdrop-blur-sm left-0 h-full w-full  z-89 "
        ref={modelref}
        onClick={() => { console.log('clicked'); closure(); }}>
        <div className="box px-3  h-[80vh] w-[70%] bg-[#77B7FA] rounded-2xl " onClick={(e) => { console.log('clicked bbox'); e.stopPropagation(); finalflag = false }}>

          <div className='px-2 py-3 flex justify-between items-center' onClick={(e) => { e.stopPropagation() }}>
            <h1 className='text-[#151623]  ' style={{ fontFamily: 'bt', color: '#151623' }}>
              {cardidx != undefined && park[cardidx] && park[cardidx].pname}</h1>
            <SquareX color='#151623' className='hover:border-amber-400 hover:border-2 rounded' onClick={() => { finalflag = true; closure() }} />
          </div>

          <div
            className='details flex flex-col items-center border-0 border-collapse  scrollbarhider bg-[#151623] h-[78%] w-full   rounded-3xl overflow-y-auto p-3 '
            ref={detailref}
            tabIndex={0}

            onWheel={(e) => {
              // Prevent the wheel from bubbling to the page (which causes background scroll)
              // e.preventDefault();
              e.stopPropagation();
              // const el = e.currentTarget;
              // el.scrollTop += e.deltaY;
            }}
            // onPointerDown={(e) => {
            //   // ensure the container receives focus so keyboard scrolling works
            //   e.currentTarget.focus();
            // }}
            // onTouchStart={(e) => {
            //   // store initial touch position
            //   touchStartRef.current = e.touches && e.touches[0] ? e.touches[0].clientY : null;
            // }}
            // onTouchMove={(e) => {
            //   // handle touch scrolling manually and stop propagation to page
            //   if (!touchStartRef.current) return;
            //   const currentY = e.touches && e.touches[0] ? e.touches[0].clientY : 0;
            //   const delta = touchStartRef.current - currentY;
            //   e.preventDefault();
            //   e.stopPropagation();
            //   const el = e.currentTarget;
            //   el.scrollTop += delta;
            //   touchStartRef.current = currentY;
            // }}
            style={{
              WebkitOverflowScrolling: 'touch',
              touchAction: 'auto',
              overscrollBehavior: 'contain',
              pointerEvents: 'auto'
            }}>
            <div style={{ fontFamily: 'mouldy', fontWeight: 100, letterSpacing: 1.5 }} className='bg-indigo-500 hover:bg-indigo-400 w-[90%] rounded px-2 mb-3' >
              City : {cardidx != undefined && park[cardidx] && park[cardidx].pcity}</div>
            <div style={{ fontFamily: 'mouldy', fontWeight: 100, letterSpacing: 1.5 }} className='bg-indigo-500 hover:bg-indigo-400 w-[90%] rounded px-2 mb-3' >
              Category : {cardidx != undefined && park[cardidx] && park[cardidx].category}</div>
            <div style={{ fontFamily: 'mouldy', fontWeight: 100, letterSpacing: 1.5 }} className='bg-indigo-500 hover:bg-indigo-400 w-[90%] rounded px-2 mb-3' >
              {cardidx != undefined && park[cardidx] && park[cardidx].description}
            </div>

            <img src={"https://react.adityakuril.me/uploads/" + (cardidx != undefined && park[cardidx] && (park[cardidx].parkImage || park[cardidx].pimage))} className=' rounded-2xl h-[350px] w-[85%] border-2' alt="" />

            <h1 style={{ fontFamily: 'mouldy', fontSize: 90, margin: 15, fontWeight: 100, letterSpacing: 1.5 }}>Our Rides!!!</h1>

            {cardidx != undefined && park[cardidx]?.rideImages?.length > 0 && (
                 park[cardidx].rideImages.map((imgPath, i) => (
                      <img key={i} src={"https://react.adityakuril.me/uploads/" + imgPath} className='mb-3 rounded-2xl h-[350px] w-[85%] border-2 object-cover' alt="Ride" />
                 ))
            )}

            <div className='flex flex-col item start w-[90%] border-t-2 py-4 px-3 mt-5'>
              <h2 style={{ fontFamily: 'mouldy' }}>
                Price :  {cardidx != undefined && park[cardidx] && park[cardidx].price}</h2>
              <div className='rounded-2xl bg-emerald-600 hover:bg-amber-500 hover:scale-105 duration-300 text-2xl text-center w-[30%] p-2 mt-2'
                onClick={() => bookClicked(park[cardidx].pid)}
              >Book Now</div>
            </div>
          </div>

        </div>
      </div>



    </div>
  )
}

export default Explore

