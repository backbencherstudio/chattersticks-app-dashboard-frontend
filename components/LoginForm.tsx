'use client';

import React, { useState, type ComponentProps } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, Eye, EyeOff } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';

// Utility function to merge classNames
function cn(...classes: (string | undefined | null | false)[]) {
  return classes.filter(Boolean).join(' ');
}

// Simple Field components
const FieldGroup = ({ children }: { children: React.ReactNode }) => (
  <div>{children}</div>
);

const Field = ({ children }: { children: React.ReactNode }) => (
  <div className="w-full">{children}</div>
);

const FieldLabel = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => (
  <label className={cn('block text-gray-700', className)}>{children}</label>
);

// ✅ OTP Input with improved responsiveness
const OtpInput = () => (
  <div className="flex justify-center gap-2 sm:gap-3 md:gap-4">
    {Array.from({ length: 4 }).map((_, i) => (
      <input
        key={i}
        maxLength={1}
        className="h-12 w-12 sm:h-14 sm:w-14 md:h-16 md:w-16 border border-gray-300 rounded-lg text-center text-base sm:text-lg md:text-xl font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
      />
    ))}
  </div>
);

type Step = 'login' | 'forgot' | 'otp' | 'reset';

export default function LoginForm({
  className,
  ...props
}: ComponentProps<'div'>) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [step, setStep] = useState<Step>('login');
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  // ✅ Handle Login (Mock implementation)
  const handleSubmit = async () => {
    setIsLoading(true);
    setError(null);
    setSuccess(false);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));

      // Mock validation
      if (email && password) {
        setSuccess(true);
        // In real app: store token and redirect
        console.log('Login successful!');
      } else {
        setError('Please enter email and password');
      }
    } catch (err) {
      setError('Login failed. Please try again.');
      console.error('❌ Login failed:', err);
    } finally {
      setIsLoading(false);
    }
  };

  // ✅ Reset Password Success
  const handleChangePassword = () => {
    setShowSuccessModal(true);
  };

  const handleBackToLogin = () => {
    setShowSuccessModal(false);
    setStep('login');
  };

  return (
    <div
      className={cn(
        'flex flex-col items-center justify-center min-h-screen w-full px-4 py-6 sm:px-6 sm:py-8 md:px-8 lg:px-10 bg-gray-50',
        className
      )}
      {...props}
    >
      <div className="w-full max-w-[90%] sm:max-w-md md:max-w-lg">
        {/* ✅ LOGIN */}
        {step === 'login' && (
          <Card className="shadow-xl rounded-2xl border border-gray-200 w-full bg-white">
            <CardHeader className="text-center px-4 sm:px-6 pt-6 pb-4">
              <CardTitle className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-800">
                Welcome 👋
              </CardTitle>
              <small className="text-gray-500 text-xs sm:text-sm md:text-base mt-1 block">
                Please login to continue
              </small>
            </CardHeader>

            <CardContent className="px-4 sm:px-6 pb-6">
              <FieldGroup>
                <div className="flex flex-col gap-4 sm:gap-5">
                  <Field>
                    <FieldLabel className="text-xs sm:text-sm md:text-base font-medium">
                      Email address
                    </FieldLabel>
                    <Input
                      id="email"
                      type="email"
                      placeholder="name@example.com"
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                      className="mt-1 text-sm sm:text-base h-10 sm:h-11"
                      required
                    />
                  </Field>

                  <Field>
                    <FieldLabel className="text-xs sm:text-sm md:text-base font-medium">
                      Password
                    </FieldLabel>
                    <div className="relative mt-1">
                      <Input
                        id="password"
                        type={showPassword ? 'text' : 'password'}
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        placeholder="••••••••"
                        className="h-10 sm:h-11 pr-10"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 transition-colors"
                      >
                        {showPassword ? (
                          <EyeOff className="h-4 w-4 sm:h-5 sm:w-5" />
                        ) : (
                          <Eye className="h-4 w-4 sm:h-5 sm:w-5" />
                        )}
                      </button>
                    </div>
                  </Field>

                  <div className="flex flex-col xs:flex-row items-start xs:items-center justify-between gap-2 xs:gap-0 text-xs sm:text-sm">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        className="accent-blue-600 w-4 h-4"
                      />
                      <span>Remember me</span>
                    </label>

                    <button
                      type="button"
                      onClick={() => setStep('forgot')}
                      className="text-blue-600 hover:underline whitespace-nowrap"
                    >
                      Forgot password?
                    </button>
                  </div>

                  <Button
                    type="button"
                    onClick={handleSubmit}
                    disabled={isLoading}
                    className="w-full mt-2 bg-blue-500 hover:bg-blue-600 text-white text-sm sm:text-base py-2.5 sm:py-3 h-auto"
                  >
                    {isLoading ? 'Logging in...' : 'Login'}
                  </Button>

                  {error && (
                    <p className="mt-2 text-xs sm:text-sm text-red-500 text-center">
                      {error}
                    </p>
                  )}
                  {success && (
                    <p className="mt-2 text-xs sm:text-sm text-green-600 text-center">
                      Login successful!
                    </p>
                  )}
                </div>
              </FieldGroup>
            </CardContent>
          </Card>
        )}

        {/* ✅ FORGOT PASSWORD */}
        {step === 'forgot' && (
          <Card className="shadow-xl rounded-2xl border border-gray-200 w-full bg-white">
            <CardHeader className="px-4 sm:px-6 pt-4 sm:pt-6 pb-4">
              <div className="flex items-center gap-2 mb-2">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setStep('login')}
                  className="h-8 w-8 sm:h-9 sm:w-9"
                >
                  <ArrowLeft className="h-4 w-4" />
                </Button>
                <span className="text-xs sm:text-sm text-gray-600">back</span>
              </div>
              <CardTitle className="text-lg sm:text-xl md:text-2xl font-semibold text-gray-800">
                Forgot Password
              </CardTitle>
              <p className="text-xs sm:text-sm text-gray-500 mt-1">
                Enter your registered email address. We will send you a code to
                reset your password.
              </p>
            </CardHeader>

            <CardContent className="px-4 sm:px-6 pb-6">
              <div className="flex flex-col gap-4 sm:gap-5">
                <div>
                  <label className="text-xs sm:text-sm font-medium text-gray-700">
                    Email Address
                  </label>
                  <Input
                    type="email"
                    placeholder="example@email.com"
                    className="mt-1 text-sm sm:text-base h-10 sm:h-11"
                  />
                </div>
                <Button
                  onClick={() => setStep('otp')}
                  className="w-full bg-blue-500 hover:bg-blue-600 h-10 sm:h-11 text-sm sm:text-base"
                >
                  Send OTP
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* ✅ OTP SCREEN */}
        {step === 'otp' && (
          <Card className="shadow-xl rounded-2xl border border-gray-200 w-full bg-white">
            <CardHeader className="px-4 sm:px-6 pt-4 sm:pt-6 pb-4">
              <button
                className="flex items-center gap-1 text-xs sm:text-sm text-gray-500 mb-2"
                onClick={() => setStep('forgot')}
              >
                <ArrowLeft className="h-3 w-3 sm:h-4 sm:w-4" /> back
              </button>
              <CardTitle className="text-lg sm:text-xl md:text-2xl font-semibold text-gray-800">
                Enter OTP
              </CardTitle>
              <p className="text-xs sm:text-sm text-gray-500 mt-1">
                We have sent a code to your registered email.
              </p>
            </CardHeader>

            <CardContent className="px-4 sm:px-6 pb-6">
              <div className="flex flex-col gap-5 sm:gap-6">
                <OtpInput />
                <Button
                  onClick={() => setStep('reset')}
                  className="w-full bg-blue-500 hover:bg-blue-600 h-10 sm:h-11 text-sm sm:text-base"
                >
                  Verify
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* ✅ RESET PASSWORD */}
        {step === 'reset' && (
          <Card className="shadow-xl rounded-2xl border border-gray-200 w-full bg-white">
            <CardHeader className="px-4 sm:px-6 pt-4 sm:pt-6 pb-4">
              <button
                className="flex items-center gap-1 text-xs sm:text-sm text-gray-500 mb-2"
                onClick={() => setStep('otp')}
              >
                <ArrowLeft className="h-3 w-3 sm:h-4 sm:w-4" /> back
              </button>
              <CardTitle className="text-lg sm:text-xl md:text-2xl font-semibold text-gray-800">
                Reset Password
              </CardTitle>
            </CardHeader>

            <CardContent className="px-4 sm:px-6 pb-6">
              <div className="flex flex-col gap-4 sm:gap-5">
                <div>
                  <label className="text-xs sm:text-sm font-medium text-gray-700">
                    New Password
                  </label>
                  <Input
                    type="password"
                    placeholder="Enter new password"
                    className="mt-1 text-sm sm:text-base h-10 sm:h-11"
                  />
                </div>
                <div>
                  <label className="text-xs sm:text-sm font-medium text-gray-700">
                    Confirm Password
                  </label>
                  <Input
                    type="password"
                    placeholder="Confirm password"
                    className="mt-1 text-sm sm:text-base h-10 sm:h-11"
                  />
                </div>
                <Button
                  onClick={handleChangePassword}
                  className="w-full bg-blue-500 hover:bg-blue-600 text-white h-10 sm:h-11 text-sm sm:text-base"
                >
                  Change Password
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>

      {/* ✅ SUCCESS MODAL */}
      <Dialog open={showSuccessModal} onOpenChange={setShowSuccessModal}>
        <DialogContent className="w-[90%] max-w-[400px] sm:max-w-md mx-auto">
          <DialogHeader>
            <div className="mx-auto mb-3 sm:mb-4 text-4xl sm:text-5xl md:text-6xl">
              🎉
            </div>
            <DialogTitle className="text-center text-lg sm:text-xl md:text-2xl font-semibold px-2">
              Password Updated Successfully
            </DialogTitle>
            <DialogDescription className="text-center text-gray-500 text-xs sm:text-sm px-2">
              Your password has been updated successfully.
            </DialogDescription>
          </DialogHeader>
          <Button
            onClick={handleBackToLogin}
            className="w-full bg-blue-500 hover:bg-blue-600 text-white h-10 sm:h-11 text-sm sm:text-base mt-2"
          >
            Back to login
          </Button>
        </DialogContent>
      </Dialog>
    </div>
  );
}
