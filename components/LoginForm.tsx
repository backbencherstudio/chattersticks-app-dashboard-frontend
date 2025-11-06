"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { ArrowLeft, Eye, EyeOff } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { useLoginMutation } from "@/rtk/features/all-apis/auth/authApi";
import { parseCookies } from "nookies";

// Type-safe error interface
interface ApiError {
  data?: {
    message?: string | { message?: string };
    error?: string;
  };
}

const getErrorMessage = (err: unknown): string => {
  const e = err as ApiError;

  if (typeof e?.data?.message === "string") return e.data.message;
  if (
    typeof e?.data?.message === "object" &&
    typeof e.data.message?.message === "string"
  ) {
    return e.data.message.message;
  }
  if (typeof e?.data?.error === "string") return e.data.error;

  return "Login failed";
};

// OTP Input Component
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

export default function LoginForm() {
  const [showForgot, setShowForgot] = useState(false);
  const [showOtp, setShowOtp] = useState(false);
  const [showReset, setShowReset] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [login, { isLoading, isError, error }] = useLoginMutation();

  const handleChangePassword = () => setShowSuccessModal(true);

  const handleBackToLogin = () => {
    setShowSuccessModal(false);
    setShowReset(false);
    setShowForgot(false);
    setShowOtp(false);
  };

  // Redirect if token exists
  useEffect(() => {
    const cookies = parseCookies();
    if (cookies.token) {
      router.push("/dashboard");
    }
  }, [router]);

  const handleLogin = async () => {
    try {
      const res = await login({ email, password }).unwrap();
      console.log(res);
      // Save token
      if (res?.success) {
        router.push("/dashboard");
      }
    } catch (err) {
      console.log("Login failed", err);
    }
  };

  const errorMessage = isError ? getErrorMessage(error) : "";

  return (
    <div className="md:min-h-screen flex items-center justify-center">
      {/* LOGIN */}
      {!showForgot && !showOtp && !showReset && (
        <Card className="md:w-[350px] shadow-xl rounded-2xl">
          <CardHeader>
            <CardTitle className="text-2xl font-bold">Welcome 👋</CardTitle>
            <small className="text-[#A2A1A8]">Please Login here</small>
          </CardHeader>

          <CardContent>
            <div className="flex flex-col gap-4">
              <div>
                <label className="text-sm font-medium">Email address</label>
                <Input
                  type="email"
                  placeholder="name@example.com"
                  className="mt-1"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div>
                <label className="text-sm font-medium">Password</label>
                <div className="relative mt-1">
                  <Input
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </button>
                </div>
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

              <Button
                className="w-full mt-2 bg-blue-500"
                onClick={handleLogin}
                disabled={isLoading}
              >
                {isLoading ? "Please wait..." : "Login"}
              </Button>

              {isError && (
                <p className="text-red-600 text-sm mt-1">{errorMessage}</p>
              )}
            </div>
          </CardContent>
        </Card>
      )}

      {/* FORGOT PASSWORD */}
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
              Enter your registered email address. We will send you a code.
            </p>
          </CardHeader>

          <CardContent>
            <div className="flex flex-col gap-4">
              <div>
                <label className="text-sm font-medium">Email Address</label>
                <Input
                  type="email"
                  placeholder="example@email.com"
                  className="mt-1"
                />
              </div>

              <Button
                onClick={() => setShowOtp(true)}
                className="w-full bg-blue-500"
              >
                Send OTP
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* OTP */}
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
              We have sent a code to your email.
            </p>
          </CardHeader>

          <CardContent>
            <div className="flex flex-col gap-4">
              <OtpInput />
              <Button
                onClick={() => setShowReset(true)}
                className="w-full bg-blue-500"
              >
                Verify
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* RESET PASSWORD */}
      {showReset && (
        <Card className="w-[350px] shadow-xl rounded-2xl">
          <CardHeader>
            <button
              className="flex items-center gap-1 text-sm text-gray-500 mb-1"
              onClick={() => setShowReset(false)}
            >
              <ArrowLeft className="h-4 w-4" /> back
            </button>

            <CardTitle className="text-xl font-semibold">
              Reset Password
            </CardTitle>
          </CardHeader>

          <CardContent>
            <div className="flex flex-col gap-4">
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
                onClick={handleChangePassword}
                className="w-full bg-blue-500"
              >
                Change Password
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* SUCCESS */}
      <Dialog open={showSuccessModal} onOpenChange={setShowSuccessModal}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <div className="mx-auto mb-4 text-6xl">🎉</div>
            <DialogTitle className="text-center text-xl font-semibold">
              Password Updated Successfully
            </DialogTitle>
            <DialogDescription className="text-center text-gray-500">
              Your password has been updated successfully
            </DialogDescription>
          </DialogHeader>
          <Button
            onClick={handleBackToLogin}
            className="w-full bg-blue-500 hover:bg-blue-600"
          >
            Back to login
          </Button>
        </DialogContent>
      </Dialog>
    </div>
  );
}
