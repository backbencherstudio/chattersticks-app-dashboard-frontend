"use client";
import {
  useChangePasswordMutation,
 
  useGetMeQuery,
 
  useUpdateProfileMutation,
} from "@/rtk/features/all-apis/auth/authApi";
import { User, X } from "lucide-react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

function SettingsModal({ isOpen, onClose }: SettingsModalProps) {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [file, setFile] = useState<File | null>(null);

  const modalRef = useRef(null);
  const overlayRef = useRef(null);
  const contentRef = useRef(null);

  //Query && Mutation
  const [changePassword] = useChangePasswordMutation();
  const [updateProfile] = useUpdateProfileMutation();
  const { data, refetch } = useGetMeQuery("");
  const [image, setImage] = useState<string | null>(null);

  useEffect(() => {
    if (data?.data) {
      setFullName(data.data.name || "");
      setEmail(data.data.email || "");
      setImage(data.data.avatar_url || null);
    }
  }, [data]);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      setImage(URL.createObjectURL(selectedFile));
    }
  };

  const handleSaveProfile = async () => {
    try {
      const formData = new FormData();
      formData.append("name", fullName);
      if (file) {
        formData.append("image", file);
      }

      const response = await updateProfile(formData);

      if (response.data?.success) {
        toast.success("Profile updated successfully!");
        refetch();
      } else {
        toast.error(response?.data?.message || "Failed to update profile.");
      }
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      toast.error("Something went wrong!");
    }
  };

  const handleChangePassword = async () => {
    const payload = {
      old_password: currentPassword,
      new_password: newPassword,
    };

    if (newPassword !== confirmPassword) {
      toast("Passwords do not match!");
      return;
    }
    if (newPassword.length < 6) {
      toast("Password must be at least 6 characters!");
      return;
    }

    try {
      const response = await changePassword(payload);

      if (response?.data?.success) {
        toast.success("Password updated successfully");
        setCurrentPassword("");
        setNewPassword("");
        setConfirmPassword("");
        onClose();
      } else {
        toast.error(response?.data?.message || "Failed to update password");
      }
      
    } catch (error: unknown) {
      console.error(error);
      if (error instanceof Error) {
        toast.error(error.message || "Something went wrong");
      } else {
        toast.error("Something went wrong");
      }
    }
  };

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-fadeIn">
      {/* Overlay */}
      <div
        ref={overlayRef}
        className="absolute inset-0 bg-black/30 backdrop-blur-sm animate-fadeIn"
        onClick={onClose}
      />

      {/* Modal Content */}
      <div
        ref={modalRef}
        className="relative w-full max-w-xl bg-white rounded-lg shadow-2xl overflow-hidden max-h-[90vh] overflow-y-auto animate-modalSlideIn"
      >
        <div className="p-4 sm:p-6 md:p-8">
          {/* Close Button */}
          <button
            className="absolute top-3 right-3 sm:top-4 sm:right-4 text-gray-400 hover:text-gray-600 cursor-pointer"
            onClick={onClose}
          >
            <X size={20} className="sm:w-6 sm:h-6" />
          </button>

          <div ref={contentRef}>
            <div className="flex justify-center mb-6">
              <div className="relative">
                {/* Image or Placeholder */}
                <div className="w-20 h-20 bg-gray-300 rounded-full flex items-center justify-center overflow-hidden border">
                  {image ? (
                    <Image
                      src={image}
                      alt="Profile Preview"
                      className="w-full h-full object-cover rounded-full"
                      height={400}
                      width={400}
                    />
                  ) : (
                    <User size={40} className="text-gray-600" />
                  )}
                </div>

                {/* Hidden File Input */}
                <input
                  type="file"
                  accept="image/*"
                  ref={fileInputRef}
                  className="hidden"
                  onChange={handleImageChange}
                />

                {/* Plus Button */}
                <button
                  type="button"
                  onClick={handleButtonClick}
                  className="absolute bottom-0 right-0 w-7 h-7 bg-gray-700 rounded-full flex items-center justify-center text-white text-xs hover:bg-gray-800 transition-colors cursor-pointer"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M12 5v14M5 12h14" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Profile Section */}
            <div className="mb-6 sm:mb-8">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-700 block mb-2">
                    Full Name
                  </label>
                  <input
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="Jane Doe"
                    className="w-full bg-gray-50 border border-gray-200 text-sm px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700 block mb-2">
                    Email Address
                  </label>
                  <input
                    value={email}
                    disabled // usually email is not editable
                    placeholder="jane.doe@comic-admin.com"
                    className="w-full bg-gray-50 border border-gray-200 text-sm px-4 py-3 rounded-lg text-gray-500"
                  />
                </div>
              </div>

              <div className="flex justify-end mt-4">
                <button
                  onClick={handleSaveProfile}
                  className="bg-green-600 hover:bg-green-700 text-white px-6 py-2.5 rounded-lg text-sm font-medium transition-all hover:scale-105 shadow-sm cursor-pointer"
                >
                  Save Profile
                </button>
              </div>
            </div>

            {/* Divider */}
            <div className="border-t border-gray-200 my-6 sm:my-8" />

            {/* Password Management Section */}
            <div>
              <h3 className="text-lg sm:text-xl font-semibold mb-4 text-gray-800">
                Password Management
              </h3>
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-gray-700 block mb-2">
                    Current Password
                  </label>
                  <input
                    type="password"
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    placeholder="Enter current password"
                    className="w-full bg-gray-50 border border-gray-200 text-sm px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-gray-700 block mb-2">
                      New Password (Min 6 chars)
                    </label>
                    <input
                      type="password"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      placeholder="Enter new password"
                      className="w-full bg-gray-50 border border-gray-200 text-sm px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700 block mb-2">
                      Confirm New Password
                    </label>
                    <input
                      type="password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder="Confirm password"
                      className="w-full bg-gray-50 border border-gray-200 text-sm px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    />
                  </div>
                </div>
                <div className="flex justify-end mt-4">
                  <button
                    onClick={handleChangePassword}
                    className="bg-green-600 hover:bg-green-700 text-white px-6 py-2.5 rounded-lg text-sm font-medium transition-all hover:scale-105 shadow-sm cursor-pointer"
                  >
                    Change Password
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes modalSlideIn {
          from {
            opacity: 0;
            transform: scale(0.9) translateY(20px);
          }
          to {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }

        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }

        .animate-modalSlideIn {
          animation: modalSlideIn 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
        }
      `}</style>
    </div>
  );
}

export default SettingsModal;
