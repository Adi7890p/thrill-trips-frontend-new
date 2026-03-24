import gsap from 'gsap';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Transition = (props) => {
    const out = props.out;
    const path = props.path;
    const navigate = useNavigate();
    const [hider, setHider] = useState("");
    const [hiderx, setHiderx] = useState("hidden");

    useEffect(() => {
        // setHiderx("hidden");
        gsap.to(".upper .b1", { y: "-100.1%", duration: 0.3, delay: 0.8 })
        gsap.to(".upper .b2", { y: "-100.1%", duration: 0.3, delay: 0.95 })
        gsap.to(".upper .b3", { y: "-100.1%", duration: 0.3, delay: 1.1 })
        gsap.to(".upper .b4", { y: "-100.1%", duration: 0.3, delay: 1.25 })
        gsap.to(".upper .b5", { y: "-100.1%", duration: 0.3, delay: 1.4 })

        gsap.to(".lower .b1", { y: "100%", duration: 0.3, delay: 0.8 })
        gsap.to(".lower .b2", { y: "100%", duration: 0.3, delay: 0.95 })
        gsap.to(".lower .b3", { y: "100%", duration: 0.3, delay: 1.1 })
        gsap.to(".lower .b4", { y: "100%", duration: 0.3, delay: 1.25 })
        gsap.to(".lower .b5", { y: "100%", duration: 0.3, delay: 1.4 })
        setTimeout(() => {
            setHider("hidden");

        }, 1700);




    }, []);

    useEffect(() => {
        if (out) {
            setHider("");
            // console.log("here entered");

            gsap.to(".upper .b1", { y: "0%", duration: 0.3, delay: 0.5 });
            gsap.to(".upper .b2", { y: "0%", duration: 0.3, delay: 0.65 });
            gsap.to(".upper .b3", { y: "0%", duration: 0.3, delay: 0.8 });
            gsap.to(".upper .b4", { y: "0%", duration: 0.3, delay: 0.95 });
            gsap.to(".upper .b5", { y: "0%", duration: 0.3, delay: 1.1 });

            gsap.to(".lower .b1", { y: "0%", duration: 0.3, delay: 0.5 });
            gsap.to(".lower .b2", { y: "0%", duration: 0.3, delay: 0.65 });
            gsap.to(".lower .b3", { y: "0%", duration: 0.3, delay: 0.8 });
            gsap.to(".lower .b4", { y: "0%", duration: 0.3, delay: 0.95 });
            gsap.to(".lower .b5", { y: "0%", duration: 0.3, delay: 1.1 });
            setTimeout(() => {
                setHiderx("");
                navigate(path);
            }, 1400);




        }
    }, [out]);

    return (
        <>
            <div className={"w-screen h-screen z-1000 left-0 top-0 fixed flex flex-wrap " + hider}>
                <div className=' w-screen h-1/2 flex upper'>
                    <div className='w-1/5 h-full bg-orange-400 b1' ></div>
                    <div className='w-1/5 h-full bg-orange-400 b2' ></div>
                    <div className='w-1/5 h-full bg-orange-400 b3 flex justify-center items-end' >
                        <img src="/logo1.png" className='w-1/1 border-b-5 border-dashed border-black ' alt="" />
                    </div>
                    <div className='w-1/5 h-full bg-orange-400 b4' ></div>
                    <div className='w-1/5 h-full bg-orange-400 b5' ></div>
                </div>
                <div className=' w-screen h-1/2 flex lower'>
                    <div className='w-1/5 h-full bg-orange-400 b1' ></div>
                    <div className='w-1/5 h-full bg-orange-400 b2' ></div>
                    <div className='w-1/5 h-full bg-orange-400 b3' ></div>
                    <div className='w-1/5 h-full bg-orange-400 b4' ></div>
                    <div className='w-1/5 h-full bg-orange-400 b5' ></div>
                </div>
            </div>
            <div className={"w-screen h-screen z-900 left-0 top-0 fixed bg-orange-400 blocked " + hiderx}>
                <div className=' w-screen h-1/2 flex '>
                    <div className='w-1/5 h-full bg-orange-400 b1' ></div>
                    <div className='w-1/5 h-full bg-orange-400 b2' ></div>
                    <div className='w-1/5 h-full bg-orange-400 b3 flex justify-center items-end' >
                        <img src="/logo1.png" className='w-1/1 border-b-5 border-dashed border-black ' alt="" />
                    </div>
                    <div className='w-1/5 h-full bg-orange-400 b4' ></div>
                    <div className='w-1/5 h-full bg-orange-400 b5' ></div>
                </div>
                <div className=' w-screen h-1/2 flex '>
                    <div className='w-1/5 h-full bg-orange-400 b1' ></div>
                    <div className='w-1/5 h-full bg-orange-400 b2' ></div>
                    <div className='w-1/5 h-full bg-orange-400 b3' ></div>
                    <div className='w-1/5 h-full bg-orange-400 b4' ></div>
                    <div className='w-1/5 h-full bg-orange-400 b5' ></div>
                </div>

            </div>
        </>
    );
};

export default Transition
