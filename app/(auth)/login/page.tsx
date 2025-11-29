"use client";

import LoginForm from "@/components/LoginForm";
import Image from "next/image";
import { redirect } from "next/navigation";

const LoginPage = () => {
  const token = localStorage.getItem("access_token");

  if (token) {
    redirect("/dashboard");
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Mobile Layout: flex-col with image on top, form below */}
      <div className="md:hidden flex flex-col items-center justify-center min-h-screen gap-2">
        {/* Image section */}
        <div className="flex items-center justify-center  px-4">
          <Image
            src="/images/logo-img.png"
            alt="Picture of the company"
            width={1000}
            height={1000}
            className="object-contain w-2/3 h-fit"
            priority
          />
        </div>

        {/* Form section */}
        <div className="flex  px-4 justify-center items-center drop-shadow-amber-50">
          <LoginForm />
        </div>
      </div>

      {/* Desktop/Tablet Layout: Side by side */}
      <div className="hidden md:flex justify-center items-center gap-4 md:gap-10 px-4 md:px-0 min-h-screen">
        <div className="bg-white flex items-center justify-center w-full h-full">
          <Image
            src="/images/logo-img.png"
            alt="Picture of the author"
            width={1000}
            height={1000}
            className="md:w-[543px] md:h-[304px]"
          />
        </div>
        <div className="bg-soft-gradient flex items-center justify-center w-full min-h-screen">
          <LoginForm />
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
