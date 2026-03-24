import React, { useEffect, useState } from 'react'
import './header.css'
import logo1 from "../assets/images/logo1.png";
import logo2 from "../assets/images/logo2.png";
import footer from '../assets/images/headermover.png'
import gsap from 'gsap';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Explore from '../pages/Explore';
import Transition from './Transition';


const Header = (props) => {
    const navigate = useNavigate();

    const location = useLocation();
    // console.log(location.pathname);




    useEffect(() => {
        // gsap.fromTo("#nav", { y: '-100%' }, { y: '0%', duration: 1, delay: 0, ease: 'power2.out' });
        // gsap.fromTo("#logo1", { y: '-100%' }, { y: '0%', duration: 1, delay: 0.5, ease: 'power2.out' });
        // gsap.fromTo("#logo2", { y: '-100%' }, { y: '0%', duration: 1, delay: 0.5, ease: 'power2.out' });
        // gsap.fromTo(".links a", { y: '-100%', opacity: 0 }, { y: '0%', delay: 0.5, opacity: 1, duration: 1, ease: 'power2.out', stagger: 0.2 });
        // gsap.fromTo("#footer", { y: '100%' }, { y: '0%', duration: 1,delay:0, ease: 'power2.out', delay: 1 });


        // gsap.to("#footer1", { x: '100vw', duration: 10, ease: 'none', repeat: -1 });
        // gsap.to("#footer2", { x: '100vw', duration: 10, ease: 'none', repeat: -1 });
        // gsap.to("#footer3", { x: '100vw', duration: 10, ease: 'none', repeat: -1 });
        // gsap.to("#footer4", { x: '100vw', duration: 10, ease: 'none', repeat: -1 });
        // gsap.to("#footer5", { x: '100vw', duration: 10, ease: 'none', repeat: -1 });
    }, []);


    const userr = () => {
        routeHandler('/user');
    }


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
        <>
            <div className='header pr-8 my-3 rounded-full'>

                <nav id="nav" className=''>
                    <div className="logo">
                        <img src={logo2} alt="logo" id="logo2" />
                        <h1 onClick={

                            (e) => { routeHandler("/", e) }} alt="logo" id="logo1" className='text-[1.75vw] text-white cursor-pointer' >
                            Thrill Trips
                        </h1>


                    </div>
                    <div className="links w-full">
                        <Link to="/about" onClick={(e) => routeHandler("/about", e)}>About Us</Link>
                        <Link to="/explore" onClick={(e) => routeHandler("/explore", e)}>Explore</Link>


                        {sessionStorage.getItem("username") ? <div style={{ fontFamily: 'bt' }} onClick={userr} className='capitalize border-2 -mt-3 border-dotted tracking-wider text-3xl bg-[linear-gradient(135deg,#d63384,#6610f2,#0d6efd)] cursor-pointer text-white px-3 py-0.5 rounded-full h-12' >{sessionStorage.getItem("username")[0]}</div> :
                            <Link to="/login" onClick={(e) => routeHandler("/login", e)}>Login</Link>
                        }


                    </div>
                    {/* <div className="footer">

                        <img src={footer} alt="footer" id="footer1" />
                        <img src={footer} alt="footer" id="footer2" />
                        <img src={footer} alt="footer" id="footer3" />
                        <img src={footer} alt="footer" id="footer4" />
                        <img src={footer} alt="footer" id="footer5" />
                    </div> */}
                </nav>

            </div>
            {location.pathname != "/" && <div id="top-space"></div>}

            <div className='relative w-full h-full bg-amber-50'>
                <Transition out={out} path={mpath} />
            </div>
        </>
    )
}

export default Header
