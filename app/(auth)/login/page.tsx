'use client';
import React from 'react';
import Image from 'next/image';
import { LoginForm } from '@/components/LoginForm';

const LoginPage = () => {
  return (
    <div className="md:flex justify-center items-center gap-4 md:gap-10 px-4 md:px-0 overflow-y-hidden">
      <div className="bg-white flex items-center justify-center w-full h-full min-h-screen">
        <Image
          src="/images/logo-img.png"
          alt="Picture of the author"
          width={1000}
          height={1000}
          className='md:w-[543px] md:h-[304px]'
        />
      </div>
      <div className="bg-soft-gradient flex items-center justify-center w-full min-h-screen">
        <LoginForm/>
      </div>
    </div>
  );
};

export default LoginPage;
