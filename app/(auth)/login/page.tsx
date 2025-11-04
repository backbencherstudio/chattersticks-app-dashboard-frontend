'use client';
import React from 'react';
import Image from 'next/image';
import { LoginForm } from '@/components/LoginForm';

const LoginPage = () => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-soft-gradient p-6">
      <div className="flex flex-col md:flex-row items-center justify-center gap-12 md:gap-20">
        {/* Logo Section */}
        <div className="flex items-center justify-center w-full md:w-1/2">
          <Image
            src="/images/logo-img.png"
            width={400}
            height={400}
            alt="Chatterstiks Logo"
            className="object-contain w-[250px] md:w-[400px]"
            priority
          />
        </div>

        {/* Login Form Section */}
        <div className="flex items-center justify-center w-full">
          <LoginForm />
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
