import { useEffect, useRef, useState } from 'react';
import Header from '../components/Header';
import './home.css';
import gsap from 'gsap';
import { ScrollTrigger } from "gsap/ScrollTrigger";

import ride1 from '../assets/images/ride1.png';
import ride2 from '../assets/images/ride2.png';
import ride3 from '../assets/images/ride3.png';
import ride4 from '../assets/images/ride4.png';
import ride5 from '../assets/images/ride5.png';
import ride6 from '../assets/images/ride6.png';
import ride7 from '../assets/images/ride7.png';
import ride8 from '../assets/images/ride8.png';
import ride9 from '../assets/images/ride9.png';
import goa from '../assets/images/goa.png';


import Homepart from '../components/Homepart';
import Transition from '../components/Transition';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import Cylinderhero from '../components/Cylinderhero';
import { useGSAP } from '@gsap/react';
import { useLocation } from 'react-router-dom';
import CustomCursor from '../components/CustomCursor';



// Register plugin
gsap.registerPlugin(ScrollTrigger);


const Home = () => {

  const page1 = useRef(null);
  const pg5 = useRef(null);
  const svgRef = useRef(null);
  const lefts = useRef(null);
  const rights = useRef(null);
  let flag = false
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

  useEffect(() => {

    gsap.from(".lefts span", {
      x: '-100%',
      opacity: 0,
      duration: 1,
      ease: 'power2.out',
      stagger: 0.75,
      scrollTrigger: {
        trigger: lefts.current,
        start: 'top 50%',
        end: '100% 75%',
        // markers: true,
        scrub: true,
      }
    })
    gsap.from(".rights span", {
      x: '100%',
      opacity: 0,
      duration: 1,
      ease: 'power2.out',
      stagger: 0.75,
      scrollTrigger: {
        trigger: rights.current,
        start: 'top 50%',
        end: '100% 75%',
        // markers: true,
        scrub: true,
      }
    })

    gsap.to(".parallax .box", {
      transform: 'translateX(-308vw)',
      scrollTrigger: {
        trigger: ".parallax",
        scroller: "body",
        start: 'top 0%',
        end: 'top -500%',
        // markers: true,
        scrub: true,
        pin: true
      }
    })

    gsap.to(".svgfooter", {
      transform: 'translateX(-50%)',
      duration: 4,
      repeat: -1,
      ease: "none",

    })

    gsap.to(pg5.current, {
      backgroundColor: "#00d3f2",
      scrollTrigger: {
        trigger: "#page5",
        start: "20% 50%",
        end: "bottom bottom",
        scrub: true
      }
    })

    gsap.from(".footer", {
      y: "50vh",
      // opacity: 0,
      scrollTrigger: {
        trigger: ".page1",
        start: "90% 50%",
        end: "bottom bottom",
        scrub: true,
        // markers: true
      }
    })

    // gsap.to(".parallax",{
    //   backgroundColor: "white",
    //   scrollTrigger:{
    //     trigger: ".parallax",
    //     start: "50% 30%",
    //     end: "bottom bottom",
    //     scrub: true,
    //     markers:true
    //   }
    // })



    const svg = svgRef.current;
    const path = svg?.querySelector('path');



    if (path) {
      const pathLength = path.getTotalLength();
      path.style.strokeDasharray = `${pathLength}`;
      path.style.strokeDashoffset = `${pathLength + (window.innerWidth / 10)}`;
      // console.log(pathLength);
      const zoom = window.outerWidth / window.innerWidth;
      console.log(zoom);


      gsap.to(path, {
        strokeDashoffset: 0,
        ease: 'none',
        scrollTrigger: {
          trigger: '#page5',
          start: 'top 50%',
          end: 'bottom bottom',
          scrub: true,
        },
      });


    }

  }, []);

  useGSAP(() => {

    gsap.to(page1.current, {
      backgroundColor: "#151623",
      ease: "none",
      scrollTrigger: {
        trigger: ".scene-container",
        start: "50% 40%",
        end: "65% 40%",
        scrub: true,
        // markers: true
      },
    }, { scope: page1 })


  })


  const mainp = "M 10 0.4 Q 10 50 10 99.4";

  const mouseenter = (dets) => {
    // console.log(dets.nativeEvent.offsetX, dets.nativeEvent.offsetY, dets.target.children);
    let x = (25 / 90) * dets.nativeEvent.offsetX;
    // console.log(x);
    let y = (100 / 414) * dets.nativeEvent.offsetY;
    // console.log(y);



    const initPath = `M 10 0.4 Q ${x} ${y} 10 99.4`;
    gsap.to(dets.target.children, {
      attr: { d: initPath },
      duration: 0.1,
      ease: "power3.out"
    })
  }
  const mouseleave = (dets) => {
    // console.log(dets.clientX,dets.clientY);
    const initPath = mainp;
    gsap.to(dets.target.children, {
      attr: { d: initPath },
      duration: 1.5,
      ease: "elastic.out(1, 0.2)"
    })

  }
  const location = useLocation();
  const [out, setOut] = useState(false);
  const [mpath, setMpath] = useState("");
  const routeHandler = (path, e = null) => {
    if (e) { e.preventDefault(); }
    if (location.pathname != path) {
      setMpath(path);
      setOut(true);

    }
  }
  return (
    <div>
      <CustomCursor />
      <Header />
      <div ref={page1} className="scene-container h-[200vh] w-screen  relative" >
        <div className="fixed top-0 left-0 w-full h-full ">
          <Canvas className='w-full h-full' flat camera={{ fov: 35 }}>
            {/* <OrbitControls /> */}
            <ambientLight />
            <Cylinderhero />
          </Canvas>
        </div>
        <div ref={lefts} className="lefts absolute left-5 top-3/5 flex flex-col text-red-400 -[ut] gap-20 p-2">
          <span className='font-[rpf] bg-[linear-gradient(135deg,#0d6efd,#6610f2,#d63384)] bg-clip-text text-transparent text-5xl'>World's Most</span>
          <span className='font-[rpf] bg-[linear-gradient(135deg,#0d6efd,#d63384,#6610f2)] bg-clip-text text-transparent text-5xl'>Exciting Parks</span>
          <span className='font-[rpf] bg-[linear-gradient(135deg,#0d6efd,#6610f2,#d63384)] bg-clip-text text-transparent text-5xl'>In One Place.</span>

        </div>
        <div ref={rights} className="rights  absolute right-4 top-3/5 flex flex-col items-end text-amber-600 font-[ut] gap-20 p-2">
          <span className='font-[rpf] bg-[linear-gradient(135deg,#6610f2,#d63384,#0d6efd)] bg-clip-text text-transparent text-5xl' >Ready Up With</span>
          <span className='font-[rpf] bg-[linear-gradient(135deg,#6610f2,#d63384,#0d6efd)] bg-clip-text text-transparent text-5xl' >Your Adrenaline</span>
          <span className='font-[rpf] bg-[linear-gradient(135deg,#6610f2,#d63384,#0d6efd)] bg-clip-text text-transparent text-5xl' >For Adventure.</span>
        </div>

        <div className="svgfooter absolute h-[5vh] top-[195.5vh] right-0 flex">
          <img src="/svgfooter1.png" className='h-full w-1/2 ' alt="" />
          <img src="/svgfooter1.png" className='h-full w-1/2 ' alt="" />
          <img src="/svgfooter1.png" className='h-full w-1/2 ' alt="" />
          <img src="/svgfooter1.png" className='h-full w-1/2 ' alt="" />
          <img src="/svgfooter1.png" className='h-full w-1/2 ' alt="" />
        </div>
      </div>

      <div className="parallax h-screen w-screen flex items-center bg-[linear-gradient(180deg,#51a1fe,#6019e6)] ">

        <div className="box  w-[400vw] mx-[4vw] h-[80vh] shrink-0 gap-[1vw] items-center flex pt-[10vh]">

          <div className="w-[20%] h-[70vh] flex justify-center items-center">
            <div className='imgFrame h-[70vh] w-[90%] rounded-2xl p-2 bg-amber-400 '>
              <div className='h-[60vh] flex flex-col overflow-hidden rounded-t-2xl'>
                <img src="/imagica1.png" className='h-[60vh] w-full rounded-t-2xl  hover:scale-105 transition-all duration-300 ' alt="" />
              </div>
              <h1 className='text-center text-blue-900  font-[modak] mt-[1vh] font-light'>Imagica</h1>
            </div>
          </div>

          <svg onMouseMove={(e) => { mouseenter(e) }} onMouseLeave={(e) => { mouseleave(e) }} width="7vw" height="75vh" viewBox="0 0 20 100" preserveAspectRatio="none">
            <path className='path' d="M 10 0.4 Q 10 50 10 99.4" stroke="white" strokeWidth="0.8" strokeLinecap="round" fill="transparent" />
          </svg>
          <div className="w-[20%] h-[70vh] flex justify-center items-center">
            <div className='imgFrame h-[70vh] w-[90%] rounded-2xl p-2 bg-amber-400 '>
              <div className='h-[60vh] flex flex-col overflow-hidden rounded-t-2xl'>
                <img src={goa} className='h-[60vh] w-full rounded-t-2xl  hover:scale-105 transition-all duration-300 ' alt="" />
              </div>
              <h1 className='text-center text-blue-900 font-[modak] mt-[1vh] font-light'>Goa</h1>
            </div>
          </div>

          <svg onMouseMove={(e) => { mouseenter(e) }} onMouseLeave={(e) => { mouseleave(e) }} width="7vw" height="75vh" viewBox="0 0 20 100" preserveAspectRatio="none">
            <path className='path' d="M 10 0.4 Q 10 50 10 99.4" stroke="white" strokeWidth="0.8" strokeLinecap="round" fill="transparent" />
          </svg>
          <div className="w-[20%] h-[70vh] flex justify-center items-center">
            <div className='imgFrame h-[70vh] w-[90%] rounded-2xl p-2 bg-amber-400 '>
              <div className='h-[60vh] flex flex-col overflow-hidden rounded-t-2xl'>
                <img src="/disneyland1.png" className='h-[60vh] w-full rounded-t-2xl  hover:scale-105 transition-all duration-300 ' alt="" />
              </div>
              <h1 className='text-center text-blue-900 font-[modak] mt-[1vh] font-light'>Disneyland</h1>
            </div>
          </div>

          <svg onMouseMove={(e) => { mouseenter(e) }} onMouseLeave={(e) => { mouseleave(e) }} width="7vw" height="75vh" viewBox="0 0 20 100" preserveAspectRatio="none">
            <path className='path' d="M 10 0.4 Q 10 50 10 99.4" stroke="white" strokeWidth="0.8" strokeLinecap="round" fill="transparent" />
          </svg>
          <div className="w-[20%] h-[70vh] flex justify-center items-center">
            <div className='imgFrame h-[70vh] w-[90%] rounded-2xl p-2 bg-amber-400 '>
              <div className='h-[60vh] flex flex-col overflow-hidden rounded-t-2xl'>
                <img src="/essel.png" className='h-[60vh] w-full rounded-t-2xl  hover:scale-105 transition-all duration-300 ' alt="" />
              </div>
              <h1 className='text-center text-blue-900 font-[modak] mt-[1vh] font-light'>Essel</h1>
            </div>
          </div>

          <svg onMouseMove={(e) => { mouseenter(e) }} onMouseLeave={(e) => { mouseleave(e) }} width="7vw" height="75vh" viewBox="0 0 20 100" preserveAspectRatio="none">
            <path className='path' d="M 10 0.4 Q 10 50 10 99.4" stroke="white" strokeWidth="0.8" strokeLinecap="round" fill="transparent" />
          </svg>
          <div className="w-[20%] h-[70vh] flex justify-center items-center">
            <div className='imgFrame h-[70vh] w-[90%] rounded-2xl p-2 bg-amber-400 '>
              <div className='h-[60vh] flex flex-col overflow-hidden rounded-t-2xl'>
                <img src="/dubai.png" className='h-[60vh] w-full rounded-t-2xl  hover:scale-105 transition-all duration-300 ' alt="" />
              </div>
              <h1 className='text-center text-blue-900 font-[modak] mt-[1vh] font-light'>Dubai</h1>
            </div>
          </div>


        </div>

        <h1 className='text-[40vw] uppercase m-0 whitespace-nowrap  '></h1>

      </div>



      {/* <div className="page" id="page2">
        <div id="sub" ref={subref}>
          <h4>Discover and Book unforgettable trips to the worlds best Amusement and Adventure parks — all in one
            place...</h4>
        </div>
      </div>
      <div>
        <div>
          <div className="page" id="page3">
            <div id="sub" ref={subref1}>
              <h4 style={{ "fontFamily": "'rpf'" }}>Go Global With Your Fun — Discover Parks That Spark Joy Everywhere...</h4>
            </div>
          </div>
          <div className="page" id="page4">
            <div id="sub" ref={subref2}>
              <h4 style={{ "fontFamily": "'rpf'" }}>Unlock the best prices on tickets, packages, and food only through trusted, official partners...</h4>
            </div>
          </div>
        </div>
      </div> */}



      <div className="page1 relative" ref={pg5} id="page5">
        <div id="head" className=''><h3>Our Best Rides...</h3></div>
        <div className="rides">
          <div className="ride 1" >
            <img src={ride1} alt="ride1" className="ride-image" loading="lazy" />
            <div className="ride-text">
              <h6>Roller Coaster</h6>
              <p>Experience the thrill.</p>
            </div>
          </div>
          <div className="ride 2" >
            <img src={ride2} alt="ride1" className="ride-image" loading="lazy" />
            <div className="ride-text">
              <h6> Car rides</h6>
              <p>Scream loud , live free .</p>
            </div>
          </div>
          <div className="ride 3" >
            <img src={ride3} alt="ride1" className="ride-image" loading="lazy" />
            <div className="ride-text">
              <h6> Bike Rides</h6>
              <p>Fear + Fun = Perfect ride .</p>
            </div>
          </div>
          <div className="ride 4" >
            <img src={ride4} alt="ride1" className="ride-image" loading="lazy" />
            <div className="ride-text">
              <h6> Giants Wheel</h6>
              <p>Hold tight , enjoy the fall.</p>
            </div>
          </div>
          <div className="ride 5" >
            <img src={ride5} alt="ride1" className="ride-image" loading="lazy" />
            <div className="ride-text">
              <h6> Water Rides</h6>
              <p> Enjoy the view , not the rush.</p>
            </div>
          </div>
          <div className="ride 6" >
            <img src={ride6} alt="ride2" className="ride-image" loading="lazy" />
            <div className="ride-text">
              <h6>Ferris Wheel</h6>
              <p> Cool rides , hot memories.</p>
            </div>
          </div>
          <div className="ride 7" >
            <img src={ride7} alt="ride3" className="ride-image" loading="lazy" />
            <div className="ride-text">
              <h6>Log Flume</h6>
              <p>Get wet and wild.</p>
            </div>
          </div>
          <div className="ride 8">
            <img src={ride8} alt="ride4" className="ride-image" loading="lazy" />
            <div className="ride-text">
              <h6>Carousel</h6>
              <p>Classic fun for all ages.</p>
            </div>
          </div>
          <div className="ride 9" >
            <img src={ride9} alt="ride5" className="ride-image" loading="lazy" />
            <div className="ride-text">
              <h6>Drop Tower</h6>
              <p>Feel the adrenaline rush.</p>
            </div>
          </div>
          <div className="ride 10" >
            <img src={ride1} alt="ride6" className="ride-image" loading="lazy" />
            <div className="ride-text">
              <h6>Bumper Cars</h6>
              <p>Fun collisions for everyone.</p>
            </div>
          </div>
        </div>
        <div className=" h-full w-[101vw] absolute -left-[1vw] top-0">
          {/* <div className="rides pt-[-10vh]">
            <div className="ride 1" ref={ride1Ref}>
              <img src={ride1} alt="ride1" className="ride-image" loading="lazy" />
              <div className="ride-text">
                <h6>Roller Coaster</h6>
                <p>Experience the thrill.</p>
              </div>
            </div>
            <div className="ride 2" ref={ride2Ref}>
              <img src={ride2} alt="ride2" className="ride-image" loading="lazy" />
              <div className="ride-text">
                <h6>Ferris Wheel</h6>
                <p>Enjoy the view.</p>
              </div>
            </div>
            <div className="ride 3" ref={ride3Ref}>
              <img src={ride3} alt="ride3" className="ride-image" loading="lazy" />
              <div className="ride-text">
                <h6>Log Flume</h6>
                <p>Get wet and wild.</p>
              </div>
            </div>
            <div className="ride 4" ref={ride4Ref}>
              <img src={ride4} alt="ride4" className="ride-image" loading="lazy" />
              <div className="ride-text">
                <h6>Carousel</h6>
                <p>Classic fun for all ages.</p>
              </div>
            </div>
            <div className="ride 5" ref={ride5Ref}>
              <img src={ride5} alt="ride5" className="ride-image" loading="lazy" />
              <div className="ride-text">
                <h6>Drop Tower</h6>
                <p>Feel the adrenaline rush.</p>
              </div>
            </div>
            <div className="ride 6" ref={ride6Ref}>
              <img src={ride6} alt="ride6" className="ride-image" loading="lazy" />
              <div className="ride-text">
                <h6>Bumper Cars</h6>
                <p>Fun collisions for everyone.</p>
              </div>
            </div>
          </div> */}
          <svg ref={svgRef} viewBox="0 0 2000 4590" id="strip" className="" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M2.62938 24.8599C2.62939 24.8599 611.129 88.8599 454.629 592.86C298.129 1096.86 523.629 1268.36 670.129 1395.86C816.629 1523.36 1159.21 1746.08 1370.13 1750.86C1633.23 1756.82 1851.63 1708.86 1792.63 1326.86C1733.63 944.86 1323.44 967.86 1074.13 1163.36C824.823 1358.86 540.629 1715.36 746.129 2139.86C951.629 2564.36 1477.63 2373.36 1451.63 2643.36C1425.63 2913.36 797.629 2798.86 636.129 3013.36C474.629 3227.86 492.129 3457.36 670.129 3613.86C848.129 3770.36 1717.13 3962.86 1901.63 3881.36C2086.13 3799.86 2238.63 3652.86 2071.13 3323.86C1903.63 2994.86 1556.13 3153.86 1351.13 3464.36C1146.13 3774.86 1004.63 4007.86 1167.63 4252.86C1330.63 4497.86 2220.63 4527.36 2220.63 4527.36H2656.63"
              stroke="#952C2C" strokeWidth="50" strokeLinecap='round' />
          </svg>
        </div>
        <div className='footer see_Home.cssFile_for_design p-[3vw] text-white bg-amber-900  w-screen'>
          <div className='w-full h-3/4 flex justify-evenly overflow-hidden'>
            <div>
              <h1 className='text-white text-2xl font-extrabold tracking-wide' >Thrill Trips</h1>
              <h2 className='text-gray-300 text-sm font-thin hover:text-blue-400 transition-all duration-300 cursor-pointer' onClick={() => routeHandler("/about")}>About Us</h2>

            </div>
            <div>
              <h1 className='text-gray-400  text-sm font-extrabold tracking-wide'>Visitors</h1>
              <h2 className='text-gray-300 text-sm font-thin hover:text-blue-400 transition-all duration-300 cursor-pointer' onClick={() => routeHandler("/explore")}>Explore Parks</h2>
              <h2 className='text-gray-300 text-sm font-thin hover:text-blue-400 transition-all duration-300 cursor-pointer' onClick={() => routeHandler("/explore")}>Book Tickets</h2>
              <h2 className='text-gray-300 text-sm font-thin hover:text-blue-400 transition-all duration-300 cursor-pointer' onClick={() => routeHandler("/user")}>My Bookings</h2>
            </div>
            <div>
              <h1 className='text-gray-400  text-sm font-extrabold tracking-wide'>Park Owners</h1>
              <h2 className='text-gray-300 text-sm font-thin hover:text-blue-400 transition-all duration-300 cursor-pointer' onClick={() => routeHandler("/owner-login")}>List Your Park</h2>
              <h2 className='text-gray-300 text-sm font-thin hover:text-blue-400 transition-all duration-300 cursor-pointer' onClick={() => routeHandler("/owner-dashboard")}>Owner Login</h2>
              <h2 className='text-gray-300 text-sm font-thin hover:text-blue-400 transition-all duration-300 cursor-pointer' onClick={() => routeHandler("/owner-dashboard")}>Dashboard</h2>
            </div>

          </div>

          <div className='h-1/4'>
            <hr />
            <h2 className='text-gray-400 text-center text-sm font-thin'>ThrillTrips © 2026 by Aditya kuril & Neel kanani. </h2>
          </div>
        </div>
      </div>
      <div className='relative w-full h-full bg-amber-50'>
        <Transition out={out} path={mpath} />
      </div>


    </div>
  )
}

export default Home
