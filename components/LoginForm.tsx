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
import {
  useForgotPasswordMutation,
  useLoginMutation,
  useResetPasswordMutation,
  useVerifyOtpMutation,
} from "@/rtk/features/all-apis/auth/authApi";
import { ArrowLeft, Eye, EyeOff } from "lucide-react";
import { useRouter } from "next/navigation";
import { parseCookies } from "nookies";
import { useEffect, useState } from "react";
import { Input } from "./ui/input";

// Types
interface ApiError {
  data?: {
    message?: string | { message?: string };
    error?: string;
  };
}

type ViewState = "login" | "forgot" | "otp" | "reset";

// Helper functions
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

  return "Something went wrong";
};

// OTP Input Component
const OtpInput = ({
  otp,
  setOtp,
}: {
  otp: string;
  setOtp: (v: string) => void;
}) => (
  <div className="flex justify-between gap-2">
    {Array.from({ length: 4 }).map((_, i) => (
      <input
        key={i}
        maxLength={1}
        value={otp[i] || ""}
        onChange={(e) => {
          const val = e.target.value;
          if (/^[0-9]?$/.test(val)) {
            const newOtp = otp.split("");
            newOtp[i] = val;
            setOtp(newOtp.join(""));
          }
        }}
        className="h-12 w-12 border border-gray-300 rounded-lg text-center text-xl font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    ))}
  </div>
);

// Back Button Component
const BackButton = ({ onClick }: { onClick: () => void }) => (
  <button
    className="flex items-center gap-1 text-sm text-gray-500 mb-1"
    onClick={onClick}
  >
    <ArrowLeft className="h-4 w-4" /> back
  </button>
);

export default function LoginForm() {
  const router = useRouter();

  // RTK Mutations
  const [
    login,
    { isLoading: loginLoading, isError: loginError, error: loginErr },
  ] = useLoginMutation();
  const [forgotPassword] = useForgotPasswordMutation();
  const [verifyOtp] = useVerifyOtpMutation();
  const [resetPassword] = useResetPasswordMutation();

  // Form state
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [resetToken, setResetToken] = useState("");

  // View state
  const [currentView, setCurrentView] = useState<ViewState>("login");
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  // Redirect if already logged in
  useEffect(() => {
    const cookies = parseCookies();
    if (cookies.access_token) {
      router.push("/dashboard");
    }
  }, [router]);

  // Handlers
  const handleLogin = async () => {
    try {
      const res = await login({ email, password }).unwrap();
      console.log(res);

      if (res?.success) {
        const accessToken = res?.authorization?.access_token;
        localStorage.setItem("access_token", accessToken);
        router.push("/dashboard");
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleSendOtp = async () => {
    try {
      await forgotPassword(email).unwrap();
      setCurrentView("otp");
    } catch (err) {
      console.log(err);
    }
  };

  const handleVerifyOtp = async () => {
    try {
      const res = await verifyOtp({ email, otp }).unwrap();
      setResetToken(res.token);
      setCurrentView("reset");
    } catch (err) {
      console.error(err);
    }
  };

  const handleResetPassword = async () => {
    if (newPassword !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }
    try {
      await resetPassword({
        email,
        password: newPassword,
        token: resetToken,
      }).unwrap();
      setShowSuccessModal(true);
    } catch (err) {
      console.error(err);
    }
  };

  const handleBackToLogin = () => {
    setCurrentView("login");
    setShowSuccessModal(false);
  };

  const errorMessage = loginError ? getErrorMessage(loginErr) : "";

  return (
    <div className="md:min-h-screen flex items-center justify-center">
      {/* LOGIN VIEW */}
      {currentView === "login" && (
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
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 cursor-pointer"
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
                  <input
                    type="checkbox"
                    className="accent-blue-600 cursor-pointer"
                  />
                  Remember me
                </label>
                <button
                  type="button"
                  onClick={() => setCurrentView("forgot")}
                  className="text-blue-600 hover:underline cursor-pointer"
                >
                  Forgot password?
                </button>
              </div>

              <Button
                className="w-full mt-2 bg-blue-500 cursor-pointer"
                onClick={handleLogin}
                disabled={loginLoading}
              >
                {loginLoading ? "Please wait..." : "Login"}
              </Button>

              {loginError && (
                <p className="text-red-600 text-sm mt-1">{errorMessage}</p>
              )}
            </div>
          </CardContent>
        </Card>
      )}

      {/* FORGOT PASSWORD VIEW */}
      {currentView === "forgot" && (
        <Card className="w-[350px] shadow-xl rounded-2xl">
          <CardHeader>
            <BackButton onClick={() => setCurrentView("login")} />
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
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <Button onClick={handleSendOtp} className="w-full bg-blue-500">
                Send OTP
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* OTP VIEW */}
      {currentView === "otp" && (
        <Card className="w-[350px] shadow-xl rounded-2xl">
          <CardHeader>
            <BackButton onClick={() => setCurrentView("forgot")} />
            <CardTitle className="text-xl font-semibold">Enter OTP</CardTitle>
            <p className="text-sm text-gray-500">
              We have sent a code to your email.
            </p>
          </CardHeader>

          <CardContent>
            <div className="flex flex-col gap-4">
              <OtpInput otp={otp} setOtp={setOtp} />
              <Button onClick={handleVerifyOtp} className="w-full bg-blue-500">
                Verify
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* RESET PASSWORD VIEW */}
      {currentView === "reset" && (
        <Card className="w-[350px] shadow-xl rounded-2xl">
          <CardHeader>
            <BackButton onClick={() => setCurrentView("otp")} />
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
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                />
              </div>
              <div>
                <label className="text-sm font-medium">Confirm Password</label>
                <Input
                  type="password"
                  placeholder="Confirm password"
                  className="mt-1"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </div>
              <Button
                onClick={handleResetPassword}
                className="w-full bg-blue-500 cursor-pointer"
              >
                Change Password
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* SUCCESS MODAL */}
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
            className="w-full bg-blue-500 hover:bg-blue-600 cursor-pointer"
          >
            Back to login
          </Button>
        </DialogContent>
      </Dialog>
    </div>
  );
}
