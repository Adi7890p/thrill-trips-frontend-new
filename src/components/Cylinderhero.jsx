import { useTexture } from '@react-three/drei'
import * as THREE from 'three';
import React, { useState, useEffect } from 'react'
import { useFrame } from '@react-three/fiber';
import { useRef } from 'react';
import { Bloom } from './../../node_modules/@react-three/postprocessing/src/effects/Bloom';
import { EffectComposer } from './../../node_modules/@react-three/postprocessing/src/EffectComposer';
import gsap from 'gsap';
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Cylinderhero = () => {
    let texture = useTexture("/Group 2.png");
    const [speed, setSpeed] = useState(0.025);
    const [intense, setIntense] = useState();
    const cylgeo = useRef(null);

    const hoverEffect = () => {
        if (speed === 0.005) {
            setSpeed(0.025);
            setIntense(1)

        } else {
            setSpeed(0.005);
            setIntense(2);

        }
    }

    useEffect(() => {
        if (cylgeo.current) {
            const scaler = gsap.to(cylgeo.current.scale, {
                x: 0.5,
                y: 0.5,
                z: 0.5,
                scrollTrigger: {
                    trigger: ".scene-container", 
                    start: "top top", 
                    end: "bottom bottom", 
                    scrub: true, 
                }
            });
            const rotator = gsap.to(cylgeo.current.rotation, {
                z: -0.3,
                scrollTrigger: {
                    trigger: ".scene-container", 
                    start: "20% top", 
                    end: "bottom bottom", 
                    scrub: true,
                }
            });

            const positioner = gsap.to(cylgeo.current.position, {
                // x: 2,
                y: 1.2,
                // z: 2,
                duration: 2,
                // ease: "power1.out",
                scrollTrigger: {
                    trigger: ".scene-container", 
                    start: "55% top", 
                    end: "180% 180%", 
                    scrub: true,
                }
            });


            
            return () => {
                scaler.scrollTrigger?.kill();
                rotator.scrollTrigger?.kill();
                positioner.scrollTrigger?.kill();
            };
        }
    }, []);
    let cyl = useRef(null);
    texture.needsUpdate = true;
    useFrame(() => {
        cyl.current.rotation.y -= speed;
        // cyl.current.rotation.x += speed;
        // cyl.current.rotation.z -= speed;
    })
    return (
        <>
            <group rotation={[0.4, 0, 0.2]} position={[0, 0.25, 1]} ref={cylgeo} scale={[1, 1, 1]} onPointerEnter={hoverEffect} onPointerLeave={hoverEffect}>
                <mesh ref={cyl} >
                    <cylinderGeometry args={[1.5, 1.5, 1, 60, 60, true]} />
                    <meshStandardMaterial map={texture} transparent side={THREE.DoubleSide} />
                </mesh>
            </group>
            <EffectComposer>
                <Bloom
                    mipmapBlur
                    intensity={intense}
                    luminanceThreshold={0}
                    luminanceSmoothing={0.2}
                />
            </EffectComposer>
        </>

    )
}

export default Cylinderhero
