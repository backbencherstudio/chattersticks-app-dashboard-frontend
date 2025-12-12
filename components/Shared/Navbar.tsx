"use client";

import { useGetMeQuery } from "@/rtk/features/all-apis/auth/authApi";
import Image from "next/image";
import React, { useEffect, useState } from "react";
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

  useEffect(() => {
    if (data?.data) {
      setFullName(data.data.name || "");
      setEmail(data.data.email || "");
      setImage(data?.data?.avatar_url || null);
    }
  }, [data]);

  const currentHour = new Date().getHours();
  let greeting = "Hello";
  if (currentHour < 12) {
    greeting = "Good Morning!";
  } else if (currentHour < 18) {
    greeting = "Good Afternoon!";
  } else {
    greeting = "Good Evening!!";
  }
  return (
    <header className="bg-white z-10 border-b border-gray-200 font-[inter]">
      <div className="flex items-center justify-between py-4 px-2 md:px-5 gap-8">
        {/* Left side - Mobile menu button and Search */}
        <div className="flex items-center gap-4 flex-1">
          <button
            className="p-2 cursor-pointer rounded-lg hover:bg-gray-100 md:hidden"
            onClick={onMobileMenuToggle}
          >
            <HiMenuAlt3 className="w-6 h-6" />
          </button>

          {/* greetings */}
          <div className="relative flex-1 text-xs md:text-lg">
            <h2 className="text-gray-500">
              Hello{" "}
              <span className="not-italic font-bold text-green-700">
                {fullName}
              </span>
            </h2>
            <p className="text-yellow-600">{greeting}</p>
          </div>
        </div>
        {/* Right side - User dropdown */}
        <div className="flex items-center gap-4 text-xs md:text-lg">
          <Image
            src={image ? data?.data?.avatar_url : "/images/profile.png"}
            width={40}
            height={40}
            className="rounded-md"
            alt="profile"
            crossOrigin="anonymous"
          />
          <div>
            <h2 className="font-bold">{fullName}</h2>
            <small className="text-xs">{email}</small>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
