'use client';

import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft } from 'lucide-react';
import { toast } from 'sonner'; 

// ✅ OTP Input Boxes
const OtpInput = () => {
  return (
    <div className="flex justify-between gap-2">
      {Array.from({ length: 4 }).map((_, i) => (
        <input
          key={i}
          maxLength={1}
          className="h-12 w-12 border border-gray-300 rounded-lg text-center text-xl font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      ))}
    </div>
  );
};

export const LoginForm = () => {
  const [showForgot, setShowForgot] = useState(false);
  const [showOtp, setShowOtp] = useState(false);
  const [showReset, setShowReset] = useState(false);

  const handleChangePassword = () => {
    toast.success('Password updated successfully 🔒', {
      description: 'You can now log in with your new password.',
      duration: 3000,
    });
    setShowReset(false);
    setShowForgot(false);
    setShowOtp(false);
  };

  return (
    <>
      {/* ✅ Login Screen */}
      {!showForgot && !showOtp && !showReset && (
        <Card className="w-[350px] shadow-xl rounded-2xl">
          <CardHeader>
            <CardTitle className="text-center text-xl font-semibold">
              Welcome 👋
            </CardTitle>
          </CardHeader>

          <CardContent>
            <form className="flex flex-col gap-4">
              <div>
                <label className="text-sm font-medium">Email address</label>
                <Input
                  type="email"
                  placeholder="name@example.com"
                  className="mt-1"
                />
              </div>

              <div>
                <label className="text-sm font-medium">Password</label>
                <Input
                  type="password"
                  placeholder="••••••••"
                  className="mt-1"
                />
              </div>

              <div className="flex items-center justify-between text-sm">
                <label className="flex items-center gap-2">
                  <input type="checkbox" className="accent-blue-600" />
                  Remember me
                </label>

                <button
                  type="button"
                  onClick={() => setShowForgot(true)}
                  className="text-blue-600 hover:underline"
                >
                  Forgot password?
                </button>
              </div>

              <Button type="submit" className="w-full mt-2 bg-blue-500">
                Login
              </Button>
            </form>
          </CardContent>
        </Card>
      )}

      {/* ✅ Forgot Password Screen */}
      {showForgot && !showOtp && !showReset && (
        <Card className="w-[350px] shadow-xl rounded-2xl">
          <CardHeader>
            <div className="flex items-center gap-2 mb-1">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setShowForgot(false)}
              >
                <ArrowLeft className="h-4 w-4" />
              </Button>
              <span className="text-sm text-gray-600">back</span>
            </div>

            <CardTitle className="text-xl font-semibold">
              Forgot Password
            </CardTitle>
            <p className="text-sm text-gray-500">
              Enter your registered email address. We’ll send you a code to
              reset your password.
            </p>
          </CardHeader>

          <CardContent>
            <form className="flex flex-col gap-4">
              <div>
                <label className="text-sm font-medium">Email Address</label>
                <Input
                  type="email"
                  placeholder="example@email.com"
                  className="mt-1"
                />
              </div>

              <Button
                type="button"
                onClick={() => setShowOtp(true)}
                className="w-full bg-blue-500"
              >
                Send OTP
              </Button>
            </form>
          </CardContent>
        </Card>
      )}

      {/* ✅ OTP Verification Screen */}
      {showOtp && !showReset && (
        <Card className="w-[350px] shadow-xl rounded-2xl">
          <CardHeader>
            <button
              className="flex items-center gap-1 text-sm text-gray-500 mb-1"
              onClick={() => setShowOtp(false)}
            >
              <ArrowLeft className="h-4 w-4" /> back
            </button>

            <CardTitle className="text-xl font-semibold">Enter OTP</CardTitle>
            <p className="text-sm text-gray-500">
              We have sent a code to your registered email.
            </p>
          </CardHeader>

          <CardContent>
            <form className="flex flex-col gap-4">
              <OtpInput />

              <Button
                type="button"
                onClick={() => setShowReset(true)}
                className="w-full bg-blue-500"
              >
                Verify
              </Button>
            </form>
          </CardContent>
        </Card>
      )}

      {/* ✅ Reset Password Screen */}
      {showReset && (
        <Card className="w-[350px] shadow-xl rounded-2xl">
          <CardHeader>
            <button
              className="flex items-center gap-1 text-sm text-gray-500 mb-1"
              onClick={() => setShowOtp(true)}
            >
              <ArrowLeft className="h-4 w-4" /> back
            </button>

            <CardTitle className="text-xl font-semibold">
              Reset Password
            </CardTitle>
          </CardHeader>

          <CardContent>
            <form className="flex flex-col gap-4">
              <div>
                <label className="text-sm font-medium">New Password</label>
                <Input
                  type="password"
                  placeholder="Enter new password"
                  className="mt-1"
                />
              </div>

              <div>
                <label className="text-sm font-medium">Confirm Password</label>
                <Input
                  type="password"
                  placeholder="Confirm password"
                  className="mt-1"
                />
              </div>

              <Button
                type="button"
                onClick={handleChangePassword}
                className="w-full bg-blue-500"
              >
                Change Password
              </Button>
            </form>
          </CardContent>
        </Card>
      )}
    </>
  );
};
