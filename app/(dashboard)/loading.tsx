'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import { gsap } from 'gsap';

export default function Loading() {
  const logoRef = useRef<HTMLImageElement>(null);
  const boxRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const tl = gsap.timeline({
      repeat: -1,
      defaults: { ease: 'power1.inOut' },
    });

    // Logo fade-in and gentle float animation
    tl.fromTo(
      logoRef.current,
      { opacity: 0, y: -30, scale: 0.8 },
      { opacity: 1, y: 0, scale: 1, duration: 1.2 }
    );

    // Blue box spin and pulse animation
    tl.to(
      boxRef.current,
      {
        rotation: 360,
        scale: 1.2,
        duration: 1.5,
        yoyo: true,
        repeat: 1,
        transformOrigin: 'center center',
        ease: 'power2.inOut',
      },
      '<0.2'
    );

    // Text fade pulse animation
    gsap.to(textRef.current, {
      opacity: 0.3,
      repeat: -1,
      yoyo: true,
      duration: 1.2,
      ease: 'power1.inOut',
    });

    return () => { tl.kill(); }; 
  }, []);

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-linear-to-b from-blue-50 to-white text-center overflow-hidden">
      {/* Logo */}
      <Image
        ref={logoRef}
        src="/images/logo.png"
        width={120}
        height={120}
        alt="App logo"
        className="mb-8 select-none"
      />

      {/* Animated blue cube */}
      <div
        ref={boxRef}
        className="h-16 w-16 bg-blue-500 rounded-2xl shadow-xl shadow-blue-200"
      />

      {/* Animated loading text */}
      <p
        ref={textRef}
        className="mt-6 text-gray-700 text-lg font-semibold tracking-wide"
      >
        Loading your dashboard...
      </p>
    </div>
  );
}
