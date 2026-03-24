import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import './customcursor.css';

const CustomCursor = () => {
  const followerRef = useRef(null);

  useEffect(() => {
    const follower = followerRef.current;

    if (!follower) return;

    document.body.classList.add('custom-cursor-active');

    // Set initial positions
    gsap.set(follower, { xPercent: -50, yPercent: -50, scale: 0.5 });

    const moveCursor = (e) => {
      // Follower (the chasing circle)
      gsap.to(follower, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.4,
        ease: "back.out(4)"
      });
    };

    const getRandomColor = () => {
      const colors = [
        '#FF3F8E', // Pink
        '#00E5FF', // Cyan
        '#76FF03', // Lime
        '#FFD600', // Yellow
        '#FF6D00', // Orange
        '#D500F9', // Purple
        '#3D5AFE'  // Blue
      ];
      return colors[Math.floor(Math.random() * colors.length)];
    };

    const handleHover = (e) => {
      const target = e.target;
      const isInteractive =
        target.tagName === 'A' ||
        target.tagName === 'BUTTON' ||
        target.tagName === 'IMG' ||
        target.tagName === 'INPUT' ||
        target.classList.contains('cursor-pointer') ||
        target.closest('button') ||
        target.closest('a') ||
        target.closest('.ride') ||
        target.closest('.imgFrame');

      if (isInteractive) {
        const randomColor = getRandomColor();
        gsap.to(follower, {
          scale: 1.2,
          backgroundColor: `${randomColor}33`, // with transparency
          borderColor: randomColor,
          duration: 0.3
        });
      } else {
        gsap.to(follower, {
          scale: 0.5,
          backgroundColor: 'transparent',
          borderColor: 'rgba(255, 255, 255, 0.6)',
          duration: 0.3
        });
      }
    };

    window.addEventListener('mousemove', moveCursor);
    window.addEventListener('mouseover', handleHover);

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      window.removeEventListener('mouseover', handleHover);
      document.body.classList.remove('custom-cursor-active');
    };
  }, []);

  return (
    <>
      <div ref={followerRef} className="custom-cursor-follower" />
    </>
  );
};

export default CustomCursor;
