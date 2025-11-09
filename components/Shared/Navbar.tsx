'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { HiMenuAlt3 } from 'react-icons/hi';
import { useGetMeQuery } from '@/rtk/features/all-apis/auth/authApi';


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
      setFullName(data.data.name || '');
      setEmail(data.data.email || '');
      setImage(data.data.avatar_url || null);
    }
  }, [data]);
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
            <h2>Hello {fullName}</h2>
            <p>Good Morning!</p>
          </div>
        </div>
        {/* Right side - User dropdown */}
        <div className="flex items-center gap-4 text-xs md:text-lg">
          <Image
            src={image ?? '/default-avatar.png'}
            width={40}
            height={40}
            className="rounded-md"
            alt='profile'
          />
          <div>
            <h2>Sheikh</h2>
            <p>{email}</p>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
