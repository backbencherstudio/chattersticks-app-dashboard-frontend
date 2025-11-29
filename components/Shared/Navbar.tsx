"use client";

import { useGetMeQuery } from "@/rtk/features/all-apis/auth/authApi";
import gsap from "gsap";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import { HiMenuAlt3 } from "react-icons/hi";

export interface NavbarProps {
  isMobileMenuOpen: boolean;
  onMobileMenuToggle: () => void;
  notificationCount: number;
}

const Navbar: React.FC<NavbarProps> = ({ onMobileMenuToggle }) => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const { data } = useGetMeQuery("");
  const [image, setImage] = useState<string | null>(null);

  const greetingRef = useRef<HTMLDivElement>(null);
  const nameRef = useRef<HTMLSpanElement>(null);
  const timeGreetingRef = useRef<HTMLParagraphElement>(null);
  const iconRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (data?.data) {
      setFullName(data?.data?.name || "");
      setEmail(data?.data?.email || "");
      setImage(data.data.avatar_url || null);
    }
  }, [data]);

  useEffect(() => {
    if (fullName) {
      // Animate greeting text
      gsap.fromTo(
        greetingRef.current,
        { opacity: 0, y: -20 },
        { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" }
      );

      // Animate name with a slight delay
      gsap.fromTo(
        nameRef.current,
        { opacity: 0, scale: 0.8 },
        {
          opacity: 1,
          scale: 1,
          duration: 0.5,
          delay: 0.2,
          ease: "back.out(1.7)",
        }
      );

      // Animate time-based greeting
      gsap.fromTo(
        timeGreetingRef.current,
        { opacity: 0, x: -20 },
        {
          opacity: 1,
          x: 0,
          duration: 0.5,
          delay: 0.4,
          ease: "power2.out",
        }
      );

      // Animate icon
      gsap.fromTo(
        iconRef.current,
        { opacity: 0, rotate: -180, scale: 0 },
        {
          opacity: 1,
          rotate: 0,
          scale: 1,
          duration: 0.6,
          delay: 0.5,
          ease: "elastic.out(1, 0.5)",
        }
      );

      // Add a subtle floating animation to the icon
      gsap.to(iconRef.current, {
        y: -5,
        duration: 1.5,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: 1.1,
      });
    }
  }, [fullName]);

  const currentHour = new Date().getHours();
  let greeting = "Hello";
  let greetingIcon = "👋";

  if (currentHour < 12) {
    greeting = "Good Morning";
    greetingIcon = "🌅";
  } else if (currentHour < 18) {
    greeting = "Good Afternoon";
    greetingIcon = "☀️";
  } else {
    greeting = "Good Evening";
    greetingIcon = "🌙";
  }

  return (
    <header className="bg-white z-10 border-b border-gray-200 font-[inter]">
      <div className="flex items-center justify-between py-4 px-2 md:px-5 gap-8">
        {/* Left side - Mobile menu button and Greeting */}
        <div className="flex items-center gap-4 flex-1">
          <button
            className="p-2 cursor-pointer rounded-lg hover:bg-gray-100 md:hidden transition-colors duration-200"
            onClick={onMobileMenuToggle}
          >
            <HiMenuAlt3 className="w-6 h-6" />
          </button>

          {/* Enhanced greetings section */}
          <div className="relative flex-1">
            <div
              ref={greetingRef}
              className="flex items-center gap-2 text-xs md:text-base"
            >
              <h2 className="text-gray-600 font-medium">
                Hello,{" "}
                <span
                  ref={nameRef}
                  className="not-italic font-bold text-transparent bg-clip-text bg-linear-to-r from-green-600 to-emerald-600"
                >
                  {fullName}
                </span>
              </h2>
            </div>

            <div className="flex items-center gap-2 mt-1">
              <p
                ref={timeGreetingRef}
                className="text-xs md:text-sm font-semibold bg-linear-to-r from-yellow-600 via-orange-600 to-amber-800 bg-clip-text text-transparent"
              >
                {greeting}!
              </p>
              <span ref={iconRef} className="text-base md:text-lg">
                {greetingIcon}
              </span>
            </div>
          </div>
        </div>

        {/* Right side - User dropdown */}
        <div className="flex items-center gap-4 text-xs md:text-base">
          {image && (
            <Image
              src={image}
              width={100}
              height={100}
              crossOrigin="anonymous"
              className="rounded-full h-10 w-10"
              alt="profile"
            />
          )}
          <div className="hidden sm:block">
            <h2 className="font-bold text-transparent bg-clip-text bg-linear-to-r from-green-600 to-emerald-600">
              {fullName}
            </h2>
            <small className="text-xs text-gray-600">{email}</small>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
